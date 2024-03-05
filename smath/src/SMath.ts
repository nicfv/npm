/**
 * Contains a small math function library.
 */
export abstract class SMath {
    /**
     * Determine if a value is numeric.
     * @param n Any value to check
     * @returns True if `n` is a number
     * @example
     * ```js
     * const b1 = SMath.isNumber(2),   // true
     *       b2 = SMath.isNumber('2'); // false
     * ```
     */
    public static isNumber(n: any): boolean {
        return typeof n === 'number';
    }
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
}