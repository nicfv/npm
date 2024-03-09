/**
 * Use this type to define a single-variable curve and dataset
 */
export type SingleVariable = number;
/**
 * Use this type to define a multi-variable curve and dataset
 */
export type MultiVariable = Array<number>;
/**
 * Defines whether this is a single- or multi-variable problem.
 */
export type X = SingleVariable | MultiVariable;
/**
 * Type of function constant parameters to fit the curve with.
 */
export type Parameters = Array<number>;
/**
 * Represents a mathematical function y = f(x) with unknown constants `a`
 */
export type fx<T = X> = (x: T, ...a: Parameters) => number;
/**
 * Stores a data point. For multivariable points, the `x`
 * coordinate contains an array of all the free variables.
 */
export interface Point<T = X> {
    /**
     * X variable(s)
     */
    readonly x: T;
    /**
     * Y variable
     */
    readonly y: number;
}
/**
 * Contains a set of data points. Can be
 * defined to be single or multi variable
 * using the generic type qualifier. The
 * following examples are provided in
 * Typescript. Remove the type identifier
 * and qualifier for JavaScript.
 * @example
 * Single variable dataset in Typescript:
 * ```ts
 * const data: Dataset<SingleVariable> = [
 *     { x: 1, y: 1 },
 *     { x: 2, y: 3 },
 *     { x: 3, y: 4 },
 * ];
 * ```
 * Multivariable dataset in Typescript:
 * ```ts
 * const data: Dataset<MultiVariable> = [
 *     { x: [0, 0], y: 1 },
 *     { x: [1, 0], y: 3 },
 *     { x: [0, 1], y: 4 },
 *     { x: [1, 1], y: 5 },
 * ];
 * ```
 */
export type Dataset<T = X> = Array<Point<T>>;
/**
 * Includes information about a best-fit for a curve.
 */
export interface Fit {
    /**
     * Contains the set of best-fit parameters for the function `f(x)`
     */
    readonly a: Parameters;
    /**
     * This is the residual sum of squared errors.
     */
    readonly err: number;
}
/**
 * Configuration options for `CurveFit`
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
     * Determines how much a set of parameters can mutate on the first generation.
     */
    readonly initialDeviation: number;
    /**
     * Determines how much a set of parameters can mutate on the final generation.
     */
    readonly finalDeviation: number;
}