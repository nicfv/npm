import { Color } from 'viridis';
import { PsychartOptions, DataOptions } from './types';

/**
 * Take an object with all optional values, and set all unset values to their defaults.
 * @param optional An object with all parameters optional.
 * @param defaults An object with all parameters default.
 * @returns An object with all parameters that are unset as their default values.
 */
export function setDefaults<T extends { [key: string]: any }>(optional: Partial<T>, defaults: T): T {
    const required: T = defaults;
    for (const key in required) {
        required[key] = optional[key] ?? defaults[key];
    }
    return required;
}

export function getDefaultPsychartOptions(isDarkTheme: boolean): PsychartOptions {
    return {
        altitude: 0,
        count: 0,
        darkTheme: isDarkTheme,
        dbMax: 120,
        dbMin: 20,
        dpMax: 90,
        flipXY: false,
        fontColor: isDarkTheme ? new Color(208, 208, 208) : new Color(32, 32, 32),
        fontSize: 12,
        lineColor: isDarkTheme ? new Color(48, 48, 48) : new Color(224, 224, 224),
        major: {
            humRat: 10,
            relHum: 10,
            temp: 10,
        },
        padding: { x: 40, y: 20 },
        regions: [],
        resolution: 0.5,
        series: {},
        size: { x: 800, y: 600 },
        timeSpan: 60 * 60 * 1e3,
        unitSystem: 'IP',
        yAxis: 'dp',
    };
}

export function getDefaultDataOptions(legend = ''): DataOptions {
    return {
        advanced: false,
        dryBulb: '',
        enabled: true,
        gradient: 'Viridis',
        legend: legend,
        line: true,
        measurement: 'dbwb',
        other: '',
        pointRadius: 5,
        relHumType: 'percent',
    };
}