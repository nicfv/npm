import { MathSymbol } from './compound';

/**
 * Represents a physical base dimension.
 */
export class Dimension implements MathSymbol {
    /**
     * Define a new physical base dimension.
     * @param LaTeX The mathematical symbol for this dimension
     */
    constructor(public readonly LaTeX: string) { }
}

/**
 * Writable dictionary containing base dimensions
 */
export const Dimensions: { [dimension: string]: Dimension } = {
    Mass: new Dimension('\\textbf{M}'),
    Length: new Dimension('\\textbf{L}'),
    Time: new Dimension('\\textbf{T}'),
    Temperature: new Dimension('\\Theta'),
    Current: new Dimension('\\textbf{I}'),
    LuminousIntensity: new Dimension('\\textbf{J}'),
    AmountOfSubstance: new Dimension('\\textbf{N}'),
};