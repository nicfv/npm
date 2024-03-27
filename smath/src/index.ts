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
    /**
     * Generate an array of linearly spaced numbers.
     * @param min The initial value of the linear space
     * @param max The final value of the linear space
     * @param count The number of values in the space
     * @returns The linear space as an array of numbers
     * @example
     * ```js
     * const space = SMath.linspace(1, 5, 6);
     * // [ 1, 1.8, 2.6, 3.4, 4.2, 5 ]
     * ```
     */
    public static linspace(min: number, max: number, count: number): Array<number> {
        const space: Array<number> = [];
        for (let i = 0; i < count; i++) {
            space[i] = this.translate(i, 0, count - 1, min, max);
        }
        return space;
    }
    /**
     * Generate an array of logarithmically spaced numbers.
     * @param min The initial magnitude of the space
     * @param max The final magnitude of the space
     * @param count The number of values in the space
     * @returns The logarithmic space as an array of numbers
     * @example
     * ```js
     * const space = SMath.logspace(0, 2, 5);
     * // [ 1, 3.2, 10, 31.6, 100 ]
     * ```
     */
    public static logspace(min: number, max: number, count: number): Array<number> {
        return this.linspace(min, max, count).map(n => 10 ** n);
    }
    /**
     * Compute the factorial of `n`.
     * @param n Any positive integer
     * @returns `n!`
     * @example
     * ```js
     * const y = SMath.factorial(5); // 120
     * ```
     */
    public static factorial(n: number): number {
        if (n < 0 || (n | 0) !== n) {
            throw new Error('Input must be a positive integer.');
        } else if (n === 0) {
            return 1;
        } else if (n <= 2) {
            return n;
        } else {
            return n * this.factorial(n - 1);
        }
    }
    /**
     * Calculate the relative normalized error or deviation from any
     * value to an accepted value. An error of 0 indicates that the
     * two values are identical. An error of -0.1 indicates that the
     * experimental value is 10% smaller than (90% of) the accepted
     * value. An error of 1.0 indicates that the experimental value
     * is 100% greater (or twice the size) of the accepted value.
     * @param experimental The value observed or produced by a test
     * @param actual The accepted or theoretical value
     * @returns The relative (normalized) error
     * @example
     * ```js
     * const e = SMath.error(22.5, 25); // -0.1
     * ```
     */
    public static error(experimental: number, actual: number): number {
        return (experimental - actual) / actual;
    }
    /**
     * Add up all the inputs.
     * If none are present, returns 0.
     * @param data An array of numeric inputs
     * @returns The sum total
     * @example
     * ```js
     * const y = SMath.sum([1, 2, 3]); // 6
     * ```
     */
    public static sum(data: Array<number>): number {
        return data.reduce((a, b) => a + b, 0);
    }
    /**
     * Multiply all the inputs.
     * If none are present, returns 1.
     * @param data An array of numeric inputs
     * @returns The product
     * @example
     * ```js
     * const y = SMath.prod([2, 2, 3, 5]); // 60
     * ```
     */
    public static prod(data: Array<number>): number {
        return data.reduce((a, b) => a * b, 1);
    }
    /**
     * Compute the average, or mean, of a set of numbers.
     * @param data An array of numeric inputs
     * @returns The average, or mean
     * @example
     * ```js
     * const y = SMath.avg([1, 2, 4, 4]); // 2.75
     * ```
     */
    public static avg(data: Array<number>): number {
        return this.sum(data) / data.length;
    }
    /**
     * Compute the variance of a **complete population**.
     * @param data An array of numeric inputs
     * @returns The population variance
     * @example
     * ```js
     * const y = SMath.varp([1, 2, 4, 4]); // 1.6875
     * ```
     */
    public static varp(data: Array<number>): number {
        const mean: number = this.avg(data),
            squares: Array<number> = data.map(x => (x - mean) ** 2);
        return this.sum(squares) / data.length;
    }
    /**
     * Compute the variance of a **sample**.
     * @param data An array of numeric inputs
     * @returns The sample variance
     * @example
     * ```js
     * const y = SMath.vars([1, 2, 4, 4]); // 2.25
     * ```
     */
    public static vars(data: Array<number>): number {
        const mean: number = this.avg(data),
            squares: Array<number> = data.map(x => (x - mean) ** 2);
        return this.sum(squares) / (data.length - 1);
    }
    /**
     * Compute the standard deviation of a **complete population**.
     * @param data An array of numeric inputs
     * @returns The population standard deviation
     */
    public static stdevp(data: Array<number>): number {
        return Math.sqrt(this.varp(data));
    }
    /**
     * Compute the standard deviation of a **sample**.
     * @param data An array of numeric inputs
     * @returns The sample standard deviation
     */
    public static stdevs(data: Array<number>): number {
        return Math.sqrt(this.vars(data));
    }
}