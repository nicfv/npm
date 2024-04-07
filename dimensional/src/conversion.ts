import { Dimension } from './dimension';
import { Units } from './unit';

/**
 * Represents the full conversion table for all units.
 */
export const ConversionTable: { [index in Units]: { base: { min: number, max: number }, this: { min: number, max: number }, latex: string, dim: Dimension } } = {
    'days': {
        latex: 'd',
        dim: new Dimension({ time: 1 }),
        base: { min: 0, max: 60 * 60 * 24 },
        this: { min: 0, max: 1 },
    },
    'hours': {
        latex: 'h',
        dim: new Dimension({ time: 1 }),
        base: { min: 0, max: 60 * 60 },
        this: { min: 0, max: 1 },
    },
    'milliseconds': {
        latex: 'ms',
        dim: new Dimension({ time: 1 }),
        base: { min: 0, max: 1 },
        this: { min: 0, max: 1e3 },
    },
    'minutes': {
        latex: 'm',
        dim: new Dimension({ time: 1 }),
        base: { min: 0, max: 60 },
        this: { min: 0, max: 1 },
    },
    'months': {
        latex: 'M',
        dim: new Dimension({ time: 1 }),
        base: { min: 0, max: 60 * 60 * 24 * 365.25 / 12 },
        this: { min: 0, max: 1 },
    },
    'nanoseconds': {
        latex: 'ns',
        dim: new Dimension({ time: 1 }),
        base: { min: 0, max: 1 },
        this: { min: 0, max: 1e9 },
    },
    'none': {
        latex: '-',
        dim: new Dimension({}),
        base: { min: 0, max: 1 },
        this: { min: 0, max: 1 },
    },
    'seconds': {
        latex: 's',
        dim: new Dimension({ time: 1 }),
        base: { min: 0, max: 1 },
        this: { min: 0, max: 1 },
    },
    'weeks': {
        latex: 'w',
        dim: new Dimension({ time: 1 }),
        base: { min: 0, max: 60 * 60 * 24 * 7 },
        this: { min: 0, max: 1 },
    },
    'years': {
        latex: 'y',
        dim: new Dimension({ time: 1 }),
        base: { min: 0, max: 60 * 60 * 24 * 365.25 },
        this: { min: 0, max: 1 },
    },
};