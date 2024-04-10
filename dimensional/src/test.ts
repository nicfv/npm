import { Dimension } from './dimension';
import { Quantity } from './quantity';
import { Unit } from './unit';

const u1: Unit = { centimeters: 1, seconds: 1 };
const u2: Unit = { miles: 1, hours: 1 };
const d1: Dimension = { amount: 1 };

const q1: Quantity = new Quantity(5, u1);

// const out = Compound.combine(u1, u2, 2);
const out = q1.as(u2);
console.log(out.toString());