import { SMath } from 'smath';

/**
 * Structure for storing colors based on RGBa values.
 */
export class Color {
    /**
     * Define a new color from RGBa values.
     * @param red Red channel intensity [0, 255]
     * @param green Green channel intensity [0, 255]
     * @param blue Blue channel intensity [0, 255]
     * @param alpha Alpha channel transparency [0, 100]
     * @example
     * ```js
     * const red = new Color(255, 0, 0);
     * ```
     */
    constructor(public readonly red: number, public readonly green: number, public readonly blue: number, public readonly alpha: number = 100) {
        this.red = SMath.clamp(red, 0, 255) | 0;
        this.green = SMath.clamp(green, 0, 255) | 0;
        this.blue = SMath.clamp(blue, 0, 255) | 0;
        this.alpha = SMath.clamp(alpha, 0, 100) | 0;
    }
    /**
     * Return the most contrasting color for
     * text on a background of this color.
     * @returns Black or white
     * @example
     * ```js
     * const contrast = red.getContrastingColor();
     * // Returns the color white (255, 255, 255)
     * ```
     */
    public getContrastingColor(): Color {
        if (this.red + this.green * 1.5 + this.blue * 0.5 > 255 * 1.5) {
            return new Color(0, 0, 0);
        } else {
            return new Color(255, 255, 255);
        }
    }
    /**
     * Return a string representation of this color.
     * @returns A valid CSS color code
     * @example
     * ```js
     * const css = red.toString(); // rgba(255,0,0,100%)
     * ```
     */
    public toString(): string {
        return 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',' + this.alpha + '%)';
    }
    /**
     * Create a new color given a hexadecimal string.
     * Will throw an error if the string is invalid.
     * - Expects 2 bits [0-F] for red, green, blue channels (6 chars total)
     * - String can optionally start with the character '#'
     * - Alpha channel can be included for an additional 2 bits (8 chars total)
     * @param hex Hexadecimal string
     * @returns A new color defined by the hexadecimal string
     * @example
     * ```js
     * const red = Color.from('#ff0000');
     * ```
     */
    public static from(hex: string): Color {
        const regex = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})?$/.exec(hex);
        if (regex === null) {
            throw new Error('Invalid hexadecimal string: ' + hex);
        }
        return new Color(parseInt(regex[1], 16), parseInt(regex[2], 16), parseInt(regex[3], 16), parseInt(regex[4] ?? 'FF', 16));
    }
}