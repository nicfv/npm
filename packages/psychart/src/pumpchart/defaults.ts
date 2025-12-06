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
    curve: {
        pump: '50-50*(q/200)^2',
        system: '10+40*(q/200)^2',
    },
    speed: {
        max: 100,
        operation: 100,
        steps: [25, 50, 75],
    },
    pumpCurveColor: '#ffaa55',
    systemCuveColor: '#55ffaa',
    gradient: 'Viridis',
    timestamp: {
        start: Date.now(),
        stop: Date.now() + 60 * 60 * 1000,
    },
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
    timestamp: 0,
};