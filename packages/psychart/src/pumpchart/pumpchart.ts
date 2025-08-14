import * as SMath from 'smath';
import { Chart } from '../chart';
import { defaultPumpchartOptions } from './defaults';
import { Point, PumpchartOptions, State } from './types';

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
        xFlowAxis.setAttribute('stroke', '#666');
        yHeadAxis.setAttribute('stroke', '#666');
        xFlowAxis.setAttribute('stroke-width', '2px');
        yHeadAxis.setAttribute('stroke-width', '2px');
        xFlowAxis.setAttribute('stroke-linecap', 'round');
        yHeadAxis.setAttribute('stroke-linecap', 'round');
        this.g.axes.append(xFlowAxis, yHeadAxis);
    }
    /**
     * Convert a state to an (x,y) coordinate.
     * @param state Any state in this system
     * @returns An (x,y) coordinate on the screen
     */
    private state2xy(state: State): Point {
        return {
            x: SMath.translate(state.flow, 0, this.options.flow.max, this.options.padding.x, this.options.size.x - this.options.padding.x),
            y: SMath.translate(state.head, 0, this.options.head.max, this.options.size.y - this.options.padding.y, this.options.padding.y),
        };
    }
    /**
     * Create a SVG path element from an array of states.
     * @param data An array of states
     * @param closePath Whether or not to close the path
     * @returns A `<path>` element containing the array of states
     */
    private createPath(data: Array<State>, closePath: boolean = false): SVGPathElement {
        const path: SVGPathElement = document.createElementNS(this.NS, 'path');
        path.setAttribute('d', 'M ' + data.map(pt => {
            const xy: Point = this.state2xy(pt);
            return xy.x + ',' + xy.y;
        }).join(' ') + (closePath ? ' z' : ''));
        return path;
    }
}