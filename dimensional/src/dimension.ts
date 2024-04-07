import { Compound } from './compound';
import { NumberDictionary } from './lib';

/**
 * A list of common names for each of the physical base dimensions.
 */
export type Dimensions = 'time' | 'length' | 'mass' | 'current' | 'temperature' | 'amount' | 'intensity';

export class Dimension extends Compound<Dimensions> {
    constructor(exponents: NumberDictionary<Dimensions>) {
        super(exponents, {
            'time': 'T',
            'length': 'L',
            'mass': 'M',
            'current': 'I',
            'temperature': '\\Theta',
            'amount': 'N',
            'intensity': 'J',
        });
    }
}

const asdf = { 'a': 'b', 'c': 'd' };

type x = keyof (typeof asdf);