import { Compound } from './compound';
import { Dictionary, NumberDictionary } from './lib';

/**
 * A list of common names for each of the physical base dimensions.
 */
export type Dimensions = 'time' | 'length' | 'mass' | 'current' | 'temperature' | 'amount' | 'intensity';
/**
 * Contains all physical base dimensions and their corresponding abbreviations.
 */
const dimensionTable: Dictionary<Dimensions> = {
    'amount': 'N',
    'current': 'I',
    'intensity': 'J',
    'length': 'L',
    'mass': 'M',
    'temperature': '\\Theta',
    'time': 'T',
};
/**
 * Defines the class for physical base dimensions.
 */
export class Dimension extends Compound<Dimensions> {
    constructor(exponents: NumberDictionary<Dimensions>) {
        super(exponents, t => dimensionTable[t]);
    }
}