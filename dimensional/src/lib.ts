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
 * @param name_or_exponents The raw name or exponents that make up this measurement
 * @returns A new measurement object
 */
export function M(name_or_exponents: Measure.Name | Measure.Exponents): Measure.Measure {
    if (typeof name_or_exponents === 'object') {
        return new Measure.Measure('', name_or_exponents);
    } else if (typeof name_or_exponents === 'string') {
        return Measure.get(name_or_exponents);
    } else {
        throw new Error('Cannot create a new measurement type from ' + (typeof name_or_exponents) + '!');
    }
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