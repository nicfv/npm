export class Canvas {
    private static readonly defaults: Options = {
        parent: document.body,
    };
    private readonly config: Options;
    public readonly graphics: CanvasRenderingContext2D;
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