import { Compound } from './compound';

/**
 * A list of common names for each of the physical base dimensions.
 */
export type DimensionName = 'time' | 'length' | 'mass' | 'current' | 'temperature' | 'amount' | 'intensity';
/**
 * A list of abbreviations for each of the physical base dimensions.
 */
export type DimensionAbbr = 'T' | 'L' | 'M' | 'I' | 'H' | 'N' | 'J';

export class Dimension extends Compound<DimensionName, DimensionAbbr> { }

const asdf = { 'a': 'b', 'c': 'd' };

type x = keyof (typeof asdf);