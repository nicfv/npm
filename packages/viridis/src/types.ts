/**
 * Red-Green-Blue Color Interface
 */
export interface RGB {
    /**
     * Red channel intensity [0-255]
     */
    readonly red: number;
    /**
     * Green channel intensity [0-255]
     */
    readonly green: number;
    /**
     * Blue channel intensity [0-255]
     */
    readonly blue: number;
}

/**
 * Hue-Saturation-Lightness Color Interface
 */
export interface HSL {
    /**
     * Hue [0-360]
     */
    readonly hue: number;
    /**
     * Saturation [0-100]
     */
    readonly saturation: number;
    /**
     * Lightness [0-100]
     */
    readonly lightness: number;
}
