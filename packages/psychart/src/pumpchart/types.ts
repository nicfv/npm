import { PaletteName } from 'viridis';
import { ChartOptions, Point } from '../types';
export { Point };

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
    /**
     * Pump speed (e.g. rpm)
     */
    readonly speed?: number;
    /**
     * Pump power (e.g. kW)
     */
    readonly power?: number;
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
     * The number of intermediate performance curves to generate, examples...
     * - A value of **1** would only generate the performance curve at 100%
     * - A value of **2** would generate the performances at 50% and 100%
     * - A value of **4** would generate performances at 25%, 50%, 75%, and 100%
     */
    readonly performanceSteps: number;
    /**
     * The **hexadecimal** code for the performance curve(s)
     */
    readonly performanceCurveColor: string;
    /**
     * The **hexadecimal** code for the system curve
     */
    readonly systemCuveColor: string;
    /**
     * Units for various quantities
     */
    readonly units: {
        /**
         * Flow rate (e.g. gpm)
         */
        readonly flow: string;
        /**
         * Head pressure (e.g. ft)
         */
        readonly head: string;
        /**
         * Pump speed (e.g. rpm)
         */
        readonly speed: string;
        /**
         * Pump power (e.g. kW)
         */
        readonly power: string;
    },
}

/**
 * Options for data plotting.
 */
export interface PumpchartDataOptions {
    /**
     * An optional name for this data point
     */
    readonly name: string;
    /**
     * The radius of this data point, in pixels
     */
    readonly radius: number;
    /**
     * Properties that define this point's color
     */
    readonly gradient: {
        /**
         * The name of the gradient
         */
        readonly name: PaletteName;
        /**
         * The normalized "score" to color this data point along the gradient
         */
        readonly score: number;
    },
    /**
     * An optional timestamp for this data point
     */
    readonly timestamp: number;
}