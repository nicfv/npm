import { SMath } from 'smath';
import { Color } from './Color';
/**
 * Represents a linear, uniform color gradient.
 */
export class Gradient {
    /**
     * Define a new linear color gradient using an array of color stops.
     * @param colors An array of colors to define this color gradient
     */
    constructor(protected readonly colors: Array<Color>) {
        if (colors.length < 1) {
            throw new Error('Must include at least 1 color to create a gradient.');
        }
    }
    /**
     * Linearly interpolate between color stops to get a color along this gradient.
     * @param x A normalized value to use for selecting a color along this gradient
     * @returns The interpolated color
     */
    public getColor(x: number): Color {
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
}