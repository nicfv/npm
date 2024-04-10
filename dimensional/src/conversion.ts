import { Dimension } from './dimension';
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
        dim: new Dimension({ length: 1 }),
        scale: 1e-2,
    },
    'days': {
        latex: 'd',
        dim: new Dimension({ time: 1 }),
        scale: 60 * 60 * 24,
    },
    'feet': {
        latex: 'ft',
        dim: new Dimension({ length: 1 }),
        scale: 0.3048,
    },
    'hours': {
        latex: 'h',
        dim: new Dimension({ time: 1 }),
        scale: 60 * 60,
    },
    'inches': {
        latex: 'in',
        dim: new Dimension({ length: 1 }),
        scale: 0.3048 / 12,
    },
    'kilometers': {
        latex: 'km',
        dim: new Dimension({ length: 1 }),
        scale: 1e3,
    },
    'meters': {
        latex: 'm',
        dim: new Dimension({ length: 1 }),
        scale: 1,
    },
    'micrometers': {
        latex: '\\mu m',
        dim: new Dimension({ length: 1 }),
        scale: 1e-6,
    },
    'microns': {
        latex: '\\mu m',
        dim: new Dimension({ length: 1 }),
        scale: 1e-6,
    },
    'miles': {
        latex: 'mi',
        dim: new Dimension({ length: 1 }),
        scale: 0.3048 * 5280,
    },
    'millimeters': {
        latex: 'mm',
        dim: new Dimension({ length: 1 }),
        scale: 1e-3,
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
    'nanometers': {
        latex: 'nm',
        dim: new Dimension({ length: 1 }),
        scale: 1e-9,
    },
    'nanoseconds': {
        latex: 'ns',
        dim: new Dimension({ time: 1 }),
        scale: 1e-9,
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
    'yards': {
        latex: 'yd',
        dim: new Dimension({ length: 1 }),
        scale: 0.3048,
    },
    'years': {
        latex: 'y',
        dim: new Dimension({ time: 1 }),
        scale: 60 * 60 * 24 * 365.25,
    },
};