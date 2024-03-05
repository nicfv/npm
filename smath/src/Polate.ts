/**
 * Contains useful interpolation and extrapolation functions.
 */
export abstract class Polate {
    /**
     * Normalize the number `n` from the range `min, max` to the range `0, 1`
     * @param n The number to normalize
     * @param min The minimum value in the range
     * @param max The maximum value in the range
     * @returns A normalized value
     * @example
     * ```js
     * const y = Polate.normalize(18, 9, 99); // 0.1
     * ```
     */
    public static normalize(n: number, min: number, max: number): number {
        if (min === max) {
            return min;
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
     * const y = Polate.expand(0.25, 4, 6); // 4.5
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
     * const C = 20, F = Polate.translate(C, 0, 100, 32, 212); // 68
     * ```
     */
    public static translate(n: number, min1: number, max1: number, min2: number, max2: number): number {
        return this.expand(this.normalize(n, min1, max1), min2, max2);
    }
}