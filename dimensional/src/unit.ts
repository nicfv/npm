import { Attribute } from './attribute';
import { Compound } from './compound';
import { Conversion } from './conversion';
/**
 * Contains all software used for the calculation of units of measurement.
 */
export namespace Unit {
    /**
     * Contains a list of all physical units of measurement.
     */
    export type Name =
        // Time span/duration
        | 'nanosecond' | 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'
        // Length/distance
        | 'nanometer' | 'micrometer' | 'micron' | 'millimeter' | 'centimeter' | 'meter' | 'kilometer' | 'inch' | 'foot' | 'yard' | 'mile'
        // Mass
        | 'milligram' | 'gram' | 'kilogram' | 'tonne' | 'ounce' | 'pound_mass' | 'slug' | 'stone' | 'shortton'
        // Current
        | 'milliampere' | 'ampere'
        // Temperature
        | 'Kelvin' | 'Rankine' | 'Celsius_delta' | 'Fahrenheight_delta'
        // Substance
        | 'mole'
        // Luminous Intensity
        | 'candela' | 'lumen'
        // Force
        | 'Newton' | 'kiloNewton' | 'pound_force'
        // Energy
        | 'Joule'
        // Power
        | 'Watt'
        // Trailing semicolon
        ;
    /**
     * Is an object containing keys of units and values of nonzero exponents.
     */
    export interface Exponents extends Compound.Exponents<Name> { };
    /**
     * Defines the class for units of measurement for physical quantities.
     */
    export class Unit extends Compound.Compound<Name, Unit> {
        /**
         * The scale of this unit relative to the base unit.
         */
        public readonly scale: number;
        /**
         * The physical base dimensions of this unit.
         */
        public readonly attribute: Attribute.Attribute;
        constructor(exponents: Exponents, attrOverride?: Attribute.Attribute) {
            super(exponents, t => Conversion.Table[t]().latex);
            this.scale = 1;
            this.attribute = Attribute.None;
            for (const unit in exponents) {
                const conversion: Conversion.Conversion = Conversion.Table[unit as Name](),
                    exponent: number = super.getExponent(unit as Name);
                this.scale *= (conversion.scale ** exponent);
                this.attribute = this.attribute.mult(conversion.attribute, exponent);
            }
            this.attribute = this.attribute.simplify();
            if (attrOverride) {
                if (this.attribute.dimension.is(attrOverride.dimension)) {
                    this.attribute = attrOverride;
                } else {
                    throw new Error('\\text{Override dimensions do not match! } ' + this.attribute.dimension.toString() + ' \\text{ vs. } ' + attrOverride.dimension.toString());
                }
            }
        }
        public mult(other: Unit, exponent: number): Unit {
            return new Unit(super.combine(other, exponent), this.attribute.mult(other.attribute, exponent));
        }
    }
    /**
     * Represents a unitless value.
     */
    export const None = new Unit({});
}