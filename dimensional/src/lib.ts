import { Dimension } from './dimension';
import { Measure } from './measure';
import { Quantity } from './quantity';
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
 * Shorthand for creating a new measurement type.
 * @param exponents Exponents that make up this measurement
 * @returns A new measurement object
 */
export function M(exponents: Measure.Exponents): Measure.Measure {
    return new Measure.Measure(exponents);
}

/**
 * Shorthand for creating a new unit of measurement.
 * @param exponents Exponents on each of the individual units
 * @returns A new unit object
 */
export function U(exponents: Unit.Exponents): Unit.Unit {
    return new Unit.Unit(exponents);
}

/**
 * Shorthand for creating a new measured quantity.
 * @param value The numerical value of the measurement
 * @param unit The physical units of the measurement
 * @returns A new quantity object
 */
export function Q(value: number, unit: Unit.Unit): Quantity.Quantity {
    return new Quantity.Quantity(value, unit);
}