import { ChartOptions, Point } from '../types';
export { Point };

/**
 * Details about a chart axis.
 */
interface Axis {
    /**
     * The units of this axis.
     */
    readonly unit: string;
    /**
     * The interval between ticks on this axis.
     */
    readonly step: number;
    /**
     * The maximum value shown this axis.
     */
    readonly max: number;
}

/**
 * Configuration options for Pumpchart.
 */
export interface PumpchartOptions extends ChartOptions {
    /**
     * The padding of Pumpchart, in pixels.
     */
    readonly padding: Point;
    /**
     * The flow rate (x-axis)
     */
    readonly flow: Axis;
    /**
     * The head pressure (y-axis)
     */
    readonly head: Axis;
}