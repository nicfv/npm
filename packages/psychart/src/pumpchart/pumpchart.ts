import * as SMath from 'smath';
import { Chart } from '../chart';
import { defaultOptions, defaultDataOptions } from './defaults';
import { Flow, Head, Point, Power, DataOptions, Options, State, Speed } from './types';
import { Color, Palette } from 'viridis';
import { TextAnchor } from '../types';
import { f, zero } from './lib';
import { FlowUnits, HeadUnits, PowerUnits, SpeedUnits } from './units';
import { dimensions, Quantity, units } from 'dimensional';

/**
 * Show a pump's relationship between flow rate and pressure at different operating conditions.
 */
export class Pumpchart extends Chart<Options> {
    /**
     * Layers of the SVG as groups.
     */
    private readonly g = {
        hilites: document.createElementNS(this.NS, 'g'),
        curves: document.createElementNS(this.NS, 'g'),
        axes: document.createElementNS(this.NS, 'g'),
        data: document.createElementNS(this.NS, 'g'),
        text: document.createElementNS(this.NS, 'g'),
        tips: document.createElementNS(this.NS, 'g'),
    };
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
    /**
     * Get the list of all available units for flow.
     * @returns A list of units
     */
    public static getFlowUnits(): Flow[] {
        return Object.keys(FlowUnits) as Flow[];
    }
    /**
     * Get the list of all available units for head.
     * @returns A list of units
     */
    public static getHeadUnits(): Head[] {
        return Object.keys(HeadUnits) as Head[];
    }
    /**
     * Get the list of all available units for speed.
     * @returns A list of units
     */
    public static getSpeedUnits(): Speed[] {
        return Object.keys(SpeedUnits) as Speed[];
    }
    /**
     * Get the list of all available units for power.
     * @returns A list of units
     */
    public static getPowerUnits(): Power[] {
        return Object.keys(PowerUnits) as Power[];
    }
    /**
     * Create a new Pumpchart with custom options.
     * @param options Customization options for the new Pumpchart.
     */
    constructor(options: Partial<Options> = {}) {
        super(options, defaultOptions);
        // Append all groups to the SVG and clear highlights on click.
        Object.values(this.g).forEach(group => this.svg.appendChild(group));
        this.svg.addEventListener('click', () => Chart.clearChildren(this.g.hilites));
        // Compute the axes limits and intervals
        this.maxFlow = 1.1 * SMath.clamp(this.options.curve.pump.maxFlow, 0, Infinity);
        this.maxHead = 1.1 * SMath.clamp(this.options.curve.pump.maxHead, 0, Infinity);
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
        // Draw the system curve
        const sysColor: Color = Color.hex(this.options.systemCurveColor);
        const nmax: number = SMath.clamp(this.options.speed.max, 0, Infinity); // max speed
        const nop: number = SMath.clamp(this.options.speed.operation, 0, nmax); // operation speed
        const qmax: number = zero(q => this.s(q) - this.p(q, nmax), 0, 1e6); // flow @ max speed
        const qop: number = zero(q => this.s(q) - this.p(q, nop), 0, 1e6); // flow @ operation
        const opPt: State = { flow: qop, head: this.p(qop, nop), speed: nop }; // operation point
        this.drawCurve('System Curve', sysColor, 2 * this.options.axisWidth, q => this.s(q), 0, qmax);
        // Draw operation axis lines
        const operation = this.createPath([
            { flow: 0, head: opPt.head },
            opPt,
            { flow: opPt.flow, head: 0 },
        ], false);
        operation.setAttribute('fill', 'none');
        operation.setAttribute('stroke', sysColor.toString());
        operation.setAttribute('stroke-width', `${this.options.axisWidth}px`);
        operation.setAttribute('stroke-linecap', 'round');
        this.g.curves.append(operation);
        // Draw the operating point
        this.plot(opPt, {
            name: 'Operation Point',
            radius: 5 * this.options.axisWidth,
            color: this.options.systemCurveColor,
        });
        // Draw concentric pump performance curves
        const pumpColor: Color = Color.hex(this.options.pumpCurveColor);
        this.drawCurve(`Performance Curve at ${SMath.round2(nmax, 0.1)}${this.options.units.speed}`, pumpColor, this.options.axisWidth * 2, q => this.p(q, nmax));
        this.options.speed.steps.forEach(speed => {
            this.drawCurve('', pumpColor, this.options.axisWidth, q => this.p(q, speed), 0);
        });
        // Copy over the operation point to the curves layer
        if (this.g.data.lastChild) {
            this.g.curves.appendChild(this.g.data.lastChild);
            this.clearData();
        }
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
        const textColor: Color = Color.hex(this.options.textColor);
        const label: SVGTextElement = this.createLabel(content, this.state2xy(location), textColor, anchor, 0);
        this.g.text.appendChild(label);
        if (tooltip) {
            label.addEventListener('mouseover', e => this.drawTooltip(tooltip, { x: e.offsetX, y: e.offsetY }, textColor, this.g.tips));
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
    private drawCircle(tooltip: string, color: Color, state: State, radius: number, allowHighlight: boolean, parent: SVGElement): void {
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
        if (allowHighlight) {
            circle.addEventListener('click', e => {
                e.stopPropagation();
                this.drawCircle('', Color.hex(this.options.highlightColor), state, radius * 2, false, this.g.hilites);
            });
        }
    }
    /**
     * Represents the pump curve `h = p(q)`
     * @param q Flow rate
     * @param speed Pump speed
     * @returns Head gained by the fluid by the pump
     */
    private p(q: number, speed: number): number {
        const n: number = SMath.clamp(SMath.normalize(speed, 0, this.options.speed.max), 0.01, 1);
        const h0: number = SMath.clamp(this.options.curve.pump.maxHead * n, 0, Infinity);
        const q0: number = SMath.clamp(this.options.curve.pump.maxFlow * n, 0, Infinity);
        return h0 * (1 - (q / q0) ** 2);
    }
    /**
     * Represents the system curve `h = s(q)`
     * @param q Flow rate
     * @returns Head loss from the fluid by the system
     */
    private s(q: number): number {
        const h0: number = SMath.clamp(this.options.curve.system.static, 0, Infinity);
        const k: number = SMath.clamp(this.options.curve.system.friction, 0, Infinity);
        return h0 + k * q ** 2;
    }
    /**
     * Plot a single data point.
     * @param state The current state of the system
     * @param config Display options for plotting data
     */
    public plot(state: State, config: Partial<DataOptions> = {}): void {
        const options: DataOptions = Chart.setDefaults(config, defaultDataOptions);
        const hasTimeStamp: boolean = Number.isFinite(options.timestamp);
        const nmax: number = SMath.clamp(this.options.speed.max, 0, Infinity);
        const speedEstimator: f = n => this.p(state.flow, n) - state.head;
        let speed: number;
        try {
            speed = state.speed ?? zero(speedEstimator, 0, nmax);
        } catch {
            speed = nmax;
        }
        // Calculate the efficiency if power is given
        let efficiency = 0;
        let output = 0;
        if (typeof state.power === 'number') {
            let headQty: Quantity = new Quantity(state.head, HeadUnits[this.options.units.head]);
            if (HeadUnits[this.options.units.head].dimensions.is(dimensions.Length)) {
                // Need to multiply by specific weight to get the head in units of pressure
                const specWeight: Quantity = new Quantity(SMath.clamp(this.options.specificGravity, 0, Infinity), units.gram.over(units.centimeter.pow(3)).times(units.Gs));
                headQty = headQty.times(specWeight);
            }
            // Efficiency = Power_{out} / Power_{in}
            // Power_{out} = Pressure * FlowRate
            const flowQty: Quantity = new Quantity(state.flow, FlowUnits[this.options.units.flow]);
            const powQty: Quantity = new Quantity(state.power, PowerUnits[this.options.units.power]);
            const eta: Quantity = headQty.times(flowQty).over(powQty);
            output = headQty.times(flowQty).as(powQty.units).quantity;
            efficiency = eta.as(units.Unitless).quantity * 100;
        }
        const tip: string =
            (options.name ? `${options.name}\n` : '') +
            (hasTimeStamp ? `${new Date(options.timestamp).toLocaleString()}\n` : '') +
            `Flow = ${SMath.round2(state.flow, 0.1)}${this.options.units.flow}` +
            `\nHead = ${SMath.round2(state.head, 0.1)}${this.options.units.head}` +
            `\nSpeed = ${SMath.round2(speed, 0.1)}${this.options.units.speed}${typeof state.speed === 'number' ? '' : ' (est.)'}` +
            (typeof state.power === 'number' ? (
                `\nPower = ${SMath.round2(state.power, 0.1)}${this.options.units.power}` +
                `\nOutput = ${SMath.round2(output, 0.1)}${this.options.units.power}` +
                `\nEfficiency = ${SMath.round2(efficiency, 0.1)}%`
            ) : '');
        // Determine the assigned color for this data point
        let gradientMin = 0;
        let gradientMax = 0;
        let gradientValue = 0;
        let useGradient = false;
        if (this.options.colorizeBy === 'time' && hasTimeStamp) {
            gradientMin = this.options.timestamp.start;
            gradientMax = this.options.timestamp.stop;
            gradientValue = options.timestamp;
            useGradient = true;
        } else if (this.options.colorizeBy === 'efficiency' && typeof state.power === 'number') {
            gradientMin = 0;
            gradientMax = 100;
            gradientValue = efficiency;
            useGradient = true;
        }
        if (useGradient && this.options.flipGradient) {
            [gradientMin, gradientMax] = [gradientMax, gradientMin];
        }
        const color: Color = useGradient ? Palette[this.options.gradient].getColor(gradientValue, gradientMin, gradientMax) : Color.hex(options.color);
        this.drawCircle(tip, color, state, options.radius, true, this.g.data);
    }
    /**
     * Clear all the data from this chart.
     */
    public clearData(): void {
        Chart.clearChildren(this.g.data);
        Chart.clearChildren(this.g.hilites);
    }
}
