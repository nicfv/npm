import { Dim, DimensionExponents } from './dimension';
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
    readonly dim?: DimensionExponents;
    /**
     * The scale of this unit in relation to the base units that make up this dimension.
     */
    readonly scale?: number;
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
        scale: 1e-9,
        makeup: { second: 1 },
    },
    millisecond: {
        latex: '\\text{ms}',
        scale: 1e-3,
        makeup: { second: 1 },
    },
    second: {
        latex: '\\text{s}',
        dim: { time: 1 },
    },
    minute: {
        latex: '\\text{m}',
        scale: 60,
        makeup: { second: 1 },
    },
    hour: {
        latex: '\\text{h}',
        scale: 60,
        makeup: { minute: 1 },
    },
    day: {
        latex: '\\text{d}',
        scale: 24,
        makeup: { hour: 1 },
    },
    week: {
        latex: '\\text{w}',
        scale: 7,
        makeup: { day: 1 },
    },
    month: {
        latex: '\\text{M}',
        scale: 1 / 12,
        makeup: { year: 1 },
    },
    year: {
        latex: '\\text{y}',
        scale: 365.25,
        makeup: { day: 1 },
    },
    nanometer: {
        latex: '\\text{nm}',
        scale: 1e-9,
        makeup: { meter: 1 },
    },
    micrometer: {
        latex: '\\mu \\text{m}',
        scale: 1e-6,
        makeup: { meter: 1 },
    },
    micron: {
        latex: '\\mu \\text{m}',
        scale: 1e-6,
        makeup: { meter: 1 },
    },
    millimeter: {
        latex: '\\text{mm}',
        scale: 1e-3,
        makeup: { meter: 1 },
    },
    centimeter: {
        latex: '\\text{cm}',
        scale: 1e-2,
        makeup: { meter: 1 },
    },
    meter: {
        latex: '\\text{m}',
        dim: { length: 1 },
    },
    kilometer: {
        latex: '\\text{km}',
        scale: 1e3,
        makeup: { meter: 1 },
    },
    inch: {
        latex: '\\text{in}',
        scale: 1 / 12,
        makeup: { foot: 1 },
    },
    foot: {
        latex: '\\text{ft}',
        scale: 0.3048,
        makeup: { meter: 1 },
    },
    yard: {
        latex: '\\text{yd}',
        scale: 3,
        makeup: { foot: 1 },
    },
    mile: {
        latex: '\\text{mi}',
        scale: 5280,
        makeup: { foot: 1 },
    },
    milligram: {
        latex: '\\text{mg}',
        scale: 1e-6,
        makeup: { kilogram: 1 },
    },
    gram: {
        latex: '\\text{g}',
        scale: 1e-3,
        makeup: { kilogram: 1 },
    },
    kilogram: {
        latex: '\\text{kg}',
        dim: { mass: 1 },
    },
    tonne: {
        latex: '\\text{t}',
        scale: 1e3,
        makeup: { kilogram: 1 },
    },
    ounce: {
        latex: '\\text{oz}',
        scale: 1 / 16,
        makeup: { pound_mass: 1 },
    },
    pound_mass: {
        latex: '\\text{lb}_{m}',
        scale: 1 / 2.204623,
        makeup: { kilogram: 1 },
    },
    slug: {
        latex: '\\text{slug}',
        scale: 32.174049,
        makeup: { pound_mass: 1 },
    },
    stone: {
        latex: '\\text{st.}',
        scale: 14,
        makeup: { pound_mass: 1 },
    },
    shortton: {
        latex: '\\text{tn}',
        scale: 2e3,
        makeup: { pound_mass: 1 },
    },
    Newton: {
        latex: '\\text{N}',
        scale: 1,
        makeup: { kilogram: 1, meter: 1, second: -2 },
    },
    kiloNewton: {
        latex: '\\text{kN}',
        scale: 1e3,
        // makeup: { Newton: 1 },
    },
    pound_force: {
        latex: '\\text{lb}_{f}',
        scale: 1,
        makeup: { slug: 1, foot: 1, second: -2 },
    },
};