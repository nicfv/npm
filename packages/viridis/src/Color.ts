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
     * const red = new Color(255, 0, 0);
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
     * Convert a decimal byte [0-255] to a hexadecimal [00-FF] byte.
     * @param byte Decimal byte value
     * @returns Hexadecimal byte value
     */
    private static toHex(byte: number): string {
        return SMath.clamp(byte | 0, 0, 255).toString(16).padStart(2, '0').toUpperCase();
    }
    /**
     * Return the most contrasting color for
     * text on a background of this color.
     * @returns Black or white
     * @example
     * const contrast = red.getContrastingColor(); // #FFFFFF
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
     * @param type The color encoding to use
     * @returns A valid CSS color code
     * @example
     * const css = red.toString(); // #FF0000
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
                const noTransparency = `#${Color.toHex(this.red)}${Color.toHex(this.green)}${Color.toHex(this.blue)}`;
                if (this.alpha < 100) {
                    const alpha255: number = SMath.clamp(SMath.translate(this.alpha, 0, 100, 0, 255) | 0, 0, 255);
                    return noTransparency + Color.toHex(alpha255);
                } else {
                    return noTransparency;
                }
            }
            default: {
                throw new Error(`Invalid color type: ${type}`);
            }
        }
    }
    /**
     * Create a new color given a hexadecimal string.
     * Will throw an error if the string is invalid.
     * - Expects 2 bits [0-F] for red, green, blue channels each
     * - String can optionally start with the character '#'
     * - Alpha channel can be included in the final 2 bits
     * @param hex Hexadecimal string
     * @returns A new color defined by the hexadecimal string
     * @example
     * const red = Color.hex('#ff0000');
     */
    public static hex(hex: string): Color {
        const regex = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})?$/.exec(hex);
        if (regex === null) {
            throw new Error(`Invalid hexadecimal string: ${hex}`);
        }
        return new Color(parseInt(regex[1], 16), parseInt(regex[2], 16), parseInt(regex[3], 16), SMath.translate(parseInt(regex[4] ?? 'FF', 16), 0, 255, 0, 100));
    }
    /**
     * Define a new color from RGBa values. Alias for `new Color(...)`
     * @param red Red channel intensity [0, 255]
     * @param green Green channel intensity [0, 255]
     * @param blue Blue channel intensity [0, 255]
     * @param alpha Alpha channel transparency [0, 100]
     * @returns A new color defined by color channel intensity values
     * @example
     * const red = Color.rgb(255, 0, 0); // #FF0000
     */
    public static rgb(red: number, green: number, blue: number, alpha = 100): Color {
        return new Color(red, green, blue, alpha);
    }
    /**
     * 
     * @param hue The color hue, in degrees [0, 360)
     * @param saturation The saturation percent [0, 100]
     * @param lightness The lightness percent [0, 100]
     * @param alpha Alpha channel intensity [0, 100]
     * @returns A new color defined by hue, sautration, and lightness
     * @example
     * const red = Color.hsl(0, 100, 50); // #FF0000
     */
    public static hsl(hue: number, saturation: number, lightness: number, alpha = 100): Color {
        const rgb: RGB = hsl2rgb({ hue: hue, saturation: saturation, lightness: lightness });
        return new Color(rgb.red, rgb.green, rgb.blue, alpha);
    }
}