/**
 * @packageDocumentation
 * Small math function library
 * 
 * ```shell
 * npm i smath
 * ```
 * @document ../CHANGELOG.md
 */
/**
 * Contains a small math function library including
 * useful interpolation and extrapolation functions.
 */
export namespace SMath {
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
    export function approx(a: number, b: number, epsilon: number = 1e-6): boolean {
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
    export function clamp(n: number, min: number, max: number): number {
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
    export function normalize(n: number, min: number, max: number): number {
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
    export function expand(n: number, min: number, max: number): number {
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
    export function translate(n: number, min1: number, max1: number, min2: number, max2: number): number {
        return expand(normalize(n, min1, max1), min2, max2);
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
    export function linspace(min: number, max: number, count: number): Array<number> {
        const space: Array<number> = [];
        for (let i = 0; i < count; i++) {
            space[i] = translate(i, 0, count - 1, min, max);
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
    export function logspace(min: number, max: number, count: number): Array<number> {
        return linspace(min, max, count).map(n => 10 ** n);
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
    export function factorial(n: number): number {
        if (n < 0 || (n | 0) !== n) {
            throw new Error('Input must be a positive integer.');
        } else if (n === 0) {
            return 1;
        } else if (n <= 2) {
            return n;
        } else {
            return n * factorial(n - 1);
        }
    }
    /**
     * Factorize `n` into its prime factors.
     * @param n Any positive integer
     * @returns The array of prime factors
     * @example
     * ```js
     * const y = SMath.factors(12); // [ 2, 2, 3 ]
     * ```
     */
    export function factors(n: number): Array<number> {
        if (n < 0 || (n | 0) !== n) {
            throw new Error('Input must be a positive integer!');
        }
        if (n <= 3) {
            return [n];
        }
        const f: Array<number> = [];
        let i: number = 2;
        while (n > 1 && i <= n) {
            if ((n / i) === ((n / i) | 0)) {
                n /= i;
                f.push(i);
            } else {
                i++;
            }
        }
        return f;
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
    export function error(experimental: number, actual: number): number {
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
    export function sum(data: Array<number>): number {
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
    export function prod(data: Array<number>): number {
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
    export function avg(data: Array<number>): number {
        return sum(data) / data.length;
    }
    /**
     * Compute the median of a set of numbers.
     * @param data An array of numeric inputs
     * @returns The median of the dataset
     * @example
     * ```js
     * const y = SMath.median([2, 5, 3, 1]); // 2.5
     * ```
     */
    export function median(data: Array<number>): number {
        data.sort((a, b) => a - b);
        if (data.length % 2) {
            return data[(data.length - 1) / 2];
        }
        return avg([data[data.length / 2 - 1], data[data.length / 2]]);
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
    export function varp(data: Array<number>): number {
        const mean: number = avg(data),
            squares: Array<number> = data.map(x => (x - mean) ** 2);
        return sum(squares) / data.length;
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
    export function vars(data: Array<number>): number {
        const mean: number = avg(data),
            squares: Array<number> = data.map(x => (x - mean) ** 2);
        return sum(squares) / (data.length - 1);
    }
    /**
     * Compute the standard deviation of a **complete population**.
     * @param data An array of numeric inputs
     * @returns The population standard deviation
     * @example
     * ```js
     * const y = SMath.stdevp([1, 2, 3, 4]); // 1.118...
     * ```
     */
    export function stdevp(data: Array<number>): number {
        return Math.sqrt(varp(data));
    }
    /**
     * Compute the standard deviation of a **sample**.
     * @param data An array of numeric inputs
     * @returns The sample standard deviation
     * @example
     * ```js
     * const y = SMath.stdevs([1, 2, 3, 4]); // 1.29...
     * ```
     */
    export function stdevs(data: Array<number>): number {
        return Math.sqrt(vars(data));
    }
    /**
     * Generate a uniformly-distributed floating-point number within the range.
     * @param min The minimum bound
     * @param max The maximum bound
     * @returns A random float within the range
     * @example
     * ```js
     * const y = SMath.runif(-2, 2); // 0.376...
     * ```
     */
    export function runif(min: number, max: number): number {
        return expand(Math.random(), min, max);
    }
    /**
     * Generate a uniformly-distributed integer within the range.
     * @param min The minimum bound (inclusive)
     * @param max The maximum bound (inclusive)
     * @returns A random integer within the range
     * @example
     * ```js
     * const y = SMath.rint(-4, 3); // -4
     * ```
     */
    export function rint(min: number, max: number): number {
        min |= 0;
        max |= 0;
        if (min < 0) { min--; }
        if (max > 0) { max++; }
        return clamp(runif(min, max), min, max) | 0; // `| 0` pulls toward 0
    }
    /**
     * Generate a normally-distributed floating-point number.
     * @param mean The mean of the population distribution
     * @param stdev The standard deviation of the population
     * @returns A random float
     * @example
     * ```js
     * const y = SMath.rnorm(2, 3); // 1.627...
     * ```
     */
    export function rnorm(mean: number = 0, stdev: number = 1): number {
        return mean + stdev * Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
    }
    /**
     * Generate a population of normally-distributed floating-point numbers.
     * @param count The number of values to generate
     * @param mean The mean of the population distribution
     * @param stdev The standard deviation of the population
     * @returns A population of random floats
     * @example
     * ```js
     * const dataset = SMath.rdist(3); // [ 1.051..., -0.779..., -2.254... ]
     * ```
     */
    export function rdist(count: number, mean: number = 0, stdev: number = 1): Array<number> {
        const distribution: Array<number> = [];
        for (let i = 0; i < count; i++) {
            distribution[i] = rnorm(mean, stdev);
        }
        return distribution;
    }
    /**
     * Take the limit of a function. A return value of `NaN` indicates
     * that no limit exists either due to a discontinuity or imaginary value.
     * @param f Function `f(x)`
     * @param x The x-value where to take the limit
     * @param h The approach distance
     * @param discontinuity_cutoff The discontinuity cutoff
     * @returns `lim(f(x->x))`
     * @example
     * ```js
     * const y = SMath.lim(Math.log, 0); // -Infinity
     * ```
     */
    export function lim(f: (x: number) => number, x: number, h: number = 1e-3, discontinuity_cutoff: number = 1): number {
        const center: number = f(x),
            left1: number = f(x - h),
            left2: number = f(x - h / 2),
            right1: number = f(x + h),
            right2: number = f(x + h / 2);
        let left: number,
            right: number;
        if (Number.isFinite(center)) {
            return center;
        }
        // Check the limit approaching from the left
        if (Number.isFinite(left1) && Number.isFinite(left2)) {
            if (left2 > left1 + 2 * h) {
                left = Infinity;
            } else if (left2 < left1 - 2 * h) {
                left = -Infinity;
            } else {
                left = avg([left1, left2]);
            }
        } else if (left1 === left2) { // Handles +/-Infinity case
            left = left1;
        } else {
            left = NaN;
        }
        // Check the limit approaching from the right
        if (Number.isFinite(right1) && Number.isFinite(right2)) {
            if (right2 > right1 + 2 * h) {
                right = Infinity;
            } else if (right2 < right1 - 2 * h) {
                right = -Infinity;
            } else {
                right = avg([right1, right2]);
            }
        } else if (right1 === right2) { // Handles +/-Infinity case
            right = right1;
        } else {
            right = NaN;
        }
        // Check if limits match or are close
        if (left === right) { // Handles +/-Infinity case
            return left;
        } else if (SMath.approx(left, right, discontinuity_cutoff)) {
            return avg([left, right]);
        } else if (!Number.isNaN(left) && Number.isNaN(right)) {
            return left;
        } else if (Number.isNaN(left) && !Number.isNaN(right)) {
            return right;
        } else {
            return NaN;
        }
    }
    /**
     * Take the derivative of a function.
     * @param f Function `f(x)`
     * @param x The x-value where to evaluate the derivative
     * @param h Small step value
     * @returns `f'(x)`
     * @example
     * ```js
     * const y = SMath.differentiate(x => 3 * x ** 2, 2); // 12
     * ```
     */
    export function differentiate(f: (x: number) => number, x: number, h: number = 1e-3): number {
        return (f(x + h) - f(x - h)) / (2 * h);
    }
    /**
     * Compute the definite integral of a function.
     * @param f Function `f(x)`
     * @param a The miminum integral bound
     * @param b The maximum integral bound
     * @param Ndx The number of rectangles to compute
     * @returns `F(b)-F(a)`
     * @example
     * ```js
     * const y = SMath.integrate(x => 3 * x ** 2, 1, 2); // 7
     * ```
     */
    export function integrate(f: (x: number) => number, a: number, b: number, Ndx: number = 1e3): number {
        return ((b - a) / Ndx) * sum(linspace(a, b, Ndx).map(x => f(x)));
    }
}