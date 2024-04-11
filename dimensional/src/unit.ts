import { Compound } from './compound';
import { ConversionTable } from './conversion';
import { Dimension } from './dimension';
import { NumberDictionary } from './lib';

/**
 * Contains a list of all units related to time.
 */
export type TimeUnits = 'nanoseconds' | 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';
/**
 * Contains a list of all units related to distance.
 */
export type LengthUnits = 'nanometers' | 'micrometers' | 'microns' | 'millimeters' | 'centimeters' | 'meters' | 'kilometers' | 'inches' | 'feet' | 'yards' | 'miles';
/**
 * Contains a list of all unit sub-lists.
 */
export type Units = TimeUnits | LengthUnits;
/**
 * Defines the class for units for physical quantities.
 */
export class Unit extends Compound<Units, Unit> {
    public readonly dimension: Dimension;
    constructor(exponents: NumberDictionary<Units>) {
        super(exponents, t => ConversionTable[t].latex);
        this.dimension = new Dimension({});
        for (const unit of this.getNonzeroExponents()) {
            this.dimension = this.dimension.mult(ConversionTable[unit].dim, this.getExponent(unit));
        }
    }
    public mult(other: Unit, exponent: number): Unit {
        return new Unit(this.combine(other, exponent));
    }
}
/**
 * Shorthand for creating a new unit object.
 * @param exponents Exponents on each of the individual units
 * @returns A new unit object
 */
export function U(exponents: NumberDictionary<Units>): Unit {
    return new Unit(exponents);
}