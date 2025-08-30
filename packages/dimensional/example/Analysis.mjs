import { dimensions } from 'dimensional';

// Define our dimensions
const a = dimensions.acceleration;
const v = dimensions.velocity;
const w = dimensions.force;
const Q = dimensions.volume.over(dimensions.Time); // Fuel consumption, e.g. gal/min - not a default dimension

// Determine dimensions on C (idling constant term)
const C = a.times(v).over(w);
console.log(C.toString());

// Determine dimensions on x (proportionality constant)
const x = C.over(Q);
console.log(x.toString());