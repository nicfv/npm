import { Dimension, DimensionExponents } from './dimension';
import { Prefix, Prefixes } from './prefix';
import { Unit, UnitExponents, Units } from './unit';

/**
 * Contains information on how units should be converted.
 */
abstract class Conversion {
    /**
     * Create a new unit conversion.
     * @param latex The LaTeX representation of this unit.
     */
    constructor(public readonly latex: string) { }
}
/**
 * Contains information on how units should be converted.
 */
export class Simple extends Conversion {
    /**
     * The base physical dimensions of this simple unit.
     */
    public readonly dim: Dimension;
    /**
     * Create a new unit conversion for simple units.
     * @param latex The LaTeX representation of this unit.
     * @param exponents The exponents on the base physical dimensions.
     */
    constructor(latex: string, exponents: DimensionExponents) {
        super(latex);
        this.dim = new Dimension(exponents);
    }
}
export class Scaled extends Conversion {
    /**
     * The scale of this unit in relation to the base unit for this dimension.
     */
    public readonly scale: number;
    /**
     * Stores the unscaled base unit for this dimension.
     */
    public readonly baseUnits: Unit;
    /**
     * Create a new scaled unit using a metric prefix.
     * @param prefix The metric prefix of this unit.
     * @param base The base unit of this dimension.
     */
    constructor(prefix: Prefixes, base: Units) {
        const unitTemp: Unit = new Unit({ [base]: 1 });
        super(Prefix[prefix].latex + ' ' + unitTemp.toString());
        this.scale = Prefix[prefix].scale;
        this.baseUnits = unitTemp;
    }
}
/**
 * Contains information on how units should be converted.
 */
export class Complex extends Conversion {
    /**
     * Stores the base units for a unit combined from other units. For example, `kg*m/s^2` for Newtons.
     */
    public readonly baseUnits: Unit;
    /**
     * Create a new unit conversion for complex units.
     * @param latex The LaTeX representation of this unit.
     * @param scale The scale of this unit in relation to the base units that make up this dimension.
     * @param makeup The equivalent makeup of base units.
     */
    constructor(latex: string, public readonly scale: number, makeup: UnitExponents) {
        super(latex);
        this.baseUnits = new Unit(makeup);
    }
}
/**
 * Defines the type for the conversion table.
 */
type Conversions<T extends Conversion> = { [index in Units]: T };
/**
 * Represents the full conversion table for **absolute** units only.
 */
export const ConversionTable: Conversions<Conversion> = {
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