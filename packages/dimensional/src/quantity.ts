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
    public as(units: Unit | Compound<Unit>): Quantity {
        if (units instanceof Unit) {
            units = new Compound(units);
        }
        if (this.dimensions.is(new Unit('', { units: units }).dimensions)) {
            const compoundUnit: Unit = new Unit('', { units: units });
            return new Quantity(this.quantity * compoundUnit.scale / this.scale, units);
        } else {
            throw new DimensionMismatch(this, units);
        }
    }
    public toString(): string {
        return this.quantity + ' \\left[ ' + this.units.toString() + ' \\right]';
    }
}

class DimensionMismatch extends Error {
    constructor(me: Quantity, units: Compound<Unit>) {
        super('Dimensions on ' + me.units.toString() + ' does not match dimensions on ' + units.toString());
    }
}