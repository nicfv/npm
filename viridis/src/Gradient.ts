import { SMath } from 'smath';
import { Color } from './Color';
/**
 * Represents a linear, uniform color gradient.
 */
export class Gradient {
    /**
     * Define a new linear color gradient using an array of
     * color stops. Gradients can include any number of color
     * stops, which are all equally spaced from one another.
     * @param colors An array of colors to define this color gradient
     * @example
     * ```js
     * const redBlue = new Gradient([
     *     new Color(255, 0, 0),
     *     new Color(0, 0, 255),
     * ]);
     * ```
     */
    constructor(public readonly colors: Array<Color>) {
        if (colors.length < 1) {
            throw new Error('Must include at least 1 color to create a gradient.');
        }
    }
    /**
     * Linearly interpolate between color stops to get a color along this gradient.
     * @param x A value between `min, max` to use for selecting a color along this
     * gradient. An `x` value of `min` will select the first color stop, and an `x`
     * value of `max` will select the last color stop. If `min` and `max` are not
     * present, `x` should be a normalized value.
     * @param min The minimum range of the color scale
     * @param max The maximum range of the color scale
     * @returns The interpolated color
     * @example
     * ```js
     * const myColor = redBlue.getColor(0.5);
     * // Returns interpolated color (127.5, 0, 127.5)
     * ```
     */
    public getColor(x: number, min: number = 0, max: number = 1): Color {
        x = SMath.normalize(x, min, max);
        if (this.colors.length === 1) {
            return this.colors[0];
        } else if (x <= 0) {
            return this.colors[0];
        } else if (x >= 1) {
            return this.colors[this.colors.length - 1];
        }
        const N = this.colors.length - 1, // number of buckets
            s = 1 / N, // size of each bucket
            n = Math.floor(x / s), // bucket number
            a = s * n, // bucket min value
            b = s * (n + 1), // bucket max value
            A = this.colors[n], // bucket min color
            B = this.colors[n + 1]; //bucket max color
        return new Color(
            SMath.translate(x, a, b, A.red, B.red),
            SMath.translate(x, a, b, A.green, B.green),
            SMath.translate(x, a, b, A.blue, B.blue),
            SMath.translate(x, a, b, A.alpha, B.alpha));
    }
    /**
     * Return a string representation of this gradient.
     * @param deg The direction of this color gradient, in degrees
     * @returns A valid CSS color gradient
     * @example
     * ```js
     * const str = redBlue.toString(180);
     * // linear-gradient(180deg,rgba(255,0,0,100%),rgba(0,0,255,100%))
     * ```
     */
    public toString(deg: number = 90): string {
        return 'linear-gradient(' + deg + 'deg,' + this.colors.map(color => color.toString()).join(',') + ')';
    }
}