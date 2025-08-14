import { Chart } from '../chart';
import { defaultPumpchartOptions } from './defaults';
import { PumpchartOptions } from './types';

export class Pumpchart extends Chart<PumpchartOptions> {
    constructor(options: Partial<PumpchartOptions>) {
        super(options, defaultPumpchartOptions);
    }
}