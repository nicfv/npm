import { Drawable, Options } from '.';

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
        background: 'white',
        border: 'transparent',
        borderBlur: 'transparent',
        showMouse: true,
        numLayers: 1,
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
     * Used to render 2D objects onto the main canvas
     */
    private readonly graphic: CanvasRenderingContext2D;
    /**
     * Can be used to render 2D graphics onto layers of the canvas
     */
    private readonly layers: CanvasRenderingContext2D[] = [];
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
     * The media recording object for screen captures
     */
    private readonly recorder: MediaRecorder;
    /**
     * Create a new canvas with the provided options
     * @param options Configuration options
     */
    constructor(options: Partial<Options> = {}) {
        this.config = Canvas.setDefaults(options, Canvas.defaults);
        this.width = this.config.width;
        this.height = this.config.height;
        // Create the main <canvas> element and set properties
        const main: HTMLCanvasElement = document.createElement('canvas');
        main.tabIndex = 1; // For element focus
        main.style.outline = 'none';
        main.style.imageRendering = 'pixelated';
        main.width = this.config.width;
        main.height = this.config.height;
        main.style.width = `${this.config.width * this.config.scale}px`;
        main.style.height = `${this.config.height * this.config.scale}px`;
        main.style.border = `${this.config.scale}px solid ${this.config.border}`;
        main.style.cursor = this.config.showMouse ? 'default' : 'none';
        this.config.parent.appendChild(main);
        // Create main canvas graphics object
        const graphics = main.getContext('2d');
        if (graphics) {
            this.graphic = graphics;
        } else {
            throw new Error('Could not initialize canvas graphics.');
        }
        graphics.imageSmoothingEnabled = false;
        // Create canvas layers
        for (let i = 0; i < this.config.numLayers; i++) {
            const canvas: HTMLCanvasElement = document.createElement('canvas');
            const layer = canvas.getContext('2d');
            if (layer) {
                this.layers.push(layer);
            } else {
                throw new Error('Could not initialize canvas graphics.');
            }
            // Set properties for canvas
            canvas.style.imageRendering = 'pixelated';
            canvas.width = this.config.width;
            canvas.height = this.config.height;
            layer.imageSmoothingEnabled = false;
        }
        // Event listeners
        main.addEventListener('mousemove', e => {
            if (!this.focused) { return; }
            this.mouseX = (e.offsetX / this.config.scale) | 0;
            this.mouseY = (e.offsetY / this.config.scale) | 0;
            this.log(e.type, this.mouseX, this.mouseY);
            this.config.mousemove(this.mouseX, this.mouseY);
        });
        main.addEventListener('keydown', e => {
            if (!this.focused) { return; }
            e.preventDefault();
            const key: string = e.key.toLowerCase();
            this.log(e.type, this.keys);
            if (!this.keys.includes(key)) {
                this.keys.push(key);
                this.config.keydown(key);
            }
        });
        main.addEventListener('keyup', e => {
            if (!this.focused) { return; }
            const key: string = e.key.toLowerCase();
            const index: number = this.keys.indexOf(key);
            this.log(e.type, this.keys);
            if (index >= 0) {
                this.keys.splice(index, 1);
                this.config.keyup(key);
            }
        });
        main.addEventListener('mousedown', e => {
            if (!this.focused) { return; }
            const button: number = e.button;
            this.log(e.type, this.mouseButtons);
            if (!this.mouseButtons.includes(button)) {
                this.mouseButtons.push(button);
                this.config.mousedown(button);
            }
        });
        main.addEventListener('mouseup', e => {
            if (!this.focused) { return; }
            const button: number = e.button;
            const index: number = this.mouseButtons.indexOf(button);
            this.log(e.type, this.mouseButtons);
            if (index >= 0) {
                this.mouseButtons.splice(index, 1);
                this.config.mouseup(button);
            }
        });
        main.addEventListener('focusin', e => {
            this.focused = true;
            main.style.borderColor = this.config.border;
            this.log(e.type, this.focused);
            this.animation = requestAnimationFrame(time => this.startAnimate(time));
        });
        main.addEventListener('focusout', e => {
            this.focused = false;
            main.style.borderColor = this.config.borderBlur;
            this.log(e.type, this.focused);
            cancelAnimationFrame(this.animation);
        });
        window.addEventListener('blur', e => {
            this.log(e.type);
            cancelAnimationFrame(this.animation);
        });
        main.addEventListener('contextmenu', e => e.preventDefault());
        // Focus on the canvas
        main.focus();
        // Initialize the media recorder
        const recordPart: BlobPart[] = [];
        this.recorder = new MediaRecorder(main.captureStream());
        this.recorder.addEventListener('dataavailable', e => {
            this.log(e.type);
            recordPart.push(e.data);
        });
        this.recorder.addEventListener('stop', e => {
            this.log(e.type);
            const recording: Blob = new Blob(recordPart, { type: 'video/webm;codecs=h264' });
            const url: string = URL.createObjectURL(recording);
            const downloadLink: HTMLAnchorElement = document.createElement('a');
            downloadLink.setAttribute('href', url);
            downloadLink.setAttribute('download', `recording-${Date.now()}`);
            downloadLink.click();
            // Clear out the existing blob parts for recording a new capture
            recordPart.splice(0);
            // Remove all keys and mouse buttons down because we lose focus
            this.keys.splice(0);
            this.mouseButtons.splice(0);
        });
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
        this.config.loop(dt);
        // Draw all the layers onto the main canvas
        this.graphic.fillStyle = this.config.background;
        this.graphic.fillRect(0, 0, this.width, this.height);
        for (const layer of this.layers) {
            this.graphic.drawImage(layer.canvas, 0, 0);
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
        // Generate a data URL and set it as the download parameter for <a>
        const dataURL: string = this.graphic.canvas.toDataURL();
        const downloadLink: HTMLAnchorElement = document.createElement('a');
        downloadLink.setAttribute('href', dataURL);
        downloadLink.setAttribute('download', name);
        downloadLink.click();
        // Remove all keys and mouse buttons down because we lose focus
        this.keys.splice(0);
        this.mouseButtons.splice(0);
    }
    /**
     * Start recording all layers on the canvas
     */
    public startRecording(): void {
        this.recorder.start();
    }
    /**
     * Stop recording and download screen capture
     */
    public stopRecording(): void {
        this.recorder.stop();
    }
    /**
     * Determines whether the media recorder is active
     * @returns `true` if currently recording
     */
    public isRecording(): boolean {
        return this.recorder.state === 'recording';
    }
    /**
     * Draw an object onto the canvas.
     * @param drawable Any drawable object
     * @param layer The zero-indexed layer to draw to
     */
    public draw(drawable: Drawable, layer = 0): void {
        drawable.draw(this.layers[layer]);
    }
    /**
     * Completely clears the canvas.
     * @param layer The zero-indexed layer to clear, if unset, will clear all layers
     */
    public clear(layer = -1): void {
        if (layer < 0) {
            for (const layer of this.layers) {
                layer.clearRect(0, 0, this.config.width, this.config.height);
            }
        } else {
            this.layers[layer].clearRect(0, 0, this.config.width, this.config.height);
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
