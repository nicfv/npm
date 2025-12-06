import { PaletteName } from 'viridis';
import { ChartOptions, Point } from '../types';
export { Point };

/**
 * Represents a single point in time.
 */
export interface PumpchartState {
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
     * Defines the curves to render on Pumpchart `h = f(q)` using `q` as the function variable
     */
    readonly curve: {
        /**
         * The pump performance curve at 100% pump speed
         */
        readonly pump: string;
        /**
         * The system curve
         */
        readonly system: string;
    },
    /**
     * Values for speed in the units specified, used to generate pump performance curves
     */
    readonly speed: {
        /**
         * The maximum pump speed
         */
        readonly max: number,
        /**
         * The speed of optimal operation
         */
        readonly operation: number,
        /**
         * The intermediate performance curves to generate for different pump speeds
         */
        readonly steps: number[],
    },
    /**
     * The **hexadecimal** color code for the pump performance curve(s)
     */
    readonly pumpCurveColor: string;
    /**
     * The **hexadecimal** color code for the system curve
     */
    readonly systemCuveColor: string;
    /**
     * The gradient name for plotting time-series data
     */
    readonly gradient: PaletteName;
    /**
     * Timestamps for colorizing time-series data
     */
    readonly timestamp: {
        /**
         * The starting timestamp
         */
        readonly start: number;
        /**
         * The ending timestamp
         */
        readonly stop: number;
    },
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
     * The **hexadecimal** color code for this data point, only used for time-independent data
     */
    readonly color: string;
    /**
     * An optional timestamp for this data point
     */
    readonly timestamp: number;
}