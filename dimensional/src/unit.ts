import { Compound } from './compound';
import { Conversion } from './conversion';
import { Dimension } from './dimension';
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
        | 'Kelvin' | 'Rankine' | 'Celsius_rel' | 'Fahrenheight_rel'
        // Substance
        | 'mole'
        // Luminous Intensity
        | 'candela' | 'lumen'
        // Force
        | 'Newton' | 'kiloNewton' | 'pound_force'
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
        public readonly dimension: Dimension.Dimension;
        constructor(exponents: Exponents) {
            const conversion: Conversion.Conversion = Unit.getConversion(exponents, 1, Dimension.None);
            super(exponents, t => Conversion.Table[t]().latex);
            this.scale = conversion.scale;
            this.dimension = conversion.dimension;
        }
        public mult(other: Unit, exponent: number): Unit {
            return new Unit(super.combine(other, exponent));
        }
        private static getConversion(exponents: Exponents, scale: number, dimension: Dimension.Dimension): Conversion.Conversion {
            for (const unit in exponents) {
                const conversion: Conversion.Conversion = Conversion.Table[unit as Unit.Name](),
                    exponent: number = exponents[unit as Unit.Name] ?? 0;
                scale *= (conversion.scale ** exponent);
                dimension = dimension.mult(conversion.dimension, exponent);
            }
            return new Conversion.Conversion('', scale, dimension);
        }
    }
    /**
     * Represents a unitless value.
     */
    export const None = new Unit({});
}