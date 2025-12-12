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
     * The fluid density in the units provided
     */
    readonly density: number;
    /**
     * The **hexadecimal** color code for the axes labels
     */
    readonly textColor: string;
    /**
     * The **hexadecimal** color code for the chart axes
     */
    readonly axisColor: string;
    /**
     * The axis thickness, in pixels
     */
    readonly axisWidth: number;
    /**
     * Defines the curve parameters to render on Pumpchart
     */
    readonly curve: {
        /**
         * The pump performance curve parameters at 100% pump speed
         */
        readonly pump: {
            /**
             * The maximum head at zero flow (shut-off head)
             */
            readonly maxHead: number;
            /**
             * The maximum flow rate at zero head
             */
            readonly maxFlow: number;
        };
        /**
         * The system curve parameters: `sys(q) = static + friction * q^2`
         */
        readonly system: {
            /**
             * Static head loss in the system, which is defined by the
             * elevation difference between the inlet and outlet of the
             * system, and is theoretically zero for closed systems
             */
            readonly static: number;
            /**
             * The coefficient of friction (dynamic head loss) of the system
             */
            readonly friction: number;
        };
    };
    /**
     * Values for speed in the units specified, used to generate pump performance curves
     */
    readonly speed: {
        /**
         * The maximum pump speed
         */
        readonly max: number;
        /**
         * The speed of optimal operation
         */
        readonly operation: number;
        /**
         * The intermediate performance curves to generate for different pump speeds
         */
        readonly steps: number[];
    };
    /**
     * The **hexadecimal** color code for the pump performance curve(s)
     */
    readonly pumpCurveColor: string;
    /**
     * The **hexadecimal** color code for the system curve
     */
    readonly systemCurveColor: string;
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
    };
    /**
     * Units for various quantities
     */
    readonly units: {
        /**
         * Flow rate (e.g. gpm)
         */
        readonly flow: Flow;
        /**
         * Head pressure (e.g. ft)
         */
        readonly head: Head;
        /**
         * Pump speed (e.g. rpm)
         */
        readonly speed: Speed;
        /**
         * Pump power (e.g. kW)
         */
        readonly power: Power;
        /**
         * Fluid density (e.g. kg/m3)
         */
        readonly density: Density;
    };
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

/**
 * Available units for flow rate
 */
export type Flow = 'm3/s' | 'm3/m' | 'm3/h' | 'L/s' | 'L/m' | 'L/h' | 'ft3/s' | 'ft3/m' | 'ft3/h' | 'gpm' | 'gph';
/**
 * Available units for head pressure
 */
export type Head = 'in' | 'ft' | 'mm' | 'cm' | 'm' | 'psi' | 'psf' | 'Pa' | 'kPa' | 'bar' | 'atm';
/**
 * Available units for speed
 */
export type Speed = '%' | 'rpm' | 'Hz';
/**
 * Available units for power
 */
export type Power = 'W' | 'kW' | 'hp';
/**
 * Available units for density
 */
export type Density = 'g/cm3' | 'kg/m3' | 'g/mL' | 'kg/L' | 'oz/in3' | 'lb/ft3' | 'lb/gal';
