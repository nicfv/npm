import { PaletteName } from 'viridis';

/**
 * A human-readable name for a psychrometric envelope.
 */
export type RegionName = 'Summer (sitting)' | 'Summer (walking)' | 'Summer (light work)' | 'Winter (sitting)' | 'Winter (walking)' | 'Winter (light work)' | 'Givoni Comfort Zone' | 'Data Center A4' | 'Data Center A3' | 'Data Center A2' | 'Data Center A1' | 'Data Center Recommended (low pollutants)' | 'Data Center Recommended (high pollutants)' | 'IBM TS4500 Ambient (cooling)' | 'IBM TS4500 Ambient (no cooling)' | 'IBM TS4500 Recommended';

/**
 * An (x,y) cartesian coordinate pair.
 */
export interface Point {
    /**
     * The x-coordinate (horizontal)
     */
    x: number;
    /**
     * The y-coordinate (vertical)
     */
    y: number;
}

/**
 * This data object fixes the psychrometric state.
 */
export interface Datum {
    /**
     * Dry Bulb (db)
     */
    db: number;
    /**
     * One of these values, depending on `measurement`
     * - Relative Humidity (rh)
     * - Wet Bulb (wb)
     * - Dew Point (dp)
     * - Humidity Ratio (hr)
     */
    other: number;
    /**
     * The two types of measurements that were taken to fix the state.
     */
    readonly measurement: 'dbwb' | 'dbrh' | 'dbdp' | 'dbhr';
}

/**
 * Configuration options for Psychart.
 */
export interface PsychartOptions {
    /**
     * The outer size of Psychart, in pixels.
     */
    readonly size: Point;
    /**
     * The padding in pixels.
     */
    readonly padding: Point;
    /**
     * The default color settings for Psychart.
     */
    readonly colors: {
        /**
         * The font color as a **hex-code** string.
         */
        readonly font: string;
        /**
         * The axis color as a **hex-code** string.
         */
        readonly axis: string;
        /**
         * Defines the palette name used for region coloring.
         */
        readonly regionGradient: PaletteName;
    };
    /**
     * Optinally reverse gradients, making more/less saturated points appear on opposite ends.
     */
    readonly flipGradients: boolean;
    /**
     * Details for the font used in Psychart.
     */
    readonly font: {
        /**
         * The font size, in pixels.
         */
        readonly size: number;
        /**
         * The name of the font.
         */
        readonly family: string;
    };
    /**
     * The chart resolution, in units.
     */
    readonly resolution: number;
    /**
     * The major axis intervals for different units.
     */
    readonly major: {
        /**
         * Temperature
         */
        readonly temp: number;
        /**
         * Humidity Ratio
         */
        readonly humRat: number;
        /**
         * Relative Humidity
         */
        readonly relHum: number;
    };
    /**
     * Represents the unit system, in either US (IP) or metric (SI)
     */
    readonly unitSystem: 'IP' | 'SI';
    /**
     * The altitude of measurements taken.
     */
    readonly altitude: number;
    /**
     * The minimum value on the dry bulb axis.
     */
    readonly dbMin: number;
    /**
     * The maximum value on the dry bulb axis.
     */
    readonly dbMax: number;
    /**
     * The maximum value on the dew point axis.
     */
    readonly dpMax: number;
    /**
     * Determine whether to render a Mollier diagram.
     */
    readonly flipXY: boolean;
    /**
     * Defines whether to use dew point or humidity ratio on the Y-axis.
     */
    readonly yAxis: 'dp' | 'hr';
    /**
     * Determine where to show units.
     */
    readonly showUnits: {
        /**
         * Show units on the tooltips.
         */
        readonly tooltip: boolean;
        /**
         * Show units on the axes.
         */
        readonly axis: boolean;
    }
    /**
     * Render pre-defined shaded regions.
     */
    readonly regions: RegionName[];
    /**
     * Styling options for the legend. If set to `false`, will not render a legend on Psychart.
     */
    readonly legend: false | {
        /**
         * The title of the legend.
         */
        readonly title: string;
        /**
         * The margin between the top-left of the legend and the top-left of Psychart, in pixels.
         */
        readonly margin: Point;
        /**
         * The size of the legend, in pixels. The scrollbar will be visible in the event of overflow.
         */
        readonly size: Point;
    };
    /**
     * The spacing factor between entries in the legend, where 2.0 indicates double-spacing, for example.
     */
    readonly lineHeight: number;
}

/**
 * Configuration settings for plotting data.
 */
export interface DataOptions {
    /**
     * Adds a name to a point or data series to be shown in the tooltip. Must be set to create an entry in the legend.
     */
    readonly name: string;
    /**
     * Optionally show this point in the legend.
     */
    readonly legend: boolean;
    /**
     * The relative humidity measurement type, in percent [0-100] or float [0.0-1.0]
     */
    readonly relHumType: 'percent' | 'float';
    /**
     * The point radius, in pixels.
     */
    readonly pointRadius: number;
    /**
     * Determines whether or not to connect points with a line. If a `Datum` is provided, will draw a line from that point.
     */
    readonly line: boolean | Datum;
    /**
     * Determine the solid color **hex-code** for time-independent plots.
     */
    readonly color: string;
    /**
     * Determines the color gradient for time series plots.
     */
    readonly gradient: PaletteName;
    /**
     * Set the timespan for this time-dependent data series.
     */
    readonly time: {
        /**
         * The timestamp for the first data point.
         */
        readonly start: number;
        /**
         * The timestamp for the current data point.
         */
        readonly now: number;
        /**
         * The timestamp for the last data point.
         */
        readonly end: number;
    }
    /**
     * Defines whether or not to show advanced state variables.
     */
    readonly advanced: boolean;
}