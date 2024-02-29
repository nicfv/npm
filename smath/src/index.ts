/**
 * Add all the numbers of `x`.
 * @param x Any amount of numeric values.
 * @returns The summation of `x`.
 */
export function add(...x: Array<number>): number {
    return x.reduce((prev, curr) => prev + curr);
}