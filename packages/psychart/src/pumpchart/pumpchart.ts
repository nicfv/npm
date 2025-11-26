import * as SMath from 'smath';
import { Chart } from '../chart';
import { defaultPumpchartOptions } from './defaults';
import { Point, PumpchartOptions, State } from './types';
import { Color } from 'viridis';
import { TextAnchor } from '../types';

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
    constructor(options: Partial<PumpchartOptions> = {}) {
        super(options, defaultPumpchartOptions);
        // Append all groups to the SVG.
        Object.values(this.g).forEach(group => this.svg.appendChild(group));
        // Create the axes.
        const xFlowAxis = this.createPath([
            { flow: 0, head: 0 },
            { flow: this.options.flow.max, head: 0 },
        ]);
        const yHeadAxis = this.createPath([
            { flow: 0, head: 0 },
            { flow: 0, head: this.options.head.max },
        ]);
        xFlowAxis.setAttribute('stroke', this.options.axisColor);
        yHeadAxis.setAttribute('stroke', this.options.axisColor);
        xFlowAxis.setAttribute('stroke-width', (this.options.axisWidth * 2) + 'px');
        yHeadAxis.setAttribute('stroke-width', (this.options.axisWidth * 2) + 'px');
        xFlowAxis.setAttribute('stroke-linecap', 'round');
        yHeadAxis.setAttribute('stroke-linecap', 'round');
        this.g.axes.append(xFlowAxis, yHeadAxis);
        for (let flow = 0; flow < this.options.flow.max; flow += this.options.flow.step) {
            // Draw iso-flow vertical lines
            const isoFlowLine = this.createPath([
                { flow: flow, head: 0 },
                { flow: flow, head: this.options.head.max },
            ], false);
            isoFlowLine.setAttribute('stroke', this.options.axisColor);
            isoFlowLine.setAttribute('stroke-width', this.options.axisWidth + 'px');
            isoFlowLine.setAttribute('stroke-linecap', 'round');
            this.g.axes.appendChild(isoFlowLine);
            // Show axis label
            this.drawLabel(`${flow}${this.options.flow.unit}`, { flow: flow, head: 0 }, TextAnchor.N, `Flow [${this.options.flow.unit}]`);
        }
        for (let head = 0; head < this.options.head.max; head += this.options.head.step) {
            // Draw iso-head horizontal lines
            const isoHeadLine = this.createPath([
                { flow: 0, head: head },
                { flow: this.options.flow.max, head: head },
            ], false);
            isoHeadLine.setAttribute('stroke', this.options.axisColor);
            isoHeadLine.setAttribute('stroke-width', this.options.axisWidth + 'px');
            isoHeadLine.setAttribute('stroke-linecap', 'round');
            this.g.axes.appendChild(isoHeadLine);
            // Show axis label
            this.drawLabel(`${head}${this.options.head.unit}`, { flow: 0, head: head }, TextAnchor.E, `Head [${this.options.head.unit}]`);
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
            x: SMath.clamp(SMath.translate(state.flow, 0, this.options.flow.max, xMin, xMax), xMin, xMax),
            y: SMath.clamp(SMath.translate(state.head, 0, this.options.head.max, yMax, yMin), yMin, yMax),
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
    private drawCurve(tooltip: string, color: Color, width: number, h: f, min = 0, max = this.options.flow.max, steps = 1e3): void {
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
     * Draw concentric pump performance curves.
     */
    private drawPerformanceCurves(): void {
        const color: Color = Color.rgb(200, 150, 100);
        const p: f = this.performanceCurve();
        const q0: number = this.options.pumpMaxFlow;
        const minor: number = this.options.performanceSteps;
        this.drawCurve('Performance Curve', color, 2, p, 0, q0);
        if (minor > 0) {
            const minorCurvePoints: number[] = SMath.linspace(0, 1, minor + 1);
            minorCurvePoints.shift(); // Cut off the 0%
            minorCurvePoints.pop(); // Cut off the 100%
            minorCurvePoints.forEach(pct => {
                const p1: f = this.performanceCurve(pct);
                this.drawCurve('', color, 1, p1, 0, q0 * pct);
            });
        }
    }
    /**
     * Draw the system curve and operational point.
     */
    private drawSystemCurveAndOperation(): void {
        const color: Color = Color.rgb(100, 200, 150);
        const q0: number = this.options.systemOpFlow;
        const p: f = this.performanceCurve();
        const s: f = this.systemCurve();
        this.drawCurve('System Curve', color, 2, s, 0, 60);
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
        const oppt: SVGCircleElement = document.createElementNS(this.NS, 'circle');
        const opcenter: Point = this.state2xy({ flow: q0, head: p(q0) });
        oppt.setAttribute('fill', color.toString());
        oppt.setAttribute('cx', `${opcenter.x}px`);
        oppt.setAttribute('cy', `${opcenter.y}px`);
        oppt.setAttribute('r', '5px');
        this.g.curves.append(oppt);
        oppt.addEventListener('mouseover', e => this.drawTooltip(`Operation Point\nFlow = ${q0.toFixed(1)} [${this.options.flow.unit}]\nHead = ${p(q0).toFixed(1)} [${this.options.head.unit}]`, { x: e.offsetX, y: e.offsetY }, color, this.g.tips));
        oppt.addEventListener('mouseleave', () => Chart.clearChildren(this.g.tips));
    }
    /**
     * Generate the pump performance curve.
     * @param rpmPct The normalized speed percent
     * @returns The performance curve `h = p(q)`
     */
    private performanceCurve(rpmPct = 1): f {
        const h0: number = this.options.pumpMaxHead * rpmPct;
        const q0: number = this.options.pumpMaxFlow * rpmPct;
        return q => h0 * (1 - (q / q0) ** 2);
    }
    /**
     * Generate the system curve.
     * @returns The system curve `h = s(q)`
     */
    private systemCurve(): f {
        const p: f = this.performanceCurve();
        const h0: number = this.options.systemMinHead;
        const q0: number = this.options.systemOpFlow;
        return q => h0 + (p(q0) - h0) * (q / q0) ** 2;
    }
}

/**
 * Represents a mathematical function `h = f(q)`
 */
type f = (q: number) => number;
