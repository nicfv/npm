import { PumpchartOptions } from './types';

export const defaultPumpchartOptions: PumpchartOptions = {
    flow: {
        unit: 'gpm',
        step: 10,
        max: 100,
    },
    head: {
        unit: 'ft',
        step: 10,
        max: 100,
    }
};