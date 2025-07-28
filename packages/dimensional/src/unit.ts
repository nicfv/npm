import { Compound, MathSymbol } from './compound';
import { Dimension } from './dimension';
import { Prefix } from './prefix';

/**
 * Represents a measurable unit.
 */
export class Unit implements MathSymbol {
    /**
     * The scale factor of this unit relative to the base unit of this dimension.
     */
    public readonly scale: number = 1;
    /**
     * The base dimensions of this unit.
     */
    public readonly baseDimensions: Compound<Dimension>;
    /**
     * Define a new unit.
     * @param LaTeX The LaTeX code for this unit
     * @param makeup The makeup of this unit, either a base dimension, a scale of another unit, or a compound of multiple units
     */
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
    /**
     * Scale this unit by applying a prefix.
     * @param prefix The prefix to apply
     * @returns A properly scaled unit
     */
    public prefix(prefix: Prefix): Unit {
        return new Unit(prefix.LaTeX + this.LaTeX, { unit: this, scale: prefix.scale });
    }
}