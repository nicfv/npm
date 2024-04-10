import { Dimension } from './dimension';
import { Units } from './unit';

export interface Conversion {
    readonly latex: string;
    readonly dim: Dimension;
    readonly scale: number;
}
/**
 * Represents the full conversion table for **absolute** units only.
 */
export const ConversionTable: { [index in Units]: Conversion } = {
    'centimeters': {
        latex: 'cm',
        dim: { length: 1 },
        scale: 1e-2,
    },
    'days': {
        latex: 'd',
        dim: { time: 1 },
        scale: 60 * 60 * 24,
    },
    'feet': {
        latex: 'ft',
        dim: { length: 1 },
        scale: 0.3048,
    },
    'hours': {
        latex: 'h',
        dim: { time: 1 },
        scale: 60 * 60,
    },
    'inches': {
        latex: 'in',
        dim: { length: 1 },
        scale: 0.3048 / 12,
    },
    'kilometers': {
        latex: 'km',
        dim: { length: 1 },
        scale: 1e3,
    },
    'meters': {
        latex: 'm',
        dim: { length: 1 },
        scale: 1,
    },
    'micrometers': {
        latex: '\\mu m',
        dim: { length: 1 },
        scale: 1e-6,
    },
    'microns': {
        latex: '\\mu m',
        dim: { length: 1 },
        scale: 1e-6,
    },
    'miles': {
        latex: 'mi',
        dim: { length: 1 },
        scale: 0.3048 * 5280,
    },
    'millimeters': {
        latex: 'mm',
        dim: { length: 1 },
        scale: 1e-3,
    },
    'milliseconds': {
        latex: 'ms',
        dim: { time: 1 },
        scale: 1e-3,
    },
    'minutes': {
        latex: 'm',
        dim: { time: 1 },
        scale: 60,
    },
    'months': {
        latex: 'M',
        dim: { time: 1 },
        scale: 60 * 60 * 24 * 365.25 / 12,
    },
    'nanometers': {
        latex: 'nm',
        dim: { length: 1 },
        scale: 1e-9,
    },
    'nanoseconds': {
        latex: 'ns',
        dim: { time: 1 },
        scale: 1e-9,
    },
    'seconds': {
        latex: 's',
        dim: { time: 1 },
        scale: 1,
    },
    'weeks': {
        latex: 'w',
        dim: { time: 1 },
        scale: 60 * 60 * 24 * 7,
    },
    'yards': {
        latex: 'yd',
        dim: { length: 1 },
        scale: 0.3048,
    },
    'years': {
        latex: 'y',
        dim: { time: 1 },
        scale: 60 * 60 * 24 * 365.25,
    },
};