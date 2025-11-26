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
    axisColor: '#666666',
    axisWidth: 1,
    font: {
        name: 'sans-serif',
        size: 12,
    },
    pumpMaxFlow: 175,
    pumpMaxHead: 120,
    systemMinHead: 10,
    systemOpFlow: 80,
    performanceSteps: 4,
    units: {
        flow: 'gpm',
        head: 'ft',
    },
};