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