/**
 * Represents equation that depends on time and system state.
 */
export interface Equation {
    (
        /**
         * Current simulation time
         */
        t: number,
        /**
         * System state vector at time `t`
         */
        ...state: number[]
    ): number;
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
