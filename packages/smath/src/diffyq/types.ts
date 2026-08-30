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

/**
 * Contains data for a single point in time
 */
export interface Step {
    /**
     * The timestamp for this step
     */
    readonly time: number;
    /**
     * The array of all derivative orders by `x`, `dx/dt`, `d2x/dt2`, ..., `dnx/dtn`
     */
    readonly dx: number[];
}
