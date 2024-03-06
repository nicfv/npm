import { SMath } from 'smath';
import { Color } from './Color';

/**
 * Represents a single color stop in a linear gradient.
 */
export class ColorStop {
    /**
     * Define a new color stop.
     * @param color The color of the color stop
     * @param stop The normalized value [0-1] for the location of the color stop
     */
    constructor(public readonly color: Color, public readonly stop: number) {
        this.stop = SMath.clamp(stop, 0, 1);
    }
}

export class Gradient {
    constructor(protected readonly colorStops: Array<ColorStop>) {
        if (colorStops.length < 2) {
            throw new Error('Must include at least 2 colors to create a gradient.');
        }
        this.colorStops.sort((a, b) => a.stop - b.stop);
    }
    public static linear(colors: Array<Color>): Gradient {
        const N: number = colors.length - 1;
        return new Gradient(colors.map((color, i) => new ColorStop(color, SMath.translate(i, 0, N, 0, 1))));
    }
    public getColor(x: number): Color {
        const N: number = this.colorStops.length - 1;
        if (x <= this.colorStops[0].stop) {
            return this.colorStops[0].color;
        } else if (x >= this.colorStops[N].stop) {
            return this.colorStops[N].color;
        }
        throw 'TODO';
    }
}