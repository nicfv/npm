import { PsychartOptions, DataOptions } from './types';

/**
 * Produce a deep copy of an object.
 * @param obj Any object.
 * @returns A deep copy of `obj`.
 */
export function deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Take an object with all optional values, and set all unset values to their defaults.
 * @param optional An object with all parameters optional.
 * @param defaults An object with all parameters default.
 * @returns An object with all parameters that are unset as their default values.
 */
export function setDefaults<T extends { [key: string]: any }>(optional: Partial<T>, defaults: T): T {
    const required: T = deepCopy(defaults);
    for (const key in required) {
        required[key] = optional[key] ?? defaults[key];
    }
    return required;
}

/**
 * Represents a set of default options for Psychart.
 */
export const defaultPsychartOptions: PsychartOptions = {
    altitude: 0,
    colors: {
        axis: '#E0E0E0', // #303030
        font: '#202020', // #D0D0D0
        regionGradient: 'Purplish',
    },
    dbMax: 120,
    dbMin: 20,
    dpMax: 90,
    flipGradients: false,
    flipXY: false,
    font: {
        family: 'sans-serif',
        size: 12,
    },
    lineHeight: 1.25,
    major: {
        humRat: 10,
        relHum: 10,
        temp: 10,
    },
    padding: { x: 40, y: 20 },
    regions: [],
    resolution: 0.5,
    showUnits: {
        axis: true,
        tooltip: true,
    },
    size: { x: 800, y: 600 },
    unitSystem: 'IP',
    yAxis: 'dp',
};

/**
 * Represents a set of default data options.
 */
export const defaultDataOptions: DataOptions = {
    advanced: false,
    color: '#FF0000',
    enabled: true,
    gradient: 'Viridis',
    line: true,
    pointName: '',
    pointRadius: 5,
    relHumType: 'percent',
    seriesName: '',
    time: {
        start: NaN,
        now: NaN,
        end: NaN,
    },
};