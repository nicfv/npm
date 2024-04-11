import { Compound } from './compound';
import { Dictionary, NumberDictionary } from './lib';

/**
 * A list of common names for each of the physical base dimensions.
 */
export type Dimensions = 'time' | 'length' | 'mass' | 'current' | 'temperature' | 'amount' | 'intensity';
/**
 * Contains all physical base dimensions and their corresponding abbreviations.
 */
const DimensionTable: Dictionary<Dimensions> = {
    'amount': '\\textbf{N}',
    'current': '\\textbf{I}',
    'intensity': '\\textbf{J}',
    'length': '\\textbf{L}',
    'mass': '\\textbf{M}',
    'temperature': '\\boldsymbol{\\Theta}',
    'time': '\\textbf{T}',
};
/**
 * Defines the class for physical base dimensions.
 */
export class Dimension extends Compound<Dimensions> {
    constructor(exponents: NumberDictionary<Dimensions>) {
        super(exponents, t => DimensionTable[t]);
    }
    public mult(other: Dimension, exponent: number): Dimension {
        return new Dimension(super.combine(other, exponent));
    }
}