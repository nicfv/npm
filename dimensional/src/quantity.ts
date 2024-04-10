import { SMath } from 'smath';
import { ConversionTable } from './conversion';
import { Unit } from './unit';

export class Quantity {
    private readonly base: number;
    constructor(private readonly value: number, private readonly unit: Unit) {
        this.base = value;
        for (const u of unit.getNonzeroExponents()) {
            this.base = SMath.expand(this.base, 0, ConversionTable[u].scale ** unit.getExponent(u));
        }
    }
    public as(newUnit: Unit): Quantity {
        if (!this.unit.dimension.is(newUnit.dimension)) {
            throw new Error('\\text{Dimensions do not match! } ' + this.unit.dimension.toString() + ' \\text{ vs. } ' + newUnit.dimension.toString())
        }
        let newValue: number = this.base;
        for (const u of newUnit.getNonzeroExponents()) {
            newValue = SMath.normalize(newValue, 0, ConversionTable[u].scale ** newUnit.getExponent(u));
        }
        return new Quantity(newValue, newUnit);
    }
    public toString(): string {
        return this.value.toString() + '\\left[' + this.unit.toString() + '\\right]';
    }
}