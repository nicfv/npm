import { Chart } from '../chart';
import { defaultPumpchartOptions } from './defaults';
import { PumpchartOptions } from './types';

export class Pumpchart extends Chart<PumpchartOptions> {
    private readonly g = {
        axes: document.createElementNS(this.NS, 'g'),
        curves: document.createElementNS(this.NS, 'g'),
        data: document.createElementNS(this.NS, 'g'),
    };
    constructor(options: Partial<PumpchartOptions> = {}) {
        super(options, defaultPumpchartOptions);
        // Set the size of the SVG element.
        this.svg.setAttribute('viewBox', '0 0 ' + this.options.size.x + ' ' + this.options.size.y);
        this.svg.setAttribute('width', this.options.size.x + 'px');
        this.svg.setAttribute('height', this.options.size.y + 'px');
        // Append all groups to the SVG.
        Object.values(this.g).forEach(group => this.svg.appendChild(group));
    }
}