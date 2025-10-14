import { ChartOptions, Point } from '../types';
export { Point };

/**
 * Details about a chart axis.
 */
export interface Axis {
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
 * Represents a single point in time.
 */
export interface State {
    /**
     * Flow rate (e.g. gpm)
     */
    readonly flow: number;
    /**
     * Head pressure (e.g. ft)
     */
    readonly head: number;
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
    /**
     * The axis color (hexadecimal)
     */
    readonly axisColor: string;
    /**
     * The axis thickness, in pixels
     */
    readonly axisWidth: number;
    /**
     * The font used in this Pumpchart
     */
    readonly font: {
        /**
         * The name of the font family
         */
        readonly name: string;
        /**
         * The size of the font, in pixels
         */
        readonly size: number;
    };
}