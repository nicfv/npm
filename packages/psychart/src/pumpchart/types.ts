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
     * The pump performance curve `h = f(q)` using `q` as the function variable (at 100% speed)
     */
    readonly pumpCurve: string;
    /**
     * The system curve `h = f(q)` using `q` as the function variable
     */
    readonly systemCurve: string;
    /**
     * The intermediate performance curves to generate for different pump speeds in the range [0,1]
     */
    readonly speedSteps: number[];
    /**
     * The speed of optimal operation in the range [0,1]
     */
    readonly operationSpeed: number;
    /**
     * The **hexadecimal** code for the pump performance curve(s)
     */
    readonly pumpCurveColor: string;
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