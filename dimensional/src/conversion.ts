import { Dim, Dimension } from './dimension';
import { Units } from './unit';

/**
 * Contains information on how units should be converted.
 */
export interface Conversion {
    /**
     * The LaTeX representation of this unit.
     */
    readonly latex: string;
    /**
     * The base physical dimensions of this unit.
     */
    readonly dim: Dimension;
    /**
     * The scale of this unit in relation to the base unit of this dimension.
     */
    readonly scale: number;
}
/**
 * Represents the full conversion table for **absolute** units only.
 */
export const ConversionTable: { [index in Units]: Conversion } = {
    'centimeters': {
        latex: 'cm',
        dim: Dim({ length: 1 }),
        scale: 1e-2,
    },
    'days': {
        latex: 'd',
        dim: Dim({ time: 1 }),
        scale: 60 * 60 * 24,
    },
    'feet': {
        latex: 'ft',
        dim: Dim({ length: 1 }),
        scale: 0.3048,
    },
    'hours': {
        latex: 'h',
        dim: Dim({ time: 1 }),
        scale: 60 * 60,
    },
    'inches': {
        latex: 'in',
        dim: Dim({ length: 1 }),
        scale: 0.3048 / 12,
    },
    'kilometers': {
        latex: 'km',
        dim: Dim({ length: 1 }),
        scale: 1e3,
    },
    'meters': {
        latex: 'm',
        dim: Dim({ length: 1 }),
        scale: 1,
    },
    'micrometers': {
        latex: '\\mu m',
        dim: Dim({ length: 1 }),
        scale: 1e-6,
    },
    'microns': {
        latex: '\\mu m',
        dim: Dim({ length: 1 }),
        scale: 1e-6,
    },
    'miles': {
        latex: 'mi',
        dim: Dim({ length: 1 }),
        scale: 0.3048 * 5280,
    },
    'millimeters': {
        latex: 'mm',
        dim: Dim({ length: 1 }),
        scale: 1e-3,
    },
    'milliseconds': {
        latex: 'ms',
        dim: Dim({ time: 1 }),
        scale: 1e-3,
    },
    'minutes': {
        latex: 'm',
        dim: Dim({ time: 1 }),
        scale: 60,
    },
    'months': {
        latex: 'M',
        dim: Dim({ time: 1 }),
        scale: 60 * 60 * 24 * 365.25 / 12,
    },
    'nanometers': {
        latex: 'nm',
        dim: Dim({ length: 1 }),
        scale: 1e-9,
    },
    'nanoseconds': {
        latex: 'ns',
        dim: Dim({ time: 1 }),
        scale: 1e-9,
    },
    'seconds': {
        latex: 's',
        dim: Dim({ time: 1 }),
        scale: 1,
    },
    'weeks': {
        latex: 'w',
        dim: Dim({ time: 1 }),
        scale: 60 * 60 * 24 * 7,
    },
    'yards': {
        latex: 'yd',
        dim: Dim({ length: 1 }),
        scale: 0.3048,
    },
    'years': {
        latex: 'y',
        dim: Dim({ time: 1 }),
        scale: 60 * 60 * 24 * 365.25,
    },
};