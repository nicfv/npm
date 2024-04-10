import { Compound } from './compound';
import { ConversionTable } from './conversion';
import { Dimension } from './dimension';
import { NumberDictionary } from './lib';

/**
 * Contains a list of all units related to time.
 */
export type TimeUnits = 'nanoseconds' | 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';
/**
 * Contains a list of all units related to distance.
 */
export type LengthUnits = 'nanometers' | 'micrometers' | 'microns' | 'millimeters' | 'centimeters' | 'meters' | 'kilometers' | 'inches' | 'feet' | 'yards' | 'miles';
/**
 * Contains a list of all unit sub-lists.
 */
export type Units = TimeUnits | LengthUnits;
/**
 * Defines the class for units for physical quantities.
 */
export type Unit = NumberDictionary<Units>;
/**
 * Calculate the base dimensions for any unit of a quantity.
 * @param unit Any combination of physical units
 * @returns The base dimensions
 */
export function getBaseDimensions(unit: Unit): Dimension {
    let dimension: Dimension = {};
    for (const u in unit) {
        dimension = Compound.combine(dimension, ConversionTable[u as Units].dim, unit[u as Units] ?? 0);
    }
    return dimension;
}