import { Compound } from './compound';

/**
 * Represents a physical base dimension.
 */
export class Dimension extends Compound<Dimension> {
    /**
     * Define a new physical base dimension.
     * @param LaTeX The LaTeX symbol used for this dimension
     */
    constructor(LaTeX?: string | Map<Dimension, number>) {
        super(typeof LaTeX === 'string' ? [LaTeX, () => this] : LaTeX);
    }
    protected fromMap(factors: Map<Dimension, number>): Dimension {
        return new Dimension(factors);
    }
}