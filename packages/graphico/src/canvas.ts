/**
 * Represents a canvas for drawing and animating
 */
export class Canvas {
    /**
     * Default canvas options
     */
    private static readonly defaults: Options = {
        parent: document.body,
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
    constructor(options: Partial<Options>) {
        this.config = Canvas.setDefaults(options, Canvas.defaults);
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        this.graphics = canvas.getContext('2d')!;
        this.config.parent.appendChild(canvas);
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
     * The parent element to append the canvas element to
     */
    readonly parent: Node;
}