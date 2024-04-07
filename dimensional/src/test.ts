import { Dimension } from './dimension';

const L = new Dimension({ 'length': 1 }).mult(new Dimension({ 'time': -1 }));
console.log(L);