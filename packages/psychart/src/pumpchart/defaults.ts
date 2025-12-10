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
    density: 62.4,
    font: {
        name: 'sans-serif',
        size: 12,
    },
    curve: {
        pump: {
            maxFlow: 200,
            maxHead: 50,
        },
        system: {
            static: 10,
            friction: 1 / 400,
        },
    },
    speed: {
        max: 100,
        operation: 100,
        steps: [25, 50, 75],
    },
    pumpCurveColor: '#ffaa55',
    systemCurveColor: '#55ffaa',
    gradient: 'Viridis',
    timestamp: {
        start: Date.now(),
        stop: Date.now() + 60 * 60 * 1000,
    },
    units: {
        density: 'lb/ft3',
        flow: 'gpm',
        head: 'ft',
        power: 'hp',
        speed: 'rpm',
    },
};

/**
 * Default data display options for Pumpchart
 */
export const defaultPumpchartDataOptions: PumpchartDataOptions = {
    name: '',
    color: '#ff0000',
    radius: 2.5,
    timestamp: 0,
};