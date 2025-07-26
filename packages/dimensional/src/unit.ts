import { Attribute } from './attribute';
import { Compound, MathSymbol } from './compound';
import { Dimension } from './dimension';

export class Unit implements MathSymbol {
    public readonly scale: number = 1;
    public readonly baseAttributes: Compound<Attribute>;
    public readonly baseDimensions: Compound<Dimension>;
    constructor(public readonly LaTeX: string, makeup: { base: Attribute } | { units: Compound<Unit>, scale: number }) {
        if ('base' in makeup) {
            this.baseAttributes = new Compound(makeup.base);
            this.baseDimensions = new Compound(makeup.base.baseDimensions);
        } else {
            this.baseAttributes = new Compound();
            this.baseDimensions = new Compound();
            for (const unit of makeup.units.getTerms()) {
                const exponent: number = makeup.units.getExponent(unit);
                this.baseAttributes = this.baseAttributes.times(unit.baseAttributes.pow(exponent));
                this.scale *= (unit.scale ** exponent);
            }
        }
    }
}