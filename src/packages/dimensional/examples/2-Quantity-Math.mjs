import { Q, U } from 'dimensional';

// This is our weight from the previous example
const weight_lbs = Q(150, U({ pound_force: 1 }));

// Define Earth's gravity at sea level in SI units
const gravity = Q(9.81, U({ meter: 1, second: -2 }));

// Remember `F=ma`? Rearrange to `m=F/a`
const mass = weight_lbs.over(gravity);

// The units persist through the operation, unless if they cancel
// So we'll get `lbf*s^2/m` ... which is not the most useful unit
console.log(mass.toString());

// What are the dimensions on this weird unit?
console.log('dim=' + mass.unit.attribute.dimension.toString());

// We can use the Quantity.as(unit) method to convert to kg
console.log(mass.as(U({ kilogram: 1 })).toString());