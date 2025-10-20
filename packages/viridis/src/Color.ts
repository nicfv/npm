import * as SMath from 'smath';
import { HSL, RGB } from './types';
import { hsl2rgb, rgb2hsl } from './lib';

/**
 * Structure for storing colors based on RGBa values.
 */
export class Color {
    public readonly rgb: RGB;
    public readonly hsl: HSL;
    constructor(definition: RGB | HSL | string) {
        if (typeof definition === 'string') {
            const regex = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})?$/.exec(definition);
            if (regex === null) {
                throw new Error('Invalid hexadecimal string: ' + definition);
            }
            this.rgb = {
                red: parseInt(regex[1], 16),
                green: parseInt(regex[2], 16),
                blue: parseInt(regex[3], 16),
                alpha: SMath.translate(parseInt(regex[4] ?? 'FF', 16), 0, 255, 0, 100),
            };
            this.hsl = rgb2hsl(this.rgb);
        } else if ('red' in definition) {
            this.rgb = {
                red: SMath.clamp(definition.red, 0, 255) | 0,
                green: SMath.clamp(definition.green, 0, 255) | 0,
                blue: SMath.clamp(definition.blue, 0, 255) | 0,
                alpha: SMath.clamp(definition.alpha ?? 100, 0, 100) | 0,
            };
            this.hsl = rgb2hsl(this.rgb);
        } else {
            this.hsl = {
                hue: (definition.hue % 360) | 0,
                saturation: SMath.clamp(definition.saturation, 0, 100) | 0,
                lightness: SMath.clamp(definition.lightness, 0, 100) | 0,
            };
            this.rgb = hsl2rgb(this.hsl);
        }
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
    public toString(type: 'rgb' | 'rgba' | 'hsl' | 'hex' | 'hex-transparency' = 'rgba'): string {
        switch (type) {
            case 'rgb': {
                return 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
            }
            case 'rgba': {
                return 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',' + this.alpha + '%)';
            }
            case 'hsl': {
                return 'hsl(' + this.hue + 'deg,' + this.saturation + '%,' + this.lightness + '%)';
            }
            case 'hex': {
                return '#' + SMath.toHex(this.red, 2) + SMath.toHex(this.green, 2) + SMath.toHex(this.blue, 2);
            }
            case 'hex-transparency': {
                const alpha255: number = SMath.clamp(SMath.round2(SMath.translate(this.alpha, 0, 100, 0, 255), 1), 0, 255);
                return this.toString('hex') + SMath.toHex(alpha255, 2);
            }
            default: {
                throw new Error('Invalid color type: ' + type);
            }
        }
    }
}