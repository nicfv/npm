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
    private readonly graphics: CanvasRenderingContext2D;
    /**
     * Contains a list of current keys pressed
     */
    private readonly keys: string[] = [];
    /**
     * Contains a list of current mouse buttons pressed
     */
    private readonly mouseButtons: number[] = [];
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
        canvas.tabIndex = 1; // For element focus
        canvas.style.outline = 'none';
        canvas.style.imageRendering = 'pixelated';
        graphics.imageSmoothingEnabled = false;
        // Set custom properties
        canvas.width = this.config.width;
        canvas.height = this.config.height;
        canvas.style.width = `${this.config.width * this.config.scale}px`;
        canvas.style.height = `${this.config.height * this.config.scale}px`;
        canvas.style.background = this.config.background.toString();
        canvas.style.border = `${this.config.scale}px solid ${this.config.border}`;
        canvas.style.cursor = this.config.showMouse ? 'default' : 'none';
        // Event listeners
        canvas.addEventListener('mousemove', e => {
            if (!this.isFocused()) { return; }
            this.mouseX = (e.offsetX / this.config.scale) | 0;
            this.mouseY = (e.offsetY / this.config.scale) | 0;
            this.log(e.type, this.mouseX, this.mouseY);
            this.config.mousemove(this.mouseX, this.mouseY);
        });
        canvas.addEventListener('keydown', e => {
            if (!this.isFocused()) { return; }
            e.preventDefault();
            const key: string = e.key.toLowerCase();
            this.log(e.type, this.keys);
            if (!this.keys.includes(key)) {
                this.keys.push(key);
                this.config.keydown(key);
            }
        });
        canvas.addEventListener('keyup', e => {
            if (!this.isFocused()) { return; }
            const key: string = e.key.toLowerCase();
            const index: number = this.keys.indexOf(key);
            this.log(e.type, this.keys);
            if (index >= 0) {
                this.keys.splice(index, 1);
                this.config.keyup(key);
            }
        });
        canvas.addEventListener('mousedown', e => {
            if (!this.isFocused()) { return; }
            const button: number = e.button;
            this.log(e.type, this.mouseButtons);
            if (!this.mouseButtons.includes(button)) {
                this.mouseButtons.push(button);
                this.config.mousedown(button);
            }
        });
        canvas.addEventListener('mouseup', e => {
            if (!this.isFocused()) { return; }
            const button: number = e.button;
            const index: number = this.mouseButtons.indexOf(button);
            this.log(e.type, this.mouseButtons);
            if (index >= 0) {
                this.mouseButtons.splice(index, 1);
                this.config.mouseup(button);
            }
        });
        canvas.addEventListener('focusin', e => {
            canvas.style.borderColor = this.config.border;
            this.log(e.type);
            this.animation = requestAnimationFrame(time => this.startAnimate(time));
        });
        canvas.addEventListener('focusout', e => {
            canvas.style.borderColor = this.config.borderBlur;
            this.log(e.type);
            cancelAnimationFrame(this.animation);
        });
        window.addEventListener('blur', e => {
            this.log(e.type);
            cancelAnimationFrame(this.animation);
        });
        canvas.addEventListener('contextmenu', e => e.preventDefault());
        // Focus on the canvas
        canvas.focus();
    }
    /**
     * Determine if the canvas is currently focused.
     */
    private isFocused(): boolean {
        return this.graphics.canvas === document.activeElement;
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
     * Draw an object onto the canvas.
     * @param drawable Any drawable object
     */
    public draw(drawable: Drawable): void {
        drawable.draw(this.graphics);
    }
    /**
     * Completely clears the canvas.
     */
    public clear(): void {
        this.graphics.clearRect(0, 0, this.config.width, this.config.height);
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
     * @returns An array of `Drawable` to render, or void
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