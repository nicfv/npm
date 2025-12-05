import * as SMath from 'smath';
import { Chart } from '../chart';
import { defaultPumpchartDataOptions, defaultPumpchartOptions } from './defaults';
import { Point, PumpchartDataOptions, PumpchartOptions, State } from './types';
import { Color, Palette } from 'viridis';
import { TextAnchor } from '../types';
import { f, toFunction, zero } from './lib';

/**
 * Show a pump's relationship between flow rate and pressure at different operating conditions.
 */
export class Pumpchart extends Chart<PumpchartOptions> {
    /**
     * Layers of the SVG as groups.
     */
    private readonly g = {
        axes: document.createElementNS(this.NS, 'g'),
        curves: document.createElementNS(this.NS, 'g'),
        data: document.createElementNS(this.NS, 'g'),
        text: document.createElementNS(this.NS, 'g'),
        tips: document.createElementNS(this.NS, 'g'),
    };
    /**
     * The pump curve `h = p(q)`
     */
    private readonly p: f;
    /**
     * The system curve `h = s(q)`
     */
    private readonly s: f;
    /**
     * The maximum pump flow rate
     */
    private readonly p_q0: number;
    /**
     * The maximum flow rate shown on the x-axis
     */
    private readonly maxFlow: number;
    /**
     * The maximum head pressure shown on the y-axis
     */
    private readonly maxHead: number;
    /**
     * Get the ideal axis interval
     */
    private static getStep(range: number, maxIntervals: number): number {
        const steps: number[] = [1, 2, 2.5, 5];
        let magnitude = 1;
        while (magnitude < 10) {
            for (const stepi of steps) {
                const step: number = stepi * (10 ** magnitude);
                if (range / step < maxIntervals) {
                    return step;
                }
            }
            magnitude++;
        }
        return 1;
    }
    constructor(options: Partial<PumpchartOptions> = {}) {
        super(options, defaultPumpchartOptions);
        // Append all groups to the SVG.
        Object.values(this.g).forEach(group => this.svg.appendChild(group));
        // Initialize the pump curve and system curve
        this.p = toFunction(this.options.pumpCurve, 'q');
        this.s = toFunction(this.options.systemCurve, 'q');
        // Compute the axes limits and intervals
        this.p_q0 = zero(this.p, 0, 1e6);
        this.maxFlow = 1.1 * this.p_q0;
        this.maxHead = 1.1 * this.p(0);
        const flowStep: number = Pumpchart.getStep(this.maxFlow, this.options.size.x / this.options.font.size / 6)
        const headStep: number = Pumpchart.getStep(this.maxHead, this.options.size.y / this.options.font.size / 3)
        // Create the axes.
        const xFlowAxis = this.createPath([
            { flow: 0, head: 0 },
            { flow: this.maxFlow, head: 0 },
        ]);
        const yHeadAxis = this.createPath([
            { flow: 0, head: 0 },
            { flow: 0, head: this.maxHead },
        ]);
        xFlowAxis.setAttribute('stroke', this.options.axisColor);
        yHeadAxis.setAttribute('stroke', this.options.axisColor);
        xFlowAxis.setAttribute('stroke-width', `${this.options.axisWidth * 2}px`);
        yHeadAxis.setAttribute('stroke-width', `${this.options.axisWidth * 2}px`);
        xFlowAxis.setAttribute('stroke-linecap', 'round');
        yHeadAxis.setAttribute('stroke-linecap', 'round');
        this.g.axes.append(xFlowAxis, yHeadAxis);
        for (let flow = flowStep; flow < this.maxFlow; flow += flowStep) {
            // Draw iso-flow vertical lines
            const isoFlowLine = this.createPath([
                { flow: flow, head: 0 },
                { flow: flow, head: this.maxHead },
            ], false);
            isoFlowLine.setAttribute('stroke', this.options.axisColor);
            isoFlowLine.setAttribute('stroke-width', this.options.axisWidth + 'px');
            isoFlowLine.setAttribute('stroke-linecap', 'round');
            this.g.axes.appendChild(isoFlowLine);
            // Show axis label
            this.drawLabel(`${flow}${this.options.units.flow}`, { flow: flow, head: 0 }, TextAnchor.N, `Flow [${this.options.units.flow}]`);
        }
        for (let head = headStep; head < this.maxHead; head += headStep) {
            // Draw iso-head horizontal lines
            const isoHeadLine = this.createPath([
                { flow: 0, head: head },
                { flow: this.maxFlow, head: head },
            ], false);
            isoHeadLine.setAttribute('stroke', this.options.axisColor);
            isoHeadLine.setAttribute('stroke-width', this.options.axisWidth + 'px');
            isoHeadLine.setAttribute('stroke-linecap', 'round');
            this.g.axes.appendChild(isoHeadLine);
            // Show axis label
            this.drawLabel(`${head}${this.options.units.head}`, { flow: 0, head: head }, TextAnchor.E, `Head [${this.options.units.head}]`);
        }
        this.drawPerformanceCurves();
        this.drawSystemCurveAndOperation();
    }
    /**
     * Convert a state to an (x,y) coordinate.
     * @param state Any state in this system
     * @returns An (x,y) coordinate on the screen
     */
    private state2xy(state: State): Point {
        const xMin: number = this.options.padding.x;
        const xMax: number = this.options.size.x - this.options.padding.x
        const yMin: number = this.options.padding.y;
        const yMax: number = this.options.size.y - this.options.padding.y;
        return {
            x: SMath.clamp(SMath.translate(state.flow, 0, this.maxFlow, xMin, xMax), xMin, xMax),
            y: SMath.clamp(SMath.translate(state.head, 0, this.maxHead, yMax, yMin), yMin, yMax),
        };
    }
    /**
     * Create a SVG path element from an array of states.
     * @param data An array of states
     * @param closePath Whether or not to close the path
     * @returns A `<path>` element containing the array of states
     */
    private createPath(data: State[], closePath = false): SVGPathElement {
        const path: SVGPathElement = document.createElementNS(this.NS, 'path');
        path.setAttribute('d', 'M ' + data.map(pt => {
            const xy: Point = this.state2xy(pt);
            return xy.x + ',' + xy.y;
        }).join(' ') + (closePath ? ' z' : ''));
        return path;
    }
    /**
     * Draw an axis label
     * @param content Label text content
     * @param location Label location (state)
     * @param color Label font color
     * @param anchor Label text anchor
     * @param tooltip Optional tooltip text on mouse hover
     */
    private drawLabel(content: string, location: State, anchor: TextAnchor, tooltip?: string): void {
        const axisColor: Color = Color.hex(this.options.axisColor);
        const label: SVGTextElement = this.createLabel(content, this.state2xy(location), axisColor, anchor);
        this.g.text.appendChild(label);
        if (tooltip) {
            label.addEventListener('mouseover', e => this.drawTooltip(tooltip, { x: e.offsetX, y: e.offsetY }, axisColor, this.g.tips));
            label.addEventListener('mouseleave', () => Chart.clearChildren(this.g.tips));
        }
    }
    /**
     * Draw a curve `h = f(q)` on the curves layer.
     */
    private drawCurve(tooltip: string, color: Color, width: number, h: f, min = 0, max = this.maxFlow, steps = 1e3): void {
        const states: State[] = SMath.linspace(min, max, steps).map<State>(q => { return { flow: q, head: h(q) } });
        const curve: SVGPathElement = this.createPath(states, false);
        curve.setAttribute('fill', 'none');
        curve.setAttribute('stroke', color.toString());
        curve.setAttribute('stroke-width', `${width}px`);
        curve.setAttribute('stroke-linecap', 'round');
        this.g.curves.appendChild(curve);
        if (tooltip) {
            curve.addEventListener('mouseover', e => this.drawTooltip(tooltip, { x: e.offsetX, y: e.offsetY }, color, this.g.tips));
            curve.addEventListener('mouseleave', () => Chart.clearChildren(this.g.tips));
        }
    }
    /**
     * Draw a custom circle onto any layer.
     */
    private drawCircle(tooltip: string, color: Color, state: State, radius: number, parent: SVGElement): void {
        const circle: SVGCircleElement = document.createElementNS(this.NS, 'circle');
        const center: Point = this.state2xy(state);
        circle.setAttribute('fill', color.toString());
        circle.setAttribute('cx', `${center.x}px`);
        circle.setAttribute('cy', `${center.y}px`);
        circle.setAttribute('r', `${radius}px`);
        parent.appendChild(circle);
        if (tooltip) {
            circle.addEventListener('mouseover', e => this.drawTooltip(tooltip, { x: e.offsetX, y: e.offsetY }, color, this.g.tips));
            circle.addEventListener('mouseleave', () => Chart.clearChildren(this.g.tips));
        }
    }
    /**
     * Scale a function.
     */
    private scale(p: f, n: number): f {
        return q => n * p(q / n);
    }
    /**
     * Draw concentric pump performance curves.
     */
    private drawPerformanceCurves(): void {
        const color: Color = Color.hex(this.options.pumpCurveColor);
        this.drawCurve(`Performance Curve at ${this.options.speed.max} [${this.options.units.speed}]`, color, 2, this.p, 0, this.p_q0);
        this.options.speed.steps.forEach(speed => {
            const pct: number = SMath.clamp(SMath.normalize(speed, 0, this.options.speed.max), 0.01, 1);
            const p1: f = this.scale(this.p, pct);
            this.drawCurve('', color, 1, p1, 0, this.p_q0 * pct);
        });
    }
    /**
     * Draw the system curve and operational point.
     */
    private drawSystemCurveAndOperation(): void {
        const color: Color = Color.hex(this.options.systemCuveColor);
        const n: number = SMath.clamp(SMath.normalize(this.options.speed.operation, 0, this.options.speed.max), 0.01, 1);
        const p: f = this.scale(this.p, n);
        const q100: number = zero(q => this.s(q) - this.p(q), 0, 1e6);
        const q0: number = zero(q => this.s(q) - p(q), 0, 1e6);
        this.drawCurve('System Curve', color, 2, this.s, 0, q100);
        // Draw operation axis lines
        const operation = this.createPath([
            { flow: 0, head: p(q0) },
            { flow: q0, head: p(q0) },
            { flow: q0, head: 0 },
        ], false);
        operation.setAttribute('fill', 'none');
        operation.setAttribute('stroke', color.toString());
        operation.setAttribute('stroke-width', '1px');
        operation.setAttribute('stroke-linecap', 'round');
        this.g.curves.append(operation);
        // Draw operating point
        this.drawCircle(`Operation Point\nSpeed = ${this.options.speed.operation} [${this.options.units.speed}]\nFlow = ${q0.toFixed(1)} [${this.options.units.flow}]\nHead = ${p(q0).toFixed(1)} [${this.options.units.head}]`, color, { flow: q0, head: p(q0) }, 5, this.g.curves);
    }
    /**
     * Plot a single data point.
     * @param state The current state of the system
     * @param config Display options for plotting data
     */
    public plot(state: State, config: Partial<PumpchartDataOptions> = {}): void {
        const options: PumpchartDataOptions = Chart.setDefaults(config, defaultPumpchartDataOptions);
        const color: Color = Palette[options.gradient.name].getColor(options.gradient.score);
        const speedEstimator: f = n => this.scale(this.p, n)(state.flow) - state.head;
        const speedEstimate: number = SMath.expand(zero(speedEstimator, 0.01, 1), 0, this.options.speed.max);
        const tip: string =
            (options.name ? `${options.name}\n` : '') +
            (options.timestamp > 0 ? `${new Date(options.timestamp).toLocaleString()}\n` : '') +
            `Flow = ${state.flow} [${this.options.units.flow}]` +
            `\nHead = ${state.head} [${this.options.units.head}]` +
            `\nSpeed (est.) = ${speedEstimate} [${this.options.units.speed}]` +
            (typeof state.speed !== 'undefined' ? `\nSpeed = ${state.speed} [${this.options.units.speed}]` : '') +
            (typeof state.power !== 'undefined' ? `\nPower = ${state.power} [${this.options.units.power}]` : '');
        this.drawCircle(tip, color, state, options.radius, this.g.data);
    }
    /**
     * Clear all the data from this chart.
     */
    public clearData(): void {
        Chart.clearChildren(this.g.data);
    }
}
