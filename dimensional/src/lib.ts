import { Attribute } from './attribute';
import { Dimension } from './dimension';
import { Quantity } from './quantity';
import { Unit } from './unit';

/**
 * Shorthand for creating a set of physical base dimensions.
 * @param exponents Exponents of each of the dimensions
 * @returns A new dimension object
 */
export function D(exponents: Dimension.Exponents | Dimension.Name): Dimension.Dimension {
    return new Dimension.Dimension((typeof exponents === 'object') ? exponents : { [exponents]: 1 });
}

/**
 * Shorthand for creating a new attribute.
 * @param exponents Exponents that make up this attribute
 * @returns A new attribute object
 */
export function A(exponents: Attribute.Exponents | Attribute.Name): Attribute.Attribute {
    return new Attribute.Attribute((typeof exponents === 'object') ? exponents : { [exponents]: 1 });
}

/**
 * Shorthand for creating a new unit of measurement.
 * @param exponents Exponents on each of the individual units
 * @returns A new unit object
 */
export function U(exponents: Unit.Exponents | Unit.Name): Unit.Unit {
    return new Unit.Unit((typeof exponents === 'object') ? exponents : { [exponents]: 1 });
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