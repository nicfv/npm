import { Compound } from './compound';

/**
 * Represents a physical base dimension.
 */
export class Dimension extends Compound<Dimension> {
    /**
     * Define a new physical base dimension.
     * @param LaTeX The LaTeX symbol for this dimension
     */
    constructor(LaTeX?: string | Map<Dimension, number>) {
        super(() => this, LaTeX);
    }
    protected fromMap(factors: Map<Dimension, number>): Dimension {
        return new Dimension(factors);
    }
}