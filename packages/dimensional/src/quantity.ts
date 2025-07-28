import { Compound } from './compound';
import { Dimension } from './dimension';
import { Unit } from './unit';

export class Quantity {
    public readonly units: Compound<Unit>;
    public readonly dimensions: Compound<Dimension>;
    private readonly scale: number;
    constructor(public readonly quantity: number, unit: Unit | Compound<Unit>) {
        if (unit instanceof Unit) {
            this.units = new Compound(unit);
            this.dimensions = new Compound(unit.dimensions);
            this.scale = unit.scale;
        } else {
            const compoundUnit: Unit = new Unit('', { units: unit });
            this.units = unit;
            this.dimensions = compoundUnit.dimensions;
            this.scale = compoundUnit.scale;
        }
    }
    public plus(other: Quantity): Quantity {
        if (this.dimensions.is(other.dimensions)) {
            return new Quantity(this.quantity + other.quantity * other.scale / this.scale, this.units);
        } else {
            throw new DimensionMismatch(this, other);
        }
    }
    public minus(other: Quantity): Quantity {
        return this.plus(new Quantity(-other.quantity, other.units));
    }
    public times(other: Quantity | number): Quantity {
        if (other instanceof Quantity) {
            return new Quantity(this.quantity * other.quantity, this.units.times(other.units));
        } else {
            return new Quantity(this.quantity * other, this.units);
        }
    }
    public over(other: Quantity): Quantity {
        return new Quantity(this.quantity / other.quantity, this.units.over(other.units));
    }
    public pow(exponent: number): Quantity {
        return new Quantity(this.quantity ** exponent, this.units.pow(exponent));
    }
    public toString(): string {
        return this.quantity + ' \\left[ ' + this.units.toString() + ' \\right]';
    }
}

class DimensionMismatch extends Error {
    constructor(me: Quantity, other: Quantity) {
        super('Dimensions on ' + me.units.toString() + ' does not match dimensions on ' + other.units.toString());
    }
}