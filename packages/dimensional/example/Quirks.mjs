import { Dimension, dimensions, prefixes, Quantity, units } from 'dimensional';

// Define the length dimension
const length_1 = new Dimension('L');

// You can combine dimensions alone
const area = length_1.pow(2);
console.log(area.toString());

// Define the same dimension again
// but it's not the same as the one
// defined previously.
const length_2 = new Dimension('L');
console.log('length_1 == length_2?', length_1.is(length_2));

// It's also not the same as the built-in dimension
console.log('length_1 == length?', length_1.is(dimensions.Length));

// By adding the same prefix to the same unit, but in 2
// distinct instances, the units are no longer identical
const km_1 = units.meter.prefix(prefixes.kilo);
const km_2 = units.meter.prefix(prefixes.kilo);
console.log('km_1 == km_2?', km_1.is(km_2));

// However, their conversion factor is 1
const km_to_km = km_1.to(km_2);
console.log('Conversion factor:', km_to_km);

// That means, quantities using either of
// those units are technically identical
const q1 = new Quantity(5, km_1);
const q2 = q1.as(km_2); // Convert to km_2
console.log(q1.toString(), q2.toString());

// Let's derive a dimension using
// pre-packaged default dimensions
const complex_dimension = dimensions.Mass.over(dimensions.Length.times(dimensions.area));

// Use the JavaScript builtins `Object.entries`
// and `.forEach` loop to iterate through each
// default dimension to find the match.
Object.entries(dimensions).forEach(([key, val]) => {
    if (val.is(complex_dimension)) {
        console.log('The unknown dimension is ' + key + '.');
    }
});