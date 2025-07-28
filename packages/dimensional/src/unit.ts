import { Compound, MathSymbol } from './compound';
import { Dimension } from './dimension';
import { Prefix, prefixTable } from './prefix';

export class Unit implements MathSymbol {
    public readonly scale: number = 1;
    public readonly baseDimensions: Compound<Dimension>;
    constructor(public readonly LaTeX: string, makeup: { base: Dimension } | { unit: Unit, scale: number } | { units: Compound<Unit> }) {
        if ('base' in makeup) {
            this.baseDimensions = new Compound(makeup.base);
        } else if ('unit' in makeup) {
            this.scale = makeup.scale;
            this.baseDimensions = new Compound(makeup.unit.baseDimensions);
        } else {
            this.baseDimensions = new Compound();
            for (const unit of makeup.units.getTerms()) {
                const exponent: number = makeup.units.getExponent(unit);
                this.baseDimensions = this.baseDimensions.times(unit.baseDimensions.pow(exponent));
                this.scale *= (unit.scale ** exponent);
            }
        }
    }
    public prefix(prefix: Prefix): Unit {
        return new Unit(prefixTable[prefix].LaTeX + this.LaTeX, { unit: this, scale: this.scale * prefixTable[prefix].scale });
    }
}