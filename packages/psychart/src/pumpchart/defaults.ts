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
    speed: {
        max: 60,
        operation: 45,
        steps: [15, 30, 45],
    },
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