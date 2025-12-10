import * as SMath from 'smath';
/**
 * Represents a mathematical function `y = f(x)`
 */
export type f = (x: number) => number;
/**
 * Find the solution (zero) of a function.
 */
export function zero(func: f, left: number, right: number, epsilon = 1e-6, maxIterations = 1e6): number {
    for (let i = 0; i < maxIterations; i++) {
        const funcLeft: number = func(left);
        const funcRight: number = func(right);
        if (Number.isNaN(funcLeft)) {
            throw new Error(`f(${left}) is NaN`);
        }
        if (Number.isNaN(funcRight)) {
            throw new Error(`f(${right}) is NaN`);
        }
        const leftSign: number = Math.sign(funcLeft);
        const rightSign: number = Math.sign(funcRight);
        if (SMath.approx(funcLeft, 0, epsilon)) { return left; }
        if (SMath.approx(funcRight, 0, epsilon)) { return right; }
        if (leftSign === rightSign) {
            throw new Error('A solution cannot be found.');
        }
        const mid: number = (left + right) / 2;
        const funcMid: number = func(mid);
        const midSign: number = Math.sign(funcMid);
        if (SMath.approx(funcMid, 0, epsilon)) { return mid; }
        if (midSign === leftSign) {
            left = mid;
        } else {
            right = mid;
        }
    }
    return (left + right) / 2;
}