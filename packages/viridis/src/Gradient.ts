import * as SMath from 'smath';
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
    constructor(public readonly colors: Color[]) {
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
     * // Returns interpolated color #7F007F
     * ```
     */
    public getColor(x: number, min = 0, max = 1): Color {
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
     * @param type The gradient pattern shape
     * @param repeat The number of times to repeat this gradient
     * @param options Options to add before the color stops
     * @returns A valid CSS color gradient
     * @example
     * ```js
     * const str = redBlue.toString('linear', 2, ['45deg']);
     * // repeating-linear-gradient(45deg,#FF0000,#0000FF 50%)
     * ```
     */
    public toString(type: 'linear' | 'radial' | 'conic' = 'linear', repeat = 1, options: string[] = []): string {
        return `${repeat > 1 ? 'repeating-' : ''}${type}-gradient(${[...options, ...this.colors.map(color => color.toString())].join(',')}${repeat > 1 ? ` ${100 / repeat}%` : ''})`;
    }
    /**
     * Generate an SVG linear gradient element.
     * @param id The ID of this linear gradient, to be obtained with `url(#id)`
     * @param deg The angle of this color gradient, in degrees clockwise from the vertical
     * @returns A valid SVG color gradient
     * @example
     * ```js
     * const linearGrad = grad.toSVG('myGrad');
     * // Returns a <linearGradient> element to be appended onto <defs>
     * ```
     */
    public toSVG(id: string, deg = 90): SVGLinearGradientElement {
        const linearGradient: SVGLinearGradientElement = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        linearGradient.setAttribute('id', id);
        linearGradient.setAttribute('x1', '0');
        linearGradient.setAttribute('y1', '0');
        linearGradient.setAttribute('x2', Math.sin(deg * Math.PI / 180).toString());
        linearGradient.setAttribute('y2', Math.cos(deg * Math.PI / 180).toString());
        const maxColorIndex: number = this.colors.length - 1;
        this.colors.forEach((color, i) => {
            const colorStop: SVGStopElement = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            colorStop.setAttribute('offset', SMath.normalize(i, 0, maxColorIndex).toString());
            colorStop.setAttribute('stop-color', color.toString());
            linearGradient.append(colorStop);
        });
        return linearGradient;
    }
}