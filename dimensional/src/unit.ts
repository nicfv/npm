import { Compound } from './compound';
import { Conversion } from './conversion';
import { Dimension } from './dimension';

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
        public readonly dimension: Dimension.Dimension;
        public readonly scale: number;
        constructor(exponents: Exponents) {
            const conversion: Conversion.Conversion = Unit.getConversion(exponents, 1, new Dimension.Dimension({}));
            super(exponents, t => Conversion.Table[t]().latex);
            this.scale = conversion.scale;
            this.dimension = conversion.dimension;
        }
        public mult(other: Unit, exponent: number): Unit {
            return new Unit(this.combine(other, exponent));
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
}
/**
 * Shorthand for creating a new unit of measurement.
 * @param exponents Exponents on each of the individual units
 * @returns A new unit object
 */
// export function U(exponents: UnitExponents): Unit {
//     return new Unit(exponents);
// }