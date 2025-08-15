import { PumpchartOptions } from './types';

export const defaultPumpchartOptions: PumpchartOptions = {
    size: {
        x: 600,
        y: 400,
    },
    padding: {
        x: 20,
        y: 20,
    },
    flow: {
        unit: 'gpm',
        step: 10,
        max: 100,
    },
    head: {
        unit: 'ft',
        step: 10,
        max: 100,
    },
    axisColor: '#666666',
    axisWidth: 1,
};