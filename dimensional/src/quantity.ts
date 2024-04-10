import { SMath } from 'smath';
import { ConversionTable } from './conversion';
import { Unit, Units } from './unit';

export class Quantity {
    private readonly base: number;
    constructor(private readonly value: number, private readonly unit: Unit) {
        this.base = value;
        for (const u in unit) {
            this.base = SMath.expand(this.base, 0, ConversionTable[u as Units].scale ** (unit[u as Units] ?? 0));
        }
    }
    public as(newUnit: Unit): Quantity {
        // if (!this.unit.dimension.is(newUnit.dimension)) {
        //     throw new Error('\\text{Dimensions do not match! } ' + this.unit.dimension.toString() + ' \\text{ vs. } ' + newUnit.dimension.toString())
        // }
        let newValue: number = this.base;
        for (const u in newUnit) {
            newValue = SMath.normalize(newValue, 0, ConversionTable[u as Units].scale ** (newUnit[u as Units] ?? 0));
        }
        return new Quantity(newValue, newUnit);
    }
    public toString(): string {
        return this.value.toString() + '\\left[' + this.unit.toString() + '\\right]';
    }
}