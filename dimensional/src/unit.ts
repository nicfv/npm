import { Compound } from './compound';
import { ConversionTable } from './conversion';
import { NumberDictionary } from './lib';

/**
 * Contains a list of all units related to time.
 */
export type TimeUnits = 'nanoseconds' | 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';
/**
 * Contains a list of all unit sub-lists.
 */
export type Units = TimeUnits | 'none';
/**
 * Defines the class for units for physical quantities.
 */
export class Unit extends Compound<Units> {
    constructor(exponents: NumberDictionary<Units>) {
        super(exponents, t => ConversionTable[t].latex);
    }
}