import { PumpchartDataOptions, PumpchartOptions } from './types';

/**
 * Default configuration options for Pumpchart
 */
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
    performanceCurveColor: '#ffaa55',
    systemCuveColor: '#55ffaa',
    units: {
        flow: 'gpm',
        head: 'ft',
        power: 'kW',
        speed: 'rpm',
    },
};

/**
 * Default data display options for Pumpchart
 */
export const defaultPumpchartDataOptions: PumpchartDataOptions = {
    name: '',
    radius: 5,
    gradient: {
        name: 'Viridis',
        score: 0.5,
    },
    timestamp: 0,
};