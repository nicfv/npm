import { Dimension } from './dimension';

const V = new Dimension({ 'length': -1, 'time': -1 });
const speed = new Dimension({ 'time': -1, 'length': -1 })
console.log(V.toString(), speed.toString(), V.is(speed));