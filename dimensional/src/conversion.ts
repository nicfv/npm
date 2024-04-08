import { Dimension } from './dimension';
import { Units } from './unit';

/**
 * Represents the full conversion table for **absolute** units only.
 */
export const ConversionTable: { [index in Units]: { scale: number, latex: string, dim: Dimension } } = {
    'days': {
        latex: 'd',
        dim: new Dimension({ time: 1 }),
        scale: 60 * 60 * 24,
    },
    'hours': {
        latex: 'h',
        dim: new Dimension({ time: 1 }),
        scale: 60 * 60,
    },
    'milliseconds': {
        latex: 'ms',
        dim: new Dimension({ time: 1 }),
        scale: 1e-3,
    },
    'minutes': {
        latex: 'm',
        dim: new Dimension({ time: 1 }),
        scale: 60,
    },
    'months': {
        latex: 'M',
        dim: new Dimension({ time: 1 }),
        scale: 60 * 60 * 24 * 365.25 / 12,
    },
    'nanoseconds': {
        latex: 'ns',
        dim: new Dimension({ time: 1 }),
        scale: 1e-9,
    },
    'none': {
        latex: '-',
        dim: new Dimension({}),
        scale: 1,
    },
    'seconds': {
        latex: 's',
        dim: new Dimension({ time: 1 }),
        scale: 1,
    },
    'weeks': {
        latex: 'w',
        dim: new Dimension({ time: 1 }),
        scale: 60 * 60 * 24 * 7,
    },
    'years': {
        latex: 'y',
        dim: new Dimension({ time: 1 }),
        scale: 60 * 60 * 24 * 365.25,
    },
};