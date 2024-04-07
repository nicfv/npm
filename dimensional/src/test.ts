import { Dimension } from './dimension';

const V = new Dimension({ 'length': 2 }).mult(new Dimension({ 'time': -0.5, 'temperature': -1 }));
console.log(V.toString());