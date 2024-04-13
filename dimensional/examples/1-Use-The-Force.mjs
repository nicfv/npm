import { Q, U } from 'dimensional';

// Weight is actually a force - not a mass!
// Therefore, units must be in pounds of force
const weight_lbs = Q(150, U({ pound_force: 1 }));

// We can easily obtain our weight in Newtons
// with a simple conversion using Quantity.as(unit)
const weight_N = weight_lbs.as(U({ Newton: 1 }));

// Print out the results of the conversion
console.log(weight_lbs.toString() + '=' + weight_N.toString());

// In case we want the raw value...
const weight_N_value = weight_N.value;
console.log('Raw value = ' + weight_N_value);