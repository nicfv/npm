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
    pumpCurve: '120-120*(q/175)^2',
    systemCurve: '10+70*(q/100)^2',
    speedSteps: [0.25, 0.50, 0.75],
    operationSpeed: 0.75,
    pumpCurveColor: '#ffaa55',
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
    radius: 2.5,
    gradient: {
        name: 'Viridis',
        score: 0.5,
    },
    timestamp: 0,
};