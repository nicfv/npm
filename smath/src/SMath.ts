/**
 * Contains a small math function library.
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
     * Round a number to any number of decimal places.
     * @param n The number to round
     * @param d The number of places on the right side of the decimal
     * @returns The rounded number
     * @example
     * ```js
     * const pi = SMath.round(3.1416, 2); // 3.14
     * ```
     */
    public static round(n: number, d: number = 0): number {
        return Math.round(n * 10 ** d) / (10 ** d);
    }
}