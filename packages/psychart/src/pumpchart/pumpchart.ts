import { Chart } from '../chart';
import { defaultPumpchartOptions } from './defaults';
import { PumpchartOptions } from './types';

export class Pumpchart extends Chart<PumpchartOptions> {
    private readonly g = {
        axes: document.createElementNS(this.NS, 'g'),
    };
    constructor(options: Partial<PumpchartOptions> = {}) {
        super(options, defaultPumpchartOptions);
        Object.values(this.g).forEach(group => this.svg.appendChild(group));
    }
}