/**
 * Represents a time-dependent equation with an arbitrary number of parameters.
 */
export type Equation = (t: number, ...x: number[]) => number;

/**
 * Contains a single timestep for timeseries data.
 */
export interface Timeseries<T extends number | number[]> {
    /**
     * The timestamp for this data point
     */
    readonly time: number;
    /**
     * The actual data value(s)
     */
    readonly data: T;
}
