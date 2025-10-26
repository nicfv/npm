import { Color } from 'viridis';

/**
 * Represents a canvas for drawing and animating
 */
export class Canvas {
    /**
     * Default canvas options
     */
    private static readonly defaults: Options = {
        parent: document.body,
        width: 600,
        height: 400,
        scale: 1,
        background: new Color(0, 0, 0, 0),
        border: new Color(0, 0, 0, 0),
    };
    /**
     * Configuration options for this canvas
     */
    private readonly config: Options;
    /**
     * Can be used to render 2D graphics onto the canvas
     */
    public readonly graphics: CanvasRenderingContext2D;
    /**
     * Create a new canvas with the provided options
     * @param options Configuration options
     */
    constructor(options: Partial<Options> = {}) {
        this.config = Canvas.setDefaults(options, Canvas.defaults);
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const graphics = canvas.getContext('2d');
        if (graphics) {
            this.graphics = graphics;
        } else {
            throw new Error('Could not initialize canvas graphics.');
        }
        // Set static properties
        this.config.parent.appendChild(canvas);
        canvas.tabIndex = 1;
        canvas.focus();
        canvas.style.outline = 'none';
        canvas.style.imageRendering = 'pixelated';
        // Set custom properties
        canvas.width = this.config.width;
        canvas.height = this.config.height;
        canvas.style.width = `${this.config.width * this.config.scale}px`;
        canvas.style.height = `${this.config.height * this.config.scale}px`;
        canvas.style.background = this.config.background.toString();
        canvas.style.border = `1px solid ${this.config.border}`;
    }
    /**
     * Completely clears the canvas.
     */
    public clear(): void {
        this.graphics.clearRect(0, 0, this.config.width, this.config.height);
    }
    /**
     * Set defaults for all undefined options.
     */
    private static setDefaults<T>(options: Partial<T>, defaults: T): T {
        const copy: T = JSON.parse(JSON.stringify(defaults))
        for (const key in copy) {
            copy[key] = options[key] ?? defaults[key];
        }
        return copy;
    }
}

/**
 * Configuration Options for Canvas
 */
export interface Options {
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
    readonly background: Color;
    /**
     * The CSS border style for the canvas
     */
    readonly border: Color;
}