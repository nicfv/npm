import { Dimension, Dimensions } from './dimension';
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
    constructor(public readonly latex: string, public readonly scale: number, public readonly dimension: Dimension) { }
    /**
     * Create a simple unit conversion that defines this unit as the base for its dimension.
     * @param latex The LaTeX representation of this unit.
     * @param exponents The exponents on the base physical dimensions.
     * @returns A simple conversion formula.
     */
    public static simple(latex: string, dimension: Dimensions): Conversion {
        return new Conversion(latex, 1, new Dimension({ [dimension]: 1 }));
    }
    /**
     * Create a new scaled unit using a metric prefix.
     * @param prefix The metric prefix of this scaled unit.
     * @param base The unscaled base unit of this dimension.
     * @returns A scaling conversion formula.
     */
    public static scaled(prefix: Prefix.Name, base: Units): Conversion {
        return new Conversion(Prefix.Table[prefix].latex + ' ' + ConversionTable[base]().latex, Prefix.Table[prefix].scale * ConversionTable[base]().scale, ConversionTable[base]().dimension);
    }
    /**
     * Create a new unit that is relative to another.
     * @param latex The LaTeX representation of this unit.
     * @param scale The scale of this unit in relation to the relative unit.
     * @param ref The relative or reference unit.
     * @returns A relative scale formula between this unit and a relative one.
     */
    public static relative(latex: string, scale: number, ref: Units): Conversion {
        return new Conversion(latex, scale * ConversionTable[ref]().scale, ConversionTable[ref]().dimension);
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
            scale *= (ConversionTable[unit as Units]().scale ** exponent);
            dim = dim.mult(ConversionTable[unit as Units]().dimension, exponent);
        }
        return new Conversion(latex, scale, dim);
    }
}
/**
 * Defines the type for the conversion table.
 */
type Conversions = { [index in Units]: () => Conversion };
/**
 * Represents the full conversion table for **absolute** units only.
 */
export const ConversionTable: Conversions = {
    nanosecond: () => Conversion.scaled('nano', 'second'),
    millisecond: () => Conversion.scaled('milli', 'second'),
    second: () => Conversion.simple('\\text{s}', 'time'),
    minute: () => Conversion.relative('\\text{min}', 60, 'second'),
    hour: () => Conversion.relative('\\text{h}', 60, 'minute'),
    day: () => Conversion.relative('\\text{d}', 24, 'hour'),
    week: () => Conversion.relative('\\text{w}', 7, 'day'),
    month: () => Conversion.relative('\\text{M}', 1 / 12, 'year'),
    year: () => Conversion.relative('\\text{y}', 365.25, 'day'),
    nanometer: () => Conversion.scaled('nano', 'meter'),
    micrometer: () => Conversion.scaled('micro', 'meter'),
    micron: () => Conversion.scaled('micro', 'meter'),
    millimeter: () => Conversion.scaled('milli', 'meter'),
    centimeter: () => Conversion.scaled('centi', 'meter'),
    meter: () => Conversion.simple('\\text{m}', 'length'),
    kilometer: () => Conversion.scaled('kilo', 'meter'),
    inch: () => Conversion.relative('\\text{in}', 1 / 12, 'foot'),
    foot: () => Conversion.relative('\\text{ft}', 0.3048, 'meter'),
    yard: () => Conversion.relative('\\text{yd}', 3, 'foot'),
    mile: () => Conversion.relative('\\text{mi}', 5280, 'foot'),
    milligram: () => Conversion.scaled('milli', 'gram'),
    gram: () => Conversion.simple('\\text{g}', 'mass'), // `kg` is the base unit... but `g` makes things easier.
    kilogram: () => Conversion.scaled('kilo', 'gram'),
    tonne: () => Conversion.scaled('mega', 'gram'),
    ounce: () => Conversion.relative('\\text{oz}', 1 / 16, 'pound_mass'),
    pound_mass: () => Conversion.relative('\\text{lb}_{m}', 1 / 2.204623, 'kilogram'),
    slug: () => Conversion.relative('\\text{slug}', 32.174049, 'pound_mass'),
    stone: () => Conversion.relative('\\text{st.}', 14, 'pound_mass'),
    shortton: () => Conversion.relative('\\text{tn}', 2000, 'pound_mass'),
    Newton: () => Conversion.complex('\\text{N}', { kilogram: 1, meter: 1, second: -2 }),
    kiloNewton: () => Conversion.scaled('kilo', 'Newton'),
    pound_force: () => Conversion.complex('\\text{lb}_{f}', { slug: 1, foot: 1, second: -2 }),
};