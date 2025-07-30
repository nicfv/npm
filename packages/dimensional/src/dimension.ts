import { Compound } from './compound';

/**
 * Represents a physical base dimension.
 */
export class Dimension extends Compound<Dimension> {
    public times(factor: Dimension): Dimension {
        return new Dimension([...super.multiplyFactors(this, factor)]);
    }
    public pow(exponent: number): Dimension {
        return new Dimension([...super.raiseFactors(this, exponent)]);
    }
}