import { Compound } from './compound';
import { ConversionTable } from './conversion';
import { Dimension } from './dimension';
import { NumberDictionary } from './lib';

/**
 * Contains a list of all physical units of measurement.
 */
export type Units =
    // Time span/duration
    | 'nanoseconds' | 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'
    // Length/distance
    | 'nanometers' | 'micrometers' | 'microns' | 'millimeters' | 'centimeters' | 'meters' | 'kilometers' | 'inches' | 'feet' | 'yards' | 'miles'
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
        this.scale = 1;
        this.dimension = new Dimension({});
        for (const unit of this.getNonzeroExponents()) {
            this.scale *= (ConversionTable[unit].scale ** this.getExponent(unit));
            this.dimension = this.dimension.mult(ConversionTable[unit].dim, this.getExponent(unit));
        }
    }
    public mult(other: Unit, exponent: number): Unit {
        return new Unit(this.combine(other, exponent));
    }
}
/**
 * Shorthand for creating a new unit of measurement.
 * @param exponents Exponents on each of the individual units
 * @returns A new unit object
 */
export function UoM(exponents: UnitExponents): Unit {
    return new Unit(exponents);
}