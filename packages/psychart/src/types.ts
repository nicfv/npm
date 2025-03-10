import { Color, PaletteName } from 'viridis';

export type Theme = 'light' | 'dark';
export type Measurement = 'dbwb' | 'dbrh' | 'dbdp';
export type RegionName = 'Summer (sitting)' | 'Summer (walking)' | 'Summer (light work)' | 'Winter (sitting)' | 'Winter (walking)' | 'Winter (light work)' | 'Givoni Comfort Zone' | 'Data Center A4' | 'Data Center A3' | 'Data Center A2' | 'Data Center A1' | 'Data Center Recommended (low pollutants)' | 'Data Center Recommended (high pollutants)' | 'IBM TS4500 Ambient (cooling)' | 'IBM TS4500 Ambient (no cooling)' | 'IBM TS4500 Recommended';
export type DataSeries = { [index: number]: DataOptions };

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
     * The type of measurements that were taken.
     */
    readonly measurement: Measurement;
}

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
     * Determines whether or not the user is using a dark theme.
     */
    readonly theme: Theme;
    /**
     * The default color settings for all Psychart themes.
     */
    readonly colors: { [K in Theme]: Colors };
    /**
     * The font size, in pixels.
     */
    readonly fontSize: number;
    /**
     * The name of the font used for Psychart.
     */
    readonly fontFamily: string;
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
     * The default time span (ms) between the first and last plotted point.
     */
    readonly timeSpan: number;
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
     * The number of data series to render.
     */
    readonly count: number;
    /**
     * The data series information.
     */
    readonly series: DataSeries;
}

export interface DataOptions {
    /**
     * Add a label to this data series.
     */
    readonly legend: string;
    /**
     * The type of measurements that were taken.
     */
    readonly measurement: Measurement;
    /**
     * The name of the dry bulb series.
     */
    readonly dryBulb: string;
    /**
     * The name of the wet bulb, dew point, or relative humidity series, depending on `measurement`.
     */
    readonly other: string;
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
     * Determines the color gradient for time series plots.
     */
    readonly gradient: PaletteName;
    /**
     * Defines whether or not to show advanced state variables.
     */
    readonly advanced: boolean;
    /**
     * Optionally disable this series to hide it from the rendering.
     */
    readonly enabled: boolean;
}