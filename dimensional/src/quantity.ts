import { SMath } from 'smath';
import { Unit } from './unit';

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
    public toString(): string {
        return this.value.toString() + '\\left[' + this.unit.toString() + '\\right]';
    }
}