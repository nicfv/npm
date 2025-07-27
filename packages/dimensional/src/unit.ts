import { Attribute } from './attribute';
import { Compound, MathSymbol } from './compound';
import { Dimension } from './dimension';

export class Unit implements MathSymbol {
    public readonly scale: number = 1;
    public readonly baseAttributes: Compound<Attribute>;
    public readonly baseDimensions: Compound<Dimension>;
    constructor(public readonly LaTeX: string, makeup: { base: Attribute } | { unit: Unit, scale: number } | { units: Compound<Unit> }) {
        if ('base' in makeup) {
            this.baseAttributes = new Compound(makeup.base);
            this.baseDimensions = new Compound(makeup.base.baseDimensions);
        } else if ('unit' in makeup) {
            this.scale = makeup.scale;
            console.log(LaTeX, this.scale, makeup.scale);
            this.baseAttributes = new Compound(makeup.unit.baseAttributes);
            this.baseDimensions = new Compound(makeup.unit.baseDimensions);
        } else {
            this.baseAttributes = new Compound();
            this.baseDimensions = new Compound();
            for (const unit of makeup.units.getTerms()) {
                const exponent: number = makeup.units.getExponent(unit);
                this.baseAttributes = this.baseAttributes.times(unit.baseAttributes.pow(exponent));
                this.baseDimensions = this.baseDimensions.times(unit.baseDimensions.pow(exponent));
                this.scale *= (unit.scale ** exponent);
            }
        }
    }
}