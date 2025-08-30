import { dimensions } from 'dimensional';

// Define our dimensions
const a = dimensions.acceleration;
const v = dimensions.velocity;
const m = dimensions.Mass;
const Q = dimensions.volume.over(dimensions.Time); // Fuel consumption, e.g. gal/min - not a default dimension

// Determine dimensions on C
const C = a.times(v).over(m);
console.log(C.toString());

// Determine dimensions on x
const x = C.over(Q);
console.log(x.toString());