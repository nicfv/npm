import { DataOptions, Options } from './types';

/**
 * Default configuration options for Pumpchart
 */
export const defaultOptions: Options = {
    size: {
        x: 600,
        y: 400,
    },
    padding: {
        x: 40,
        y: 20,
    },
    highlightColor: '#ffff00',
    textColor: '#222222',
    axisColor: '#dddddd',
    axisWidth: 1,
    density: 1,
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
    flipGradient: false,
    colorizeBy: 'time',
    timestamp: {
        start: Date.now(),
        stop: Date.now() + 60 * 60 * 1000,
    },
    units: {
        density: 'g/cm3',
        flow: 'gpm',
        head: 'ft',
        power: 'hp',
        speed: 'rpm',
    },
};

/**
 * Default data display options for Pumpchart
 */
export const defaultDataOptions: DataOptions = {
    name: '',
    color: '#ff0000',
    radius: 2.5,
    timestamp: NaN,
};