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
    private hideTooltip(): void {
        Chart.clearChildren(this.g.tips);
    }
}
