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
}