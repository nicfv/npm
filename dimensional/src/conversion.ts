import { Dim, Dimension } from './dimension';
import { UnitExponents, Units } from './unit';

/**
 * Contains information on how units should be converted.
 */
export interface Conversion {
    /**
     * The LaTeX representation of this unit.
     */
    readonly latex: string;
    /**
     * The base physical dimensions of this unit. Required for simple units.
     */
    readonly dim?: Dimension;
    /**
     * The scale of this unit in relation to the base unit of this dimension.
     */
    readonly scale: number;
    /**
     * For complex units, (e.g. Newton) this contains the equivalent makeup of base units (e.g. kg*m/s^2)
     * Physical base dimensions will be overridden using the makeup of base units.
     */
    readonly makeup?: UnitExponents;
}
/**
 * Represents the full conversion table for **absolute** units only.
 */
export const ConversionTable: { [index in Units]: Conversion } = {
    nanosecond: {
        latex: '\\text{ns}',
        dim: Dim({ time: 1 }),
        scale: 1e-9,
    },
    millisecond: {
        latex: '\\text{ms}',
        dim: Dim({ time: 1 }),
        scale: 1e-3,
    },
    second: {
        latex: '\\text{s}',
        dim: Dim({ time: 1 }),
        scale: 1,
    },
    minute: {
        latex: '\\text{m}',
        dim: Dim({ time: 1 }),
        scale: 60,
    },
    hour: {
        latex: '\\text{h}',
        dim: Dim({ time: 1 }),
        scale: 60 * 60,
    },
    day: {
        latex: '\\text{d}',
        dim: Dim({ time: 1 }),
        scale: 60 * 60 * 24,
    },
    week: {
        latex: '\\text{w}',
        dim: Dim({ time: 1 }),
        scale: 60 * 60 * 24 * 7,
    },
    month: {
        latex: '\\text{M}',
        dim: Dim({ time: 1 }),
        scale: 60 * 60 * 24 * 365.25 / 12,
    },
    year: {
        latex: '\\text{y}',
        dim: Dim({ time: 1 }),
        scale: 60 * 60 * 24 * 365.25,
    },
    nanometer: {
        latex: '\\text{nm}',
        dim: Dim({ length: 1 }),
        scale: 1e-9,
    },
    micrometer: {
        latex: '\\mu \\text{m}',
        dim: Dim({ length: 1 }),
        scale: 1e-6,
    },
    micron: {
        latex: '\\mu \\text{m}',
        dim: Dim({ length: 1 }),
        scale: 1e-6,
    },
    millimeter: {
        latex: '\\text{mm}',
        dim: Dim({ length: 1 }),
        scale: 1e-3,
    },
    centimeter: {
        latex: '\\text{cm}',
        dim: Dim({ length: 1 }),
        scale: 1e-2,
    },
    meter: {
        latex: '\\text{m}',
        dim: Dim({ length: 1 }),
        scale: 1,
    },
    kilometer: {
        latex: '\\text{km}',
        dim: Dim({ length: 1 }),
        scale: 1e3,
    },
    inch: {
        latex: '\\text{in}',
        dim: Dim({ length: 1 }),
        scale: 0.3048 / 12,
    },
    foot: {
        latex: '\\text{ft}',
        dim: Dim({ length: 1 }),
        scale: 0.3048,
    },
    yard: {
        latex: '\\text{yd}',
        dim: Dim({ length: 1 }),
        scale: 0.3048,
    },
    mile: {
        latex: '\\text{mi}',
        dim: Dim({ length: 1 }),
        scale: 0.3048 * 5280,
    },
    milligram: {
        latex: '\\text{mg}',
        dim: Dim({ mass: 1 }),
        scale: 1e-6,
    },
    gram: {
        latex: '\\text{g}',
        dim: Dim({ mass: 1 }),
        scale: 1e-3,
    },
    kilogram: {
        latex: '\\text{kg}',
        dim: Dim({ mass: 1 }),
        scale: 1,
    },
    tonne: {
        latex: '\\text{t}',
        dim: Dim({ mass: 1 }),
        scale: 1e3,
    },
    ounce: {
        latex: '\\text{oz}',
        dim: Dim({ mass: 1 }),
        scale: 1 / 2.204623 / 16,
    },
    pound_mass: {
        latex: '\\text{lb}_{m}',
        dim: Dim({ mass: 1 }),
        scale: 1 / 2.204623,
    },
    slug: {
        latex: '\\text{slug}',
        dim: Dim({ mass: 1 }),
        scale: 32.174049 / 2.204623,
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
    Newton: {
        latex: '\\text{N}',
        scale: 1,
        makeup: { kilogram: 1, meter: 1, second: -2 },
    },
    kiloNewton: {
        latex: '\\text{kN}',
        scale: 1e3,
        makeup: { Newton: 1 },
    },
    pound_force: {
        latex: '\\text{lb}_{f}',
        scale: 1,
        makeup: { slug: 1, foot: 1, second: -2 },
    },
};