import { Color } from 'viridis';
import { ChartOptions, Point, TextAnchor } from './types';

/**
 * Represents a generic SVG chart to be inherited by another class.
 */
export abstract class Chart<T extends ChartOptions> {
    /**
     * Initialization counter for any chart
     */
    private static id_count = 0;
    /**
     * Unique numeric identifier for this chart
     */
    protected readonly id: number;
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
        // Set the unique ID for this chart
        this.id = Chart.id_count++;
        // Set the default options
        this.options = Chart.setDefaults(options, defaults);
        // Create the base elements
        this.base = document.createElement('div');
        this.svg = document.createElementNS(this.NS, 'svg');
        this.base.appendChild(this.svg);
        // Set the size of the SVG element.
        this.svg.setAttribute('viewBox', '0 0 ' + this.options.size.x + ' ' + this.options.size.y);
        this.svg.setAttribute('width', this.options.size.x + 'px');
        this.svg.setAttribute('height', this.options.size.y + 'px');
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
     * Remove all the children from a parent element.
     * @param parent Any element to clear the children of
     */
    protected static clearChildren(parent: Node): void {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    }
    /**
     * Generate a text element to append onto a parent element.
     * @param content The contents of the text element
     * @param location The location of the text element, in pixels
     * @param color The fill color of the text
     * @param anchor How the text is anchored relative to its location
     * @param rotation The text rotation in degrees from horizontal
     * @returns A `<text>` element
     */
    protected createLabel(content: string, location: Point, color: Color, anchor: TextAnchor, rotation: number): SVGTextElement {
        const text: SVGTextElement = document.createElementNS(this.NS, 'text');
        const padding: number = this.options.font.size / 2;
        const angleRad: number = rotation * Math.PI / 180;
        text.textContent = content;
        text.setAttribute('fill', color.toString());
        text.setAttribute('font-family', this.options.font.name);
        text.setAttribute('font-size', this.options.font.size + 'px');
        text.style.rotate = `${rotation}deg`;
        /**
         * Shorthand to set all alignment properties for the text element
         */
        function setProps(xPad: 1 | 0 | -1, yPad: 1 | 0 | -1, textAnchor: 'start' | 'middle' | 'end', dominantBaseline: 'hanging' | 'middle' | 'alphabetic'): void {
            // Use the `x`, `y`, `text-anchor`, and `dominant-baseline` properties to set the text anchor
            const padded: Point = { x: location.x + xPad * padding, y: location.y + yPad * padding };
            const rot: Point = { x: Math.cos(angleRad), y: Math.sin(angleRad) };
            text.setAttribute('x', `${rot.x * padded.x + rot.y * padded.y}px`);
            text.setAttribute('y', `${rot.x * padded.y - rot.y * padded.x}px`);
            text.setAttribute('text-anchor', textAnchor);
            text.setAttribute('dominant-baseline', dominantBaseline);
        }
        switch (anchor) {
            case (TextAnchor.C): {
                setProps(0, 0, 'middle', 'middle');
                break;
            }
            case (TextAnchor.NW): {
                setProps(1, 1, 'start', 'hanging');
                break;
            }
            case (TextAnchor.N): {
                setProps(0, 1, 'middle', 'hanging');
                break;
            }
            case (TextAnchor.NE): {
                setProps(-1, 1, 'end', 'hanging');
                break;
            }
            case (TextAnchor.E): {
                setProps(-1, 0, 'end', 'middle');
                break;
            }
            case (TextAnchor.SE): {
                setProps(-1, -1, 'end', 'alphabetic');
                break;
            }
            case (TextAnchor.S): {
                setProps(0, -1, 'middle', 'alphabetic');
                break;
            }
            case (TextAnchor.SW): {
                setProps(1, -1, 'start', 'alphabetic');
                break;
            }
            case (TextAnchor.W): {
                setProps(1, 0, 'start', 'middle');
                break;
            }
            default: {
                throw new Error(`Text anchor ${anchor} is invalid!`);
            }
        }
        return text;
    }
    /**
     * Draw a tooltip onto the chart.
     * @param content The text content of the tooltip
     * @param location The position of the tooltip
     * @param color The background color
     * @param parent The element to append onto
     */
    protected drawTooltip(content: string, location: Point, color: Color, parent: SVGElement): void {
        const base: SVGGElement = document.createElementNS(this.NS, 'g');
        const back: SVGRectElement = document.createElementNS(this.NS, 'rect');
        const lines: SVGTextElement[] = content.split('\n').map((line: string, i: number) => this.createLabel(line, { x: 0, y: i * this.options.font.size }, color.getContrastingColor(), TextAnchor.NW, 0));
        // Append elements to the base & parent (required to compute line width)
        base.appendChild(back);
        base.append(...lines);
        parent.append(base);
        // Split the text by line and compute the size of the tooltip based on maximum line width
        const padding: number = this.options.font.size * 0.4;
        const width: number = Math.max(...lines.map(line => line.getBBox().width)) + padding * 2;
        const height: number = lines.length * this.options.font.size + padding * 2;
        // Compute the colors used in this tooltip
        const background: string = color.toString();
        const foreground: string = color.getContrastingColor().toString();
        // Create and define styling properties for the tooltip background
        back.setAttribute('stroke', foreground);
        back.setAttribute('fill', background);
        back.setAttribute('x', '0');
        back.setAttribute('y', '0');
        back.setAttribute('width', width + 'px');
        back.setAttribute('height', height + 'px');
        back.setAttribute('rx', padding + 'px');
        back.setAttribute('stroke-width', '1px');
        // Adjust the position if the background is out-of-bounds
        let dx = 0,
            dy = 0;
        if (location.x + width + padding > this.options.size.x) {
            dx = -(width + padding);
        } else {
            dx = padding;
        }
        if (location.y + height + padding > this.options.size.y) {
            dy = -(height + padding);
        } else {
            dy = padding;
        }
        base.setAttribute('transform', 'translate(' + (location.x + dx) + ',' + (location.y + dy) + ')');
    }
    /**
     * Return the base `<div>` element for this chart to append on the parent.
     * @returns The base element.
     */
    public getElement(): HTMLDivElement {
        return this.base;
    }
}