import { config } from './config';
import { Unit } from './unit';
import * as SMath from 'smath';

/**
 * Represents a physical, measurable quantity.
 */
export class Quantity {
    /**
     * Define a new quantity.
     * @param quantity The numeric value of the quanity
     * @param units The units of this quantity
     */
    constructor(public readonly quantity: number, public readonly units: Unit) { }
    /**
     * Scale this quantity by a constant factor.
     * @param factor A scalar
     * @returns A scaled quantity
     */
    public scaleBy(factor: number): Quantity {
        return new Quantity(this.quantity * factor, this.units);
    }
    /**
     * Add another quantity to this one.
     * @param other Another quantity
     * @returns The sum
     */
    public plus(other: Quantity): Quantity {
        return new Quantity(this.quantity + other.as(this.units).quantity, this.units);
    }
    /**
     * Subtract another quantity from this one.
     * @param other Another quantity
     * @returns The difference
     */
    public minus(other: Quantity): Quantity {
        return new Quantity(this.quantity - other.as(this.units).quantity, this.units);
    }
    /**
     * Multiply this quantity by another.
     * @param other Another quantity
     * @returns The product
     */
    public times(other: Quantity): Quantity {
        return new Quantity(this.quantity * other.quantity, this.units.times(other.units));
    }
    /**
     * Divide this quantity by another.
     * @param other Another quantity
     * @returns The quotient
     */
    public over(other: Quantity): Quantity {
        return new Quantity(this.quantity / other.quantity, this.units.over(other.units));
    }
    /**
     * Raise this quantity to an exponent.
     * @param exponent The exponent
     * @returns The power
     */
    public pow(exponent: number): Quantity {
        return new Quantity(this.quantity ** exponent, this.units.pow(exponent));
    }
    /**
     * Convert this quantity to another unit system. Dimensions **must** be identical between the two unit systems.
     * @param units Units to convert to
     * @returns This quantity in a different unit system
     */
    public as(units: Unit): Quantity {
        return new Quantity(this.quantity * this.units.to(units), units);
    }
    /**
     * Convert this quantity into LaTeX code.
     * @returns LaTeX code for this quantity
     */
    public toString(): string {
        const magnitude: number = Math.floor(Math.log10(this.quantity));
        let quantityString: string = SMath.round2(this.quantity, 10 ** -config.decimalsShown).toString();
        if (!SMath.approx(this.quantity, 0, 1e-10) && magnitude !== SMath.clamp(magnitude, config.scientificNotationMagnitude.min, config.scientificNotationMagnitude.max)) {
            const scaledQuantity: number = this.quantity / (10 ** magnitude);
            quantityString = SMath.round2(scaledQuantity, 10 ** -config.decimalsShown).toString() + ' \\times 10^{' + magnitude + '}';
        }
        return quantityString + ' ' + config.unitDelimiters.left + ' ' + this.units.toString() + ' ' + config.unitDelimiters.right;
    }
}