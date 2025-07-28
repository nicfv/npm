import { Compound, MathSymbol } from './compound';
import { Dimension } from './dimension';

/**
 * Represents a type of measured quantity.
 */
export class Attribute implements MathSymbol {
    public static readonly Mass = new Attribute('m', Dimension.Mass);
    public static readonly Length = new Attribute('x', Dimension.Length);
    public static readonly Time = new Attribute('t', Dimension.Time);
    public static readonly Temperature = new Attribute('T', Dimension.Temperature);
    public static readonly Current = new Attribute('I', Dimension.Current);
    public static readonly LuminousIntensity = new Attribute('I_{V}', Dimension.LuminousIntensity);
    public static readonly AmountOfSubstance = new Attribute('n', Dimension.AmountOfSubstance);
    public static readonly Velocity = new Attribute('v', new Compound(Attribute.Length).over(Attribute.Time));
    public static readonly Acceleration = new Attribute('a', new Compound(Attribute.Velocity).over(Attribute.Time));
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