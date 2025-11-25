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
     * The maximum pump flow at no head pressure (used to build the performance curve)
     */
    readonly pumpMaxFlow: number;
    /**
     * The pump head or differential pressure at no flow (used to build the performance curve)
     */
    readonly pumpMaxHead: number;
    /**
     * The system head at no flow, or the difference between the inlet/outlet elevation (used to build the system curve)
     */
    readonly systemMinHead: number;
    /**
     * The flow rate at the operational point of the system (used to build the system curve)
     */
    readonly systemOpFlow: number;
    /**
     * The number of intermediate performance curves to generate
     * @example
     * A value of **1** would only generate the performance curve at 100%
     * A value of **2** would generate the performances at 50% and 100%
     * A value of **4** would generate performances at 25%, 50%, 75%, and 100%
     */
    readonly performanceSteps: number;
}