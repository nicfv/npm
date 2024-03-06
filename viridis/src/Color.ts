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
     */
    constructor(public readonly red: number, public readonly green: number, public readonly blue: number, public readonly alpha: number = 100) {
        this.red = SMath.clamp(red, 0, 255);
        this.green = SMath.clamp(green, 0, 255);
        this.blue = SMath.clamp(blue, 0, 255);
        this.alpha = SMath.clamp(alpha, 0, 100);
    }
    /**
     * Return the most contrasting color for
     * text on a background of this color.
     * @returns Black or white
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
     */
    public toString(): string {
        return 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',' + this.alpha + '%)';
    }
}