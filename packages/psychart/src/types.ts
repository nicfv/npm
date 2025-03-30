import { Color, PaletteName } from 'viridis';

/**
 * Color theme for Psychart.
 */
export type Theme = 'light' | 'dark';
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
     * Dry Bulb
     */
    db: number;
    /**
     * One of these values, depending on `measurement`
     * - Relative Humidity
     * - Wet Bulb
     * - Dew Point
     */
    other: number;
    /**
     * The two types of measurements that were taken to fix the state.
     */
    readonly measurement: 'dbwb' | 'dbrh' | 'dbdp';
}

/**
 * Contains data to render a psychrometric envelope.
 */
export interface Region {
    /**
     * The text to display on mouse hover
     */
    readonly tooltip: string;
    /**
     * The data that represents the boundary of this region
     */
    readonly data: Datum[];
}

/**
 * Color settings for Psychart.
 */
export interface Colors {
    /**
     * The font color.
     */
    readonly font: Color;
    /**
     * The axis color.
     */
    readonly axis: Color;
    /**
     * Defines the palette name used for region coloring.
     */
    readonly regionGradient: PaletteName;
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
     * Determines which theme is currently selected.
     */
    readonly theme: Theme;
    /**
     * The default color settings for all Psychart themes.
     */
    readonly colors: { [K in Theme]: Colors };
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
     * The spacing factor between entries in the legend.
     */
    readonly lineHeight: number;
}

/**
 * Configuration settings for plotting data.
 */
export interface DataOptions {
    /**
     * Adds a name to a data series. Must be set to create an entry in the legend.
     */
    readonly seriesName: string;
    /**
     * An optional unique point name to be shown in the tooltip.
     */
    readonly pointName: string;
    /**
     * The relative humidity measurement type, in percent [0-100] or float [0.0-1.0]
     */
    readonly relHumType: 'percent' | 'float';
    /**
     * The point radius, in pixels.
     */
    readonly pointRadius: number;
    /**
     * Determines whether or not to connect points with a line.
     */
    readonly line: boolean;
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
    /**
     * Optionally disable this series to hide it from the rendering.
     */
    readonly enabled: boolean;
}