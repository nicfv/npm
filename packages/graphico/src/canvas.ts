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
        showMouse: true,
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
     * Contains a list of current keys pressed
     */
    private readonly keys: string[] = [];
    private readonly mouseButtons: number[] = [];
    private mouseX: number = 0;
    private mouseY: number = 0;
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
        canvas.style.cursor = this.config.showMouse ? 'default' : 'none';
        // Event listeners
        canvas.addEventListener('mousemove', e => {
            this.mouseX = Math.floor(e.offsetX / this.config.scale);
            this.mouseY = Math.floor(e.offsetY / this.config.scale);
            console.log(this.mouseX, this.mouseY);
        });
        canvas.addEventListener('keydown', e => {
            const key: string = e.key.toLowerCase();
            if (!this.keys.includes(key)) {
                this.keys.push(key);
            }
            console.log(this.keys);
        });
        canvas.addEventListener('keyup', e => {
            const key: string = e.key.toLowerCase();
            const index: number = this.keys.indexOf(key);
            if (index >= 0) {
                this.keys.splice(index, 1);
            }
            console.log(this.keys);
        });
        canvas.addEventListener('mousedown', e => {
            const button: number = e.button;
            if (!this.mouseButtons.includes(button)) {
                this.mouseButtons.push(button);
            }
            console.log(this.mouseButtons);
        });
        canvas.addEventListener('mouseup', e => {
            const button: number = e.button;
            const index: number = this.mouseButtons.indexOf(button);
            if (index >= 0) {
                this.mouseButtons.splice(index, 1);
            }
            console.log(this.mouseButtons);
        });
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
        const copy: T = JSON.parse(JSON.stringify(defaults));
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
    /**
     * Optionally show or hide the mouse when hovering over the canvas
     */
    readonly showMouse: boolean;
    // readonly keyboard: (key: string) => void;
    // readonly mouse: (x: number, y: number) => void;
    // readonly click: (x: number, y: number) => void;
    // readonly loop: (keys: string[], x: number, y: number) => void;
}