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
    pumpCurve: '50-50*(q/200)^2',
    systemCurve: '10+40*(q/200)^2',
    speed: {
        max: 100,
        operation: 100,
        steps: [25, 50, 75],
    },
    pumpCurveColor: '#ffaa55',
    systemCuveColor: '#55ffaa',
    units: {
        flow: 'm3/h',
        head: 'm',
        power: 'kW',
        speed: '%',
    },
};

/**
 * Default data display options for Pumpchart
 */
export const defaultPumpchartDataOptions: PumpchartDataOptions = {
    name: '',
    radius: 2.5,
    gradient: {
        name: 'Viridis',
        score: 0.5,
    },
    timestamp: 0,
};