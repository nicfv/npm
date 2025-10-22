import * as SMath from 'smath';
import { HSL, RGB } from './types';
import { hsl2rgb, rgb2hsl } from './lib';

/**
 * Structure for storing colors based on RGBa values.
 */
export class Color {
    /**
     * Color hue, in degrees [0, 360)
     */
    public readonly hue: number;
    /**
     * Saturation percent [0, 100]
     */
    public readonly saturation: number;
    /**
     * Lightness percent [0, 100]
     */
    public readonly lightness: number;
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
    constructor(public readonly red: number, public readonly green: number, public readonly blue: number, public readonly alpha = 100) {
        this.red = SMath.clamp(red, 0, 255) | 0;
        this.green = SMath.clamp(green, 0, 255) | 0;
        this.blue = SMath.clamp(blue, 0, 255) | 0;
        this.alpha = SMath.clamp(alpha, 0, 100) | 0;
        // Compute HSL color values
        const hsl: HSL = rgb2hsl({ red: this.red, green: this.green, blue: this.blue });
        this.hue = (hsl.hue % 360) | 0;
        this.saturation = SMath.clamp(hsl.saturation, 0, 100) | 0;
        this.lightness = SMath.clamp(hsl.lightness, 0, 100) | 0;
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
        if (this.lightness > 50) {
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
    public toString(type: 'rgb' | 'hsl' | 'hex' = 'hex'): string {
        switch (type) {
            case ('rgb'): {
                if (this.alpha < 100) {
                    return `rgb(${this.red},${this.green},${this.blue},${this.alpha}%)`;
                } else {
                    return `rgb(${this.red},${this.green},${this.blue})`;
                }
            }
            case ('hsl'): {
                if (this.alpha < 100) {
                    return `hsl(${this.hue}deg,${this.saturation}%,${this.lightness}%,${this.alpha}%)`;
                } else {
                    return `hsl(${this.hue}deg,${this.saturation}%,${this.lightness}%)`;
                }
            }
            case ('hex'): {
                const noTransparency = `#${SMath.toHex(this.red, 2)}${SMath.toHex(this.green, 2)}${SMath.toHex(this.blue, 2)}`;
                if (this.alpha < 100) {
                    const alpha255: number = SMath.clamp(SMath.translate(this.alpha, 0, 100, 0, 255) | 0, 0, 255);
                    return noTransparency + SMath.toHex(alpha255, 2);
                } else {
                    return noTransparency;
                }
            }
            default: {
                throw new Error('Invalid color type: ' + type);
            }
        }
    }
    /**
     * @deprecated Use `Color.hex('#code')` instead
     */
    public static from(hex: string): Color {
        return Color.hex(hex);
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
     * const red = Color.hex('#ff0000');
     * ```
     */
    public static hex(hex: string): Color {
        const regex = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})?$/.exec(hex);
        if (regex === null) {
            throw new Error('Invalid hexadecimal string: ' + hex);
        }
        return new Color(parseInt(regex[1], 16), parseInt(regex[2], 16), parseInt(regex[3], 16), SMath.translate(parseInt(regex[4] ?? 'FF', 16), 0, 255, 0, 100));
    }
    public static hsl(hue: number, saturation: number, lightness: number): Color {
        const rgb: RGB = hsl2rgb({ hue: hue, saturation: saturation, lightness: lightness });
        return new Color(rgb.red, rgb.green, rgb.blue);
    }
}