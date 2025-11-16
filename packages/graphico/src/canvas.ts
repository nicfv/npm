/**
 * Represents a canvas for drawing and animating
 */
export class Canvas {
    /**
     * Default canvas options
     */
    private static readonly defaults: Options = {
        debug: false,
        parent: document.body,
        width: 600,
        height: 400,
        scale: 1,
        background: 'transparent',
        border: 'transparent',
        borderBlur: 'transparent',
        showMouse: true,
        numLayers: 1,
        acceleration: 'hardware',
        keydown() { return; },
        keyup() { return; },
        mousemove() { return; },
        mousedown() { return; },
        mouseup() { return; },
        loop() { return; },
    };
    /**
     * Configuration options for this canvas
     */
    private readonly config: Options;
    /**
     * Can be used to render 2D graphics onto the canvas
     */
    private readonly graphics: CanvasRenderingContext2D[] = [];
    /**
     * Contains a list of current keys pressed
     */
    private readonly keys: string[] = [];
    /**
     * Contains a list of current mouse buttons pressed
     */
    private readonly mouseButtons: number[] = [];
    /**
     * The width of the canvas, in pixels
     */
    public readonly width: number;
    /**
     * The height of the canvas, in pixels
     */
    public readonly height: number;
    /**
     * Contains the mouse X-coordinate, in pixels
     */
    private mouseX = 0;
    /**
     * Contains the mouse Y-coordinate, in pixels
     */
    private mouseY = 0;
    /**
     * Represents the animation ID handle to cancel the animation
     */
    private animation = 0;
    /**
     * The last frame's high resolution timestamp
     */
    private lastFrame = 0;
    /**
     * Determine whether the client is focused or not
     */
    private focused = false;
    /**
     * Create a new canvas with the provided options
     * @param options Configuration options
     */
    constructor(options: Partial<Options> = {}) {
        this.config = Canvas.setDefaults(options, Canvas.defaults);
        this.width = this.config.width;
        this.height = this.config.height;
        // Create the container <div> element and set properties
        const container: HTMLDivElement = document.createElement('div');
        container.tabIndex = 1; // For element focus
        container.style.outline = 'none';
        container.style.width = `${this.config.width * this.config.scale}px`;
        container.style.height = `${this.config.height * this.config.scale}px`;
        container.style.border = `${this.config.scale}px solid ${this.config.border}`;
        container.style.background = this.config.background;
        container.style.cursor = this.config.showMouse ? 'default' : 'none';
        container.style.position = 'relative';
        this.config.parent.appendChild(container);
        // Create canvas layers
        for (let i = 0; i < this.config.numLayers; i++) {
            const canvas: HTMLCanvasElement = document.createElement('canvas');
            const graphics = canvas.getContext('2d', { 'willReadFrequently': this.config.acceleration === 'software' });
            if (graphics) {
                this.graphics.push(graphics);
            } else {
                throw new Error('Could not initialize canvas graphics.');
            }
            // Set properties for canvas
            canvas.style.imageRendering = 'pixelated';
            canvas.style.boxSizing = 'border-box';
            canvas.width = this.config.width;
            canvas.height = this.config.height;
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.position = 'absolute';
            graphics.imageSmoothingEnabled = false;
            container.appendChild(canvas);
        }
        // Event listeners
        container.addEventListener('mousemove', e => {
            if (!this.focused) { return; }
            this.mouseX = (e.offsetX / this.config.scale) | 0;
            this.mouseY = (e.offsetY / this.config.scale) | 0;
            this.log(e.type, this.mouseX, this.mouseY);
            this.config.mousemove(this.mouseX, this.mouseY);
        });
        container.addEventListener('keydown', e => {
            if (!this.focused) { return; }
            e.preventDefault();
            const key: string = e.key.toLowerCase();
            this.log(e.type, this.keys);
            if (!this.keys.includes(key)) {
                this.keys.push(key);
                this.config.keydown(key);
            }
        });
        container.addEventListener('keyup', e => {
            if (!this.focused) { return; }
            const key: string = e.key.toLowerCase();
            const index: number = this.keys.indexOf(key);
            this.log(e.type, this.keys);
            if (index >= 0) {
                this.keys.splice(index, 1);
                this.config.keyup(key);
            }
        });
        container.addEventListener('mousedown', e => {
            if (!this.focused) { return; }
            const button: number = e.button;
            this.log(e.type, this.mouseButtons);
            if (!this.mouseButtons.includes(button)) {
                this.mouseButtons.push(button);
                this.config.mousedown(button);
            }
        });
        container.addEventListener('mouseup', e => {
            if (!this.focused) { return; }
            const button: number = e.button;
            const index: number = this.mouseButtons.indexOf(button);
            this.log(e.type, this.mouseButtons);
            if (index >= 0) {
                this.mouseButtons.splice(index, 1);
                this.config.mouseup(button);
            }
        });
        container.addEventListener('focusin', e => {
            this.focused = true;
            container.style.borderColor = this.config.border;
            this.log(e.type, this.focused);
            this.animation = requestAnimationFrame(time => this.startAnimate(time));
        });
        container.addEventListener('focusout', e => {
            this.focused = false;
            container.style.borderColor = this.config.borderBlur;
            this.log(e.type, this.focused);
            cancelAnimationFrame(this.animation);
        });
        window.addEventListener('blur', e => {
            this.log(e.type);
            cancelAnimationFrame(this.animation);
        });
        container.addEventListener('contextmenu', e => e.preventDefault());
        // Focus on the canvas
        container.focus();
    }
    /**
     * Start the animation.
     */
    private startAnimate(time: DOMHighResTimeStamp): void {
        this.log('startAnimate', time);
        this.lastFrame = time;
        this.animation = requestAnimationFrame(time => this.animate(time));
    }
    /**
     * Run the main animation loop.
     */
    private animate(time: DOMHighResTimeStamp): void {
        const currentFrame: number = time;
        const dt: number = currentFrame - this.lastFrame;
        this.lastFrame = currentFrame;
        this.log('animate', dt, currentFrame);
        const drawables: Drawable[] = this.config.loop(dt) ?? [];
        for (const drawable of drawables) {
            this.draw(drawable);
        }
        this.animation = requestAnimationFrame(time => this.animate(time));
    }
    /**
     * Determine whether a key is currently pressed.
     * @param key The key to check
     * @returns True if `key` is down
     */
    public isKeyDown(key: string): boolean {
        return this.keys.includes(key.toLowerCase());
    }
    /**
     * Determine whether a mouse button is currently pressed.
     * @param button The button ID
     * @returns True if `button` is down
     */
    public isMouseButtonDown(button: number): boolean {
        return this.mouseButtons.includes(button);
    }
    /**
     * Get the current cursor position.
     * @returns Cursor position as `[x, y]`
     */
    public getMousePosition(): [number, number] {
        return [this.mouseX, this.mouseY];
    }
    /**
     * Take a screenshot of the canvas contents and save to a .png file.
     * @param name The file name of the screenshot
     */
    public screenshot(name = 'screenshot'): void {
        // Create an offscreen canvas
        const screen: Canvas = new Canvas({
            parent: document.createElement('div'),
            height: this.config.height,
            width: this.config.width,
            scale: this.config.scale,
        });
        // Draw the background and each layer
        screen.graphics[0].fillStyle = this.config.background;
        screen.graphics[0].fillRect(0, 0, screen.width, screen.height);
        for (const graphic of this.graphics) {
            screen.graphics[0].drawImage(graphic.canvas, 0, 0);
        }
        // Generate a data URL and set it as the download parameter for <a>
        const dataURL: string = screen.graphics[0].canvas.toDataURL();
        const downloadLink: HTMLAnchorElement = document.createElement('a');
        downloadLink.setAttribute('href', dataURL);
        downloadLink.setAttribute('download', name);
        downloadLink.click();
        // Remove all keys and mouse buttons down because we lose focus
        this.keys.splice(0);
        this.mouseButtons.splice(0);
    }
    /**
     * Draw an object onto the canvas.
     * @param drawable Any drawable object
     * @param layer The zero-indexed layer to draw to
     */
    public draw(drawable: Drawable, layer = 0): void {
        drawable.draw(this.graphics[layer]);
    }
    /**
     * Completely clears the canvas.
     * @param layer The zero-indexed layer to clear, if unset, will clear all layers
     */
    public clear(layer = -1): void {
        if (layer < 0) {
            for (const graphic of this.graphics) {
                graphic.clearRect(0, 0, this.config.width, this.config.height);
            }
        } else {
            this.graphics[layer].clearRect(0, 0, this.config.width, this.config.height);
        }
    }
    /**
     * Log a message to the debug console.
     */
    private log(...x: unknown[]): void {
        if (this.config.debug) {
            console.log(...x);
        }
    }
    /**
     * Set defaults for all undefined options.
     */
    private static setDefaults<T extends object>(options: Partial<T>, defaults: T): T {
        const copy: Partial<T> = {};
        for (const key of Object.keys(defaults)) {
            copy[key as keyof T] = options[key as keyof T] ?? defaults[key as keyof T];
        }
        return copy as T;
    }
}

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
     * The number of layers in this canvas
     */
    readonly numLayers: number;
    /**
     * Uses hardware (GPU) or software (CPU) acceleration
     * - For pixel manipulation, software acceleration is recommended
     * - Otherwise, hardware acceleration is recommended (default)
     */
    readonly acceleration: 'hardware' | 'software';
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
    readonly loop: (dt: number) => Drawable[] | (void | never);
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