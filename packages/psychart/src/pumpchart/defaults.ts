import { PumpchartOptions } from './types';

export const defaultPumpchartOptions: PumpchartOptions = {
    size: {
        x: 600,
        y: 400,
    },
    padding: {
        x: 40,
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
    font: {
        name: 'sans-serif',
        size: 12,
    },
    pumpMaxFlow: 90,
    pumpMaxHead: 80,
    systemMinHead: 10,
    systemOpFlow: 60,
    performanceSteps: 4,
};