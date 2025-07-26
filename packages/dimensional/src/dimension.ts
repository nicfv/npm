import { MathSymbol } from './compound';

/**
 * Represents a physical base dimension.
 */
export class Dimension implements MathSymbol {
    public static readonly Mass = new Dimension('\\textbf{M}');
    public static readonly Length = new Dimension('\\textbf{L}');
    public static readonly Time = new Dimension('\\textbf{T}');
    public static readonly Temperature = new Dimension('\\Theta');
    public static readonly Current = new Dimension('\\textbf{I}');
    public static readonly LuminousIntensity = new Dimension('\\textbf{J}');
    public static readonly AmountOfSubstance = new Dimension('\\textbf{N}');
    /**
     * Define a new physical base dimension.
     * @param LaTeX The mathematical symbol for this dimension
     */
    constructor(public readonly LaTeX: string) { }
}