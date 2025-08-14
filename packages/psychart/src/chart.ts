/**
 * Represents a generic SVG chart to be inherited by another class.
 */
export abstract class Chart<T> {
    protected readonly NS = 'http://www.w3.org/2000/svg';
    protected readonly options: T;
    private readonly base: SVGSVGElement;
    /**
     * Create a new instance of this chart.
     * @param options Supply some options to customize this chart.
     */
    constructor(options: Partial<T>) {
        this.options = this.setDefaults(options, this.getDefaults());
        this.base = document.createElementNS(this.NS, 'svg');
    }
    /**
     * Get a set of default options for this chart.
     */
    protected abstract getDefaults(): T;
    /**
     * Produce a deep copy of an object.
     * @param obj Any object
     * @returns A deep copy of an object.
     */
    protected deepCopy<Z>(obj: Z): Z {
        return JSON.parse(JSON.stringify(obj));
    }
    /**
     * Take an object with all optional values, and set all unset values to their defaults.
     * @param options An object with all parameters optional.
     * @param defaults An object with all parameters default.
     * @returns An object with all parameters that are unset as their default values.
     */
    protected setDefaults<Z>(options: Partial<Z>, defaults: Z): Z {
        const required: Z = this.deepCopy(defaults);
        for (const key in defaults) {
            required[key] = options[key] ?? defaults[key];
        }
        return required;
    }
    /**
     * Return the base `<svg>` element for this chart.
     * @returns The base element.
     */
    public getElement(): SVGSVGElement {
        return this.base;
    }
}