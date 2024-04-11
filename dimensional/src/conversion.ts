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
    nanosecond: {
        latex: 'ns',
        dim: Dim({ time: 1 }),
        scale: 1e-9,
    },
    millisecond: {
        latex: 'ms',
        dim: Dim({ time: 1 }),
        scale: 1e-3,
    },
    second: {
        latex: 's',
        dim: Dim({ time: 1 }),
        scale: 1,
    },
    minute: {
        latex: 'm',
        dim: Dim({ time: 1 }),
        scale: 60,
    },
    hour: {
        latex: 'h',
        dim: Dim({ time: 1 }),
        scale: 60 * 60,
    },
    day: {
        latex: 'd',
        dim: Dim({ time: 1 }),
        scale: 60 * 60 * 24,
    },
    week: {
        latex: 'w',
        dim: Dim({ time: 1 }),
        scale: 60 * 60 * 24 * 7,
    },
    month: {
        latex: 'M',
        dim: Dim({ time: 1 }),
        scale: 60 * 60 * 24 * 365.25 / 12,
    },
    year: {
        latex: 'y',
        dim: Dim({ time: 1 }),
        scale: 60 * 60 * 24 * 365.25,
    },
    nanometer: {
        latex: 'nm',
        dim: Dim({ length: 1 }),
        scale: 1e-9,
    },
    micrometer: {
        latex: '\\mu m',
        dim: Dim({ length: 1 }),
        scale: 1e-6,
    },
    micron: {
        latex: '\\mu m',
        dim: Dim({ length: 1 }),
        scale: 1e-6,
    },
    millimeter: {
        latex: 'mm',
        dim: Dim({ length: 1 }),
        scale: 1e-3,
    },
    centimeter: {
        latex: 'cm',
        dim: Dim({ length: 1 }),
        scale: 1e-2,
    },
    meter: {
        latex: 'm',
        dim: Dim({ length: 1 }),
        scale: 1,
    },
    kilometer: {
        latex: 'km',
        dim: Dim({ length: 1 }),
        scale: 1e3,
    },
    inch: {
        latex: 'in',
        dim: Dim({ length: 1 }),
        scale: 0.3048 / 12,
    },
    foot: {
        latex: 'ft',
        dim: Dim({ length: 1 }),
        scale: 0.3048,
    },
    yard: {
        latex: 'yd',
        dim: Dim({ length: 1 }),
        scale: 0.3048,
    },
    mile: {
        latex: 'mi',
        dim: Dim({ length: 1 }),
        scale: 0.3048 * 5280,
    },
    milligram: {
        latex: 'mg',
        dim: Dim({ mass: 1 }),
        scale: 1e-6,
    },
    gram: {
        latex: 'g',
        dim: Dim({ mass: 1 }),
        scale: 1e-3,
    },
    kilogram: {
        latex: 'kg',
        dim: Dim({ mass: 1 }),
        scale: 1,
    },
    tonne: {
        latex: 't',
        dim: Dim({ mass: 1 }),
        scale: 1e3,
    },
    ounce: {
        latex: 'oz',
        dim: Dim({ mass: 1 }),
        scale: 1 / 2.204623 / 16,
    },
    poundmass: {
        latex: 'lbm',
        dim: Dim({ mass: 1 }),
        scale: 1 / 2.204623,
    },
    slug: {
        latex: '\\text{slug}',
        dim: Dim({ mass: 1 }),
        scale: 1 / 2.204623,
    },
    stone: {
        latex: '\\text{st.}',
        dim: Dim({ mass: 1 }),
        scale: 14 / 2.204623,
    },
    shortton: {
        latex: '\\text{tn}',
        dim: Dim({ mass: 1 }),
        scale: 2e3 / 2.204623,
    },
};