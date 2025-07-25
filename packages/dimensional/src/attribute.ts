import { Compound, MathSymbol } from './compound';
import { Dimension } from './dimension';

/**
 * Represents a type of measured quantity.
 */
export class Attribute implements MathSymbol {
    /**
     * Contains a compound of the physical base dimensions for this Attribute.
     */
    public readonly baseDimensions: Compound<Dimension>;
    /**
     * Define a new attribute.
     * @param LaTeX The LaTeX code for this `Attribute`
     * @param baseDimensionOrAttributes The physical base dimension, or makeup of attributes
     */
    constructor(public readonly LaTeX: string, baseDimensionOrAttributes: Dimension | Compound<Attribute>) {
        if (baseDimensionOrAttributes instanceof Dimension) {
            this.baseDimensions = new Compound(baseDimensionOrAttributes);
        } else {
            this.baseDimensions = new Compound();
            for (const attribute of baseDimensionOrAttributes.getTerms()) {
                const exponent: number = baseDimensionOrAttributes.getExponent(attribute);
                this.baseDimensions = this.baseDimensions.times(attribute.baseDimensions.pow(exponent));
            }
        }
    }
}