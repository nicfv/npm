/**
 * An (x,y) cartesian coordinate pair.
 */
export interface Point {
    /**
     * The x-coordinate (horizontal)
     */
    readonly x: number;
    /**
     * The y-coordinate (vertical)
     */
    readonly y: number;
}

/**
 * Represents a set of options for this chart.
 */
export interface ChartOptions {
    /**
     * The outer size of this chart, in pixels.
     */
    readonly size: Point;
    /**
     * The font used in this chart.
     */
    readonly font: {
        /**
         * The name of the font family.
         */
        readonly name: string;
        /**
         * The size of the font, in pixels.
         */
        readonly size: number;
    };
}

/**
 * Defines where the anchor is on a `<text>` element.
 */
export const enum TextAnchor {
    /**
     * Centered
     */
    C,
    /**
     * Northwest (upper-left)
     */
    NW,
    /**
     * North (upper-centered)
     */
    N,
    /**
     * Northeast (upper-right)
     */
    NE,
    /**
     * East (right-centered)
     */
    E,
    /**
     * Southeast (lower-right)
     */
    SE,
    /**
     * South (lower-centered)
     */
    S,
    /**
     * Southwest (lower-left)
     */
    SW,
    /**
     * West (left-centered)
     */
    W,
}