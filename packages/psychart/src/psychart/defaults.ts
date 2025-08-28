import { PsychartOptions, DataOptions, RegionName, Datum } from './types';

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
    legend: {
        title: 'Legend',
        margin: { x: 40, y: 20 },
        size: { x: 300, y: 200 },
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
    gradient: 'Viridis',
    legend: true,
    line: true,
    name: '',
    pointRadius: 5,
    relHumType: 'percent',
    time: {
        start: NaN,
        now: NaN,
        end: NaN,
    },
};

/**
 * Predefined regions source: 2021 Equipment Thermal Guidelines for Data Processing Environments
 * ASHRAE-55 source: https://comfort.cbe.berkeley.edu/
 */
export const regions: Record<RegionName, { tooltip: string, data: Datum[] }> = {
    'Summer (sitting)': {
        tooltip: 'ASHRAE-55 (Human comfort)\nAir speed = 0.1 m/s\nMET = 1.0 (seated)\nCLO = 0.5 (summer clothing)',
        data: [
            { db: 32.8, other: 0, measurement: 'dbrh' },
            { db: 27.2, other: 1, measurement: 'dbrh' },
            { db: 22.7, other: 1, measurement: 'dbrh' },
            { db: 26.9, other: 0, measurement: 'dbrh' },
        ],
    },
    'Summer (walking)': {
        tooltip: 'ASHRAE-55 (Human comfort)\nAir speed = 0.1 m/s\nMET = 1.5 (walking)\nCLO = 0.5 (summer clothing)',
        data: [
            { db: 31.2, other: 0, measurement: 'dbrh' },
            { db: 25.8, other: 1, measurement: 'dbrh' },
            { db: 20.3, other: 1, measurement: 'dbrh' },
            { db: 23.2, other: 0, measurement: 'dbrh' },
        ],
    },
    'Summer (light work)': {
        tooltip: 'ASHRAE-55 (Human comfort)\nAir speed = 0.1 m/s\nMET = 2.0 (light work)\nCLO = 0.5 (summer clothing)',
        data: [
            { db: 30.4, other: 0, measurement: 'dbrh' },
            { db: 24.8, other: 1, measurement: 'dbrh' },
            { db: 19.2, other: 1, measurement: 'dbrh' },
            { db: 22.0, other: 0, measurement: 'dbrh' },
        ],
    },
    'Winter (sitting)': {
        tooltip: 'ASHRAE-55 (Human comfort)\nAir speed = 0.1 m/s\nMET = 1.0 (seated)\nCLO = 1.0 (winter clothing)',
        data: [
            { db: 28.6, other: 0, measurement: 'dbrh' },
            { db: 22.7, other: 1, measurement: 'dbrh' },
            { db: 17.1, other: 1, measurement: 'dbrh' },
            { db: 20.5, other: 0, measurement: 'dbrh' },
        ],
    },
    'Winter (walking)': {
        tooltip: 'ASHRAE-55 (Human comfort)\nAir speed = 0.1 m/s\nMET = 1.5 (walking)\nCLO = 1.0 (winter clothing)',
        data: [
            { db: 26.8, other: 0, measurement: 'dbrh' },
            { db: 21.5, other: 1, measurement: 'dbrh' },
            { db: 14.5, other: 1, measurement: 'dbrh' },
            { db: 17.2, other: 0, measurement: 'dbrh' },
        ],
    },
    'Winter (light work)': {
        tooltip: 'ASHRAE-55 (Human comfort)\nAir speed = 0.1 m/s\nMET = 2.0 (light work)\nCLO = 1.0 (winter clothing)',
        data: [
            { db: 25.6, other: 0, measurement: 'dbrh' },
            { db: 20.4, other: 1, measurement: 'dbrh' },
            { db: 13.1, other: 1, measurement: 'dbrh' },
            { db: 15.5, other: 0, measurement: 'dbrh' },
        ],
    },
    'Givoni Comfort Zone': {
        tooltip: 'Comfort Zone of the Building Bioclimatic Chart\n(based on Milne and Givoni 1979 & ASHRAE 55-2017)',
        data: [
            { db: 19, other: 0.20, measurement: 'dbrh' },
            { db: 26, other: 0.20, measurement: 'dbrh' },
            { db: 26, other: 0.50, measurement: 'dbrh' },
            { db: 24, other: 0.80, measurement: 'dbrh' },
            { db: 19, other: 0.80, measurement: 'dbrh' },
        ],
    },
    'Data Center A4': {
        tooltip: 'The A4 ASHRAE data center\ncomfort zone. Typically\nan IT space with low\nenvironmental requirements.',
        data: [
            { db: 5, other: -12, measurement: 'dbdp' },
            { db: 22.5, other: 0.08, measurement: 'dbrh' },
            { db: 45.0, other: 0.08, measurement: 'dbrh' },
            { db: 45.0, other: 24, measurement: 'dbdp' },
            { db: 25.8, other: 0.90, measurement: 'dbrh' },
            { db: 5, other: 0.90, measurement: 'dbrh' },
        ],
    },
    'Data Center A3': {
        tooltip: 'The A3 ASHRAE data center\ncomfort zone. Typically\nan IT space with normal\nenvironmental requirements.',
        data: [
            { db: 5, other: -12, measurement: 'dbdp' },
            { db: 22.5, other: 0.08, measurement: 'dbrh' },
            { db: 40.0, other: 0.08, measurement: 'dbrh' },
            { db: 40.0, other: 24, measurement: 'dbdp' },
            { db: 26.7, other: 0.85, measurement: 'dbrh' },
            { db: 5, other: 0.85, measurement: 'dbrh' },
        ],
    },
    'Data Center A2': {
        tooltip: 'The A2 ASHRAE data center\ncomfort zone. Typically\nan IT space with strict\nenvironmental requirements.',
        data: [
            { db: 10.0, other: -12, measurement: 'dbdp' },
            { db: 22.5, other: 0.08, measurement: 'dbrh' },
            { db: 35.0, other: 0.08, measurement: 'dbrh' },
            { db: 35.0, other: 21, measurement: 'dbdp' },
            { db: 24.7, other: 0.80, measurement: 'dbrh' },
            { db: 10.0, other: 0.80, measurement: 'dbrh' },
        ],
    },
    'Data Center A1': {
        tooltip: 'The A1 ASHRAE data\ncenter comfort zone.\nTypically a data center with\nmission-critical operations.',
        data: [
            { db: 15.0, other: -12, measurement: 'dbdp' },
            { db: 22.5, other: 0.08, measurement: 'dbrh' },
            { db: 32.0, other: 0.08, measurement: 'dbrh' },
            { db: 32.0, other: 17, measurement: 'dbdp' },
            { db: 20.6, other: 0.80, measurement: 'dbrh' },
            { db: 15.0, other: 0.80, measurement: 'dbrh' },
        ],
    },
    'Data Center Recommended (low pollutants)': {
        tooltip: 'The "recommended" ASHRAE\ncomfort zone for data centers\nwith conditions with low\nconcentration of pollutants.',
        data: [
            { db: 18.0, other: -9, measurement: 'dbdp' },
            { db: 27.0, other: -9, measurement: 'dbdp' },
            { db: 27.0, other: 15, measurement: 'dbdp' },
            { db: 20.7, other: 0.70, measurement: 'dbrh' },
            { db: 18.0, other: 0.70, measurement: 'dbrh' },
        ],
    },
    'Data Center Recommended (high pollutants)': {
        tooltip: 'The "recommended" ASHRAE\ncomfort zone for data centers\nwith conditions with high\nconcentration of pollutants.',
        data: [
            { db: 18.0, other: -9, measurement: 'dbdp' },
            { db: 27.0, other: -9, measurement: 'dbdp' },
            { db: 27.0, other: 15, measurement: 'dbdp' },
            { db: 26.2, other: 0.50, measurement: 'dbrh' },
            { db: 18.0, other: 0.50, measurement: 'dbrh' },
        ],
    },
    'IBM TS4500 Ambient (cooling)': {
        tooltip: 'The required ambient conditions\nfor the IBM TS4500 tape storage\nunit with integrated cooling.',
        data: [
            { db: 15, other: 0.20, measurement: 'dbrh' },
            { db: 35, other: 0.20, measurement: 'dbrh' },
            { db: 35, other: 0.80, measurement: 'dbrh' },
            { db: 15, other: 0.80, measurement: 'dbrh' },
        ],
    },
    'IBM TS4500 Ambient (no cooling)': {
        tooltip: 'The required ambient conditions\nfor the IBM TS4500 tape storage\nunit without integrated cooling.',
        data: [
            { db: 15, other: 0.20, measurement: 'dbrh' },
            { db: 32, other: 0.20, measurement: 'dbrh' },
            { db: 32, other: 26, measurement: 'dbwb' },
            { db: 28.8, other: 0.80, measurement: 'dbrh' },
            { db: 15, other: 0.80, measurement: 'dbrh' },
        ],
    },
    'IBM TS4500 Recommended': {
        tooltip: 'The recommended ambient conditions\nfor the IBM TS4500 tape storage\nunit for optimal reliability and efficiency.',
        data: [
            { db: 16, other: 0.20, measurement: 'dbrh' },
            { db: 25, other: 0.20, measurement: 'dbrh' },
            { db: 25, other: 0.50, measurement: 'dbrh' },
            { db: 16, other: 0.50, measurement: 'dbrh' },
        ],
    },
};
