import { Dimension } from './dimension';
import { Unit } from './unit';

/**
 * Shorthand for creating a set of physical base dimensions.
 * @param exponents Exponents of each of the dimensions
 * @returns A new dimension object
 */
export function D(exponents: Dimension.Exponents): Dimension.Dimension {
    return new Dimension.Dimension(exponents);
}

/**
 * Shorthand for creating a new unit of measurement.
 * @param exponents Exponents on each of the individual units
 * @returns A new unit object
 */
export function U(exponents: Unit.Exponents): Unit.Unit {
    return new Unit.Unit(exponents);
}