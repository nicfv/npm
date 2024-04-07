import { SMath } from 'smath';
import { ConversionTable } from './conversion';
import { Unit } from './unit';

export class Quantity {
    private readonly base: number;
    constructor(private readonly value: number, private readonly unit: Unit) {
        this.base = value;
        for (const u of unit.getNonzeroExponents()) {
            const exponent: number = unit.getExponent(u);
            this.base = SMath.translate(this.base,
                (ConversionTable[u].this.min === 0) ? 0 : (ConversionTable[u].this.min ** exponent),
                (ConversionTable[u].this.max === 0) ? 0 : (ConversionTable[u].this.max ** exponent),
                (ConversionTable[u].base.min === 0) ? 0 : (ConversionTable[u].base.min ** exponent),
                (ConversionTable[u].base.max === 0) ? 0 : (ConversionTable[u].base.max ** exponent));
        }
    }
    public as(newUnit: Unit): Quantity {
        if (!this.unit.dimension.is(newUnit.dimension)) {
            throw new Error('\\text{Dimensions do not match! } ' + this.unit.dimension.toString() + ' \\text{ vs. } ' + newUnit.dimension.toString())
        }
        let newValue: number = this.base;
        for (const u of newUnit.getNonzeroExponents()) {
            const exponent: number = newUnit.getExponent(u);
            newValue = SMath.translate(newValue,
                (ConversionTable[u].base.min === 0) ? 0 : (ConversionTable[u].base.min ** exponent),
                (ConversionTable[u].base.max === 0) ? 0 : (ConversionTable[u].base.max ** exponent),
                (ConversionTable[u].this.min === 0) ? 0 : (ConversionTable[u].this.min ** exponent),
                (ConversionTable[u].this.max === 0) ? 0 : (ConversionTable[u].this.max ** exponent));
        }
        return new Quantity(newValue, newUnit);
    }
    public toString(): string {
        return this.value.toString() + '\\left[' + this.unit.toString() + '\\right]';
    }
}