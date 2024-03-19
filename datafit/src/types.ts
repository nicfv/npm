/**
 * Declares whether this is a single- or multi-variable problem.
 */
export type VariableType = number | Array<number>;
/**
 * Represents a mathematical function y = f(x) with unknown parameters.
 * @example
 * Single variable function in Typescript, 2nd degree polynomial:
 * ```ts
 * function f(x: number, a2: number, a1: number, a0: number): number {
 *     return a2 * x ** 2 + a1 * x + a0;
 * }
 * ```
 * Multivariable function Typescript, general plane equation:
 * ```ts
 * function f(x: number[], cx: number, cy: number, cz: number): number {
 *     return cx * x[0] + cy * x[1] + cz;
 * }
 * ```
 */
export type fx<T extends VariableType> = (x: T, ...params: Array<number>) => number;
/**
 * Stores a data point. For multivariable points, the `x`
 * coordinate contains an array of all the free variables.
 */
export interface Datum<T extends VariableType> {
    /**
     * **Input:** X variable(s)
     */
    readonly x: T;
    /**
     * **Output:** Y variable
     */
    readonly y: number;
}
/**
 * Includes information about a best-fit for a curve.
 */
export interface Fit {
    /**
     * Contains the set of best-fit parameters for the function `f(x)`
     */
    readonly params: Array<number>;
    /**
     * This is the residual sum of squared errors.
     */
    readonly err: number;
}
/**
 * Configuration options for curve fitting.
 */
export interface Config {
    /**
     * Determines the number of generations, or iterations.
     */
    readonly generations: number;
    /**
     * Determines the number of parameters sets to generate.
     */
    readonly population: number;
    /**
     * Determines how many survivors remain after every generation.
     */
    readonly survivors: number;
    /**
     * Determines the percentage of how much a set of parameters can mutate on the first generation.
     */
    readonly initialDeviation: number;
    /**
     * Determines the percentage of how much a set of parameters can mutate on the final generation.
     */
    readonly finalDeviation: number;
}