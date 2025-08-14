/**
 * Represents a generic SVG chart to be inherited by another class.
 */
export abstract class Chart<T> {
    /**
     * SVG Namespace URI
     */
    protected readonly NS = 'http://www.w3.org/2000/svg';
    /**
     * Options for this chart
     */
    protected readonly options: T;
    /**
     * Base `<div>` element
     */
    protected readonly base: HTMLDivElement;
    /**
     * The `<svg>` element used for rendering
     */
    protected readonly svg: SVGSVGElement;
    /**
     * Create a new instance of this chart.
     * @param options Supply some options to customize this chart.
     * @param defaults Supply all default options for this chart.
     */
    constructor(options: Partial<T>, defaults: T) {
        this.options = Chart.setDefaults(options, defaults);
        this.base = document.createElement('div');
        this.svg = document.createElementNS(this.NS, 'svg');
    }
    /**
     * Produce a deep copy of an object.
     * @param obj Any object
     * @returns A deep copy of an object.
     */
    protected static deepCopy<Z>(obj: Z): Z {
        return JSON.parse(JSON.stringify(obj));
    }
    /**
     * Take an object with all optional values, and set all unset values to their defaults.
     * @param options An object with all parameters optional.
     * @param defaults An object with all parameters default.
     * @returns An object with all parameters that are unset as their default values.
     */
    protected static setDefaults<Z>(options: Partial<Z>, defaults: Z): Z {
        const required: Z = Chart.deepCopy(defaults);
        for (const key in defaults) {
            required[key] = options[key] ?? defaults[key];
        }
        return required;
    }
    /**
     * Return the base `<div>` element for this chart.
     * @returns The base element.
     */
    public getElement(): HTMLDivElement {
        return this.base;
    }
}