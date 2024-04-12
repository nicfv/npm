import { SMath } from 'smath';
import { Unit } from './unit';

export namespace Quantity {
    export class Quantity {
        private readonly base: number;
        constructor(private readonly value: number, private readonly unit: Unit.Unit) {
            this.base = value;
            this.base = SMath.expand(value, 0, unit.scale);
        }
        public as(newUnit: Unit.Unit): Quantity {
            if (!this.unit.dimension.is(newUnit.dimension)) {
                throw new Error('\\text{Dimensions do not match! } ' + this.unit.dimension.toString() + ' \\text{ vs. } ' + newUnit.dimension.toString())
            }
            return new Quantity(SMath.normalize(this.base, 0, newUnit.scale), newUnit);
        }
        /**
         * Multiply this quantity by a constant scalar factor and return the result.
         * @param factor Any scalar value
         * @returns A scaled quantity with the same units
         */
        public scale(factor: number): Quantity {
            return new Quantity(this.value * factor, this.unit);
        }
        /**
         * Add this quantity to another and return the sum.
         * @param other Another quantity of like dimensions
         * @returns The sum, with the units of the first quantity
         */
        public plus(other: Quantity): Quantity {
            return new Quantity(this.value + other.as(this.unit).value, this.unit);
        }
        /**
         * Subtract another quantity from this one and return the difference.
         * @param other Another quantity of like dimensions
         * @returns The difference, with the units of the first quantity
         */
        public minus(other: Quantity): Quantity {
            return this.plus(other.scale(-1));
        }
        /**
         * Multiply this quantity by another and return the product.
         * @param other Another quantity (any dimension)
         * @param exponent An optional exponent to apply on the other quantity
         * @returns The product, with combined units (some may cancel)
         */
        public times(other: Quantity, exponent: number = 1): Quantity {
            return new Quantity(this.value * (other.value ** exponent), this.unit.mult(other.unit, exponent));
        }
        /**
         * Divide this quantity by another and return the quotient.
         * @param other Another quantity (any dimension)
         * @param exponent An optional exponent to apply on the other quantity
         * @returns The quotient, with combined units (some may cancel)
         */
        public over(other: Quantity, exponent: number = 1): Quantity {
            return this.times(other, -exponent);
        }
        /**
         * Raise this quantity to an exponent and return the power.
         * @param exponent The exponent to raise this unit to
         * @returns The power, with appropriate units
         */
        public pow(exponent: number): Quantity {
            return new Quantity(this.value ** exponent, Unit.None.mult(this.unit, exponent));
        }
        /**
         * Generate valid LaTeX code representing this quantity.
         * @returns A valid LaTeX equation
         */
        public toString(): string {
            return this.value.toString() + '\\left[' + this.unit.toString() + '\\right]';
        }
    }
}