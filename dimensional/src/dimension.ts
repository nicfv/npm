import { Compound } from './compound';
/**
 * Contains all software used for the calculation of physical base dimensions.
 */
export namespace Dimension {
    /**
     * A list of common names for each of the physical base dimensions.
     */
    export type Name = 'time' | 'length' | 'mass' | 'current' | 'temperature' | 'amount' | 'intensity';
    /**
     * Contains all physical base dimensions and their corresponding abbreviations.
     */
    const Table: { [index in Name]: string } = {
        'amount': '\\textbf{N}',
        'current': '\\textbf{I}',
        'intensity': '\\textbf{J}',
        'length': '\\textbf{L}',
        'mass': '\\textbf{M}',
        'temperature': '\\boldsymbol{\\Theta}',
        'time': '\\textbf{T}',
    };
    /**
     * Is an object containing keys of dimensions and values of nonzero exponents.
     */
    export interface Exponents extends Compound.Exponents<Name> { };
    /**
     * Defines the class for physical base dimensions.
     */
    export class Dimension extends Compound.Compound<Name, Dimension> {
        constructor(exponents: Exponents) {
            super(exponents, t => Table[t]);
        }
        public mult(other: Dimension, exponent: number): Dimension {
            return new Dimension(super.combine(other, exponent));
        }
    }
    /**
     * Represents a dimensionless value.
     */
    export const None = new Dimension({});
}