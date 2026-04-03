/**
 * Configuration Options for Canvas
 */
export interface Options {
    /**
     * Optionally print debug messages to the console
     */
    readonly debug: boolean;
    /**
     * Appends the canvas onto the parent element
     */
    readonly parent: Node;
    /**
     * The width of the drawing area, in pixels
     */
    readonly width: number;
    /**
     * The height of the drawing area, in pixels
     */
    readonly height: number;
    /**
     * The scale of the drawing area to the actual size of the canvas element
     */
    readonly scale: number;
    /**
     * The background color of the canvas
     */
    readonly background: string;
    /**
     * The border color for the canvas (when focused)
     */
    readonly border: string;
    /**
     * The border color for the canvas (when not focused)
     */
    readonly borderBlur: string;
    /**
     * Optionally show or hide the mouse when hovering over the canvas
     */
    readonly showMouse: boolean;
    /**
     * Refocus the canvas when it loses focus
     */
    readonly keepFocused: boolean;
    /**
     * The number of layers in this canvas
     */
    readonly numLayers: number;
    /**
     * The number of audio tracks
     */
    readonly numTracks: number;
    /**
     * Event listener for when a key is pressed
     * @param key The key that was pressed
     */
    readonly keydown: (key: string) => void;
    /**
     * Event listener for when a key is released
     * @param key The key that was released
     */
    readonly keyup: (key: string) => void;
    /**
     * Event listener for when the mouse is moved
     * @param x Cursor X-coordinate
     * @param y Cursor Y-coordinate
     */
    readonly mousemove: (x: number, y: number) => void;
    /**
     * Event listener for when a button on the mouse is pressed
     * @param button The button that was pressed
     */
    readonly mousedown: (button: number) => void;
    /**
     * Event listener for when a button on the mouse is released
     * @param button The button that was released
     */
    readonly mouseup: (button: number) => void;
    /**
     * Event listener for a the main animation loop
     * @param dt The number of milliseconds in between frames
     * @returns An array of `Drawable` to render on layer 0, or void
     */
    readonly loop: (dt: number) => void;
}

/**
 * Represents an object that can be drawn on the canvas.
 */
export interface Drawable {
    /**
     * Draw this object onto the canvas.
     * @param graphics Canvas 2D rendering interface
     */
    draw(graphics: CanvasRenderingContext2D): void;
}
