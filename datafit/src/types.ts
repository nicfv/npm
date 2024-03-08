/**
 * Represents a mathematical function y = f(x) with unknown constants `a`
 */
export type fx = (x: number, ...a: Array<number>) => number;
/**
 * Stores a cartesian (x,y) coordinate pair.
 */
export interface Point {
    /**
     * X-coordinate
     */
    readonly x: number;
    /**
     * Y-coordinate
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
    readonly a: Array<number>;
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