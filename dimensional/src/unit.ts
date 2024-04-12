import { Compound } from './compound';
import { ConversionTable, Conversion } from './conversion';
import { D, Dimension } from './dimension';
import { NumberDictionary } from './lib';

/**
 * Contains a list of all physical units of measurement.
 */
export type Units =
    // Time span/duration
    | 'nanosecond' | 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'
    // Length/distance
    | 'nanometer' | 'micrometer' | 'micron' | 'millimeter' | 'centimeter' | 'meter' | 'kilometer' | 'inch' | 'foot' | 'yard' | 'mile'
    // Mass
    | 'milligram' | 'gram' | 'kilogram' | 'tonne' | 'ounce' | 'pound_mass' | 'slug' | 'stone' | 'shortton'
    // Force
    | 'Newton' | 'kiloNewton' | 'pound_force'
    // Trailing semicolon
    ;
/**
 * Is an object containing keys of units and values of nonzero exponents.
 */
export interface UnitExponents extends NumberDictionary<Units> { };
/**
 * Defines the class for units of measurement for physical quantities.
 */
export class Unit extends Compound<Units, Unit> {
    public readonly dimension: Dimension;
    public readonly scale: number;
    constructor(exponents: UnitExponents) {
        super(exponents, t => ConversionTable[t].latex);
        const conversion = Unit.getConversion(exponents, 1, new Dimension({}));
        this.scale = conversion.scale;
        this.dimension = conversion.dimension;
    }
    public mult(other: Unit, exponent: number): Unit {
        return new Unit(this.combine(other, exponent));
    }
    private static getConversion(exponents: UnitExponents, scale: number, dimension: Dimension): { scale: number, dimension: Dimension } {
        for (const unit in exponents) {
            const conversion: Conversion = ConversionTable[unit as Units],
                exponent: number = exponents[unit as Units] ?? 0;
            if (conversion.scale && conversion.makeup) {
                scale *= (conversion.scale ** exponent);
                const conv = this.getConversion(U({}).combine(U(conversion.makeup), exponent), scale, dimension);
                scale = conv.scale;
                dimension = conv.dimension;
            } else if (conversion.dim) {
                dimension = dimension.mult(D(conversion.dim), exponent);
            } else {
                throw new Error('Mal-formed ' + unit + ' data! Keys: ' + Object.keys(conversion));
            }
        }
        return {
            scale: scale,
            dimension: dimension,
        };
    }
}
/**
 * Shorthand for creating a new unit of measurement.
 * @param exponents Exponents on each of the individual units
 * @returns A new unit object
 */
export function U(exponents: UnitExponents): Unit {
    return new Unit(exponents);
}