import { Dimension, DimensionExponents } from './dimension';
import { Prefix } from './prefix';
import { UnitExponents, Units } from './unit';

/**
 * Contains information on how units should be converted.
 */
export class Conversion {
    /**
     * Create a new unit conversion.
     * @param latex 
     * @param scale The scale of this unit in relation to the base units that make up this dimension.
     * @param dimension The base physical dimensions of this unit.
     */
    constructor(public readonly latex: string, public readonly scale: number = 1, public readonly dimension: Dimension = new Dimension({})) { }
    /**
     * Create a simple unit conversion that defines this unit as the base for its dimension.
     * @param latex The LaTeX representation of this unit.
     * @param exponents The exponents on the base physical dimensions.
     * @returns A simple conversion formula.
     */
    public static simple(latex: string, exponents: DimensionExponents): Conversion {
        return new Conversion(latex, 1, new Dimension(exponents));
    }
    /**
     * Create a new scaled unit using a metric prefix.
     * @param prefix The metric prefix of this scaled unit.
     * @param base The unscaled base unit of this dimension.
     * @returns A scaling conversion formula.
     */
    public static scaled(prefix: Prefix.Name, base: Units): Conversion {
        return new Conversion(Prefix.Table[prefix].latex + ' ' + ConversionTable[base].latex, Prefix.Table[prefix].scale * ConversionTable[base].scale, ConversionTable[base].dimension);
    }
    /**
     * Create a new unit that is relative to another.
     * @param latex The LaTeX representation of this unit.
     * @param scale The scale of this unit in relation to the relative unit.
     * @param to The relative unit.
     * @returns A relative scale formula between this unit and a relative one.
     */
    public static relative(latex: string, scale: number, to: Units): Conversion {
        return new Conversion(latex, scale * ConversionTable[to].scale, ConversionTable[to].dimension);
    }
    /**
     * @param latex The LaTeX representation of this unit.
     * @param makeup The equivalent makeup of base units for a unit combined from other units. For example, `kg*m/s^2` for Newtons.
     */
    public static complex(latex: string, makeup: UnitExponents): Conversion {
        let scale: number = 1,
            dim: Dimension = new Dimension({});
        for (const unit in makeup) {
            const exponent: number = makeup[unit as Units] ?? 0;
            scale *= (ConversionTable[unit as Units].scale ** exponent);
            dim = dim.mult(ConversionTable[unit as Units].dimension, exponent);
        }
        return new Conversion(latex, scale, dim);
    }
}
/**
 * Defines the type for the conversion table.
 */
type Conversions = { [index in Units]: Conversion };
/**
 * Represents the full conversion table for **absolute** units only.
 */
export const ConversionTable: Conversions = {
    nanosecond: new Scaled('nano', 'second'),
    millisecond: new Complex('\\text{ms}', 1e-3, { second: 1 }),
    second: new Simple('\\text{s}', { time: 1 }),
    minute: new Complex('\\text{min}', 60, { second: 1 }),
    hour: new Complex('\\text{h}', 60, { minute: 1 }),
    day: new Complex('\\text{d}', 24, { hour: 1 }),
    week: new Complex('\\text{w}', 7, { day: 1 }),
    month: new Complex('\\text{M}', 1 / 12, { year: 1 }),
    year: new Complex('\\text{y}', 365.25, { day: 1 }),
    nanometer: new Complex('\\text{nm}', 1e-9, { meter: 1 }),
    micrometer: new Complex('\\mu\\text{m}', 1e-6, { meter: 1 }),
    micron: new Scaled('micro', 'meter'),
    millimeter: new Scaled('milli', 'meter'),
    centimeter: new Scaled('centi', 'meter'),
    meter: new Simple('\\text{m}', { length: 1 }),
    kilometer: new Scaled('kilo', 'meter'),
    inch: new Complex('\\text{in}', 1 / 12, { foot: 1 }),
    foot: new Complex('\\text{ft}', 0.3048, { meter: 1 }),
    yard: new Complex('\\text{yd}', 3, { foot: 1 }),
    mile: new Complex('\\text{mi}', 5280, { foot: 1 }),
    milligram: new Scaled('milli', 'gram'),
    gram: new Simple('\\text{g}', { mass: 1 }), // `kg` is the base unit... but `g` makes things easier.
    kilogram: new Scaled('kilo', 'gram'),
    tonne: new Scaled('mega', 'gram'),
    ounce: new Complex('\\text{oz}', 1 / 16, { pound_mass: 1 }),
    pound_mass: new Complex('\\text{lb}_{m}', 1 / 2.204623, { kilogram: 1 }),
    slug: new Complex('\\text{slug}', 32.174049, { pound_mass: 1 }),
    stone: new Complex('\\text{st.}', 14, { pound_mass: 1 }),
    shortton: new Complex('\\text{tn}', 2000, { pound_mass: 1 }),
    Newton: new Complex('\\text{N}', 1, { kilogram: 1, meter: 1, second: -2 }),
    kiloNewton: new Scaled('kilo', 'Newton'),
    pound_force: new Complex('\\text{lb}_{f}', 1, { slug: 1, foot: 1, second: -2 }),
};