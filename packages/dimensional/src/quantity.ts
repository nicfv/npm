import { Unit } from './unit';

export class Quantity {
    constructor(public readonly quantity: number, public readonly units: Unit) { }
    public scaleBy(factor: number): Quantity {
        return new Quantity(this.quantity * factor, this.units);
    }
    public plus(other: Quantity): Quantity {
        return new Quantity(this.quantity + other.as(this.units).quantity, this.units);
    }
    public minus(other: Quantity): Quantity {
        return new Quantity(this.quantity - other.as(this.units).quantity, this.units);
    }
    public times(other: Quantity): Quantity {
        return new Quantity(this.quantity * other.quantity, this.units.times(other.units));
    }
    public over(other: Quantity): Quantity {
        return new Quantity(this.quantity / other.quantity, this.units.over(other.units));
    }
    public pow(exponent: number): Quantity {
        return new Quantity(this.quantity ** exponent, this.units.pow(exponent));
    }
    public as(units: Unit): Quantity {
        return new Quantity(this.quantity * this.units.to(units), units);
    }
    public toString(): string {
        return this.quantity.toString() + ' \\left[ ' + this.units.toString() + ' \\right]';
    }
}