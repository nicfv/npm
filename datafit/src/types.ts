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