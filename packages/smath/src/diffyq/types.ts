/**
 * Represents a time-dependent equation with an arbitrary number of parameters.
 */
export type Equation = (t: number, ...x: number[]) => number;

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
