/**
 * @packageDocumentation
 * Small math function library
 * 
 * Exports the public-facing API for `smath`
 */
/**
 * Contains a small math function library including
 * useful interpolation and extrapolation functions.
 */
export abstract class SMath {
    /**
     * Clamp a number within a range.
     * @param n The number to clamp
     * @param min The minimum value of the range
     * @param max The maximum value of the range
     * @returns A clamped number
     * @example
     * ```js
     * const n1 = SMath.clamp(5, 0, 10),  // 5
     *       n2 = SMath.clamp(-2, 0, 10); // 0
     * ```
     */
    public static clamp(n: number, min: number, max: number): number {
        if (n < min) {
            return min;
        }
        if (n > max) {
            return max;
        }
        return n;
    }
    /**
     * Check if two numbers are approximately equal with a maximum abolute error.
     * @param a Any number
     * @param b Any number
     * @param epsilon Maximum absolute error
     * @returns True if `a` is approximately `b`
     * @example
     * ```js
     * const b1 = SMath.approx(1 / 3, 0.33, 1e-6), // false
     *       b2 = SMath.approx(1 / 3, 0.33, 1e-2); // true
     * ```
     */
    public static approx(a: number, b: number, epsilon: number = 1e-6): boolean {
        return a - b < epsilon && b - a < epsilon;
    }
    /**
     * Normalize the number `n` from the range `min, max` to the range `0, 1`
     * @param n The number to normalize
     * @param min The minimum value in the range
     * @param max The maximum value in the range
     * @returns A normalized value
     * @example
     * ```js
     * const y = SMath.normalize(18, 9, 99); // 0.1
     * ```
     */
    public static normalize(n: number, min: number, max: number): number {
        if (min === max) {
            return 0;
        }
        return (n - min) / (max - min);
    }
    /**
     * Expand a normalized number `n` to the range `min, max`
     * @param n A normalized number
     * @param min The minimum value in the range
     * @param max The maximum value in the range
     * @returns A value within the number range
     * @example
     * ```js
     * const y = SMath.expand(0.25, 4, 6); // 4.5
     * ```
     */
    public static expand(n: number, min: number, max: number): number {
        return (max - min) * n + min;
    }
    /**
     * Translate a number `n` from the range `min1, max1` to the range `min2, max2`
     * @param n The number to translate
     * @param min1 The minimum value from the initial range
     * @param max1 The maximum value from the initial range
     * @param min2 The minimum value for the final range
     * @param max2 The maximum value for the final range
     * @returns A translated number in the final range
     * @example
     * ```js
     * const C = 20,
     *       F = SMath.translate(C, 0, 100, 32, 212); // 68
     * ```
     */
    public static translate(n: number, min1: number, max1: number, min2: number, max2: number): number {
        return this.expand(this.normalize(n, min1, max1), min2, max2);
    }
}