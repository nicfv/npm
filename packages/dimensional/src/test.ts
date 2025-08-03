import * as T6 from 't6';
import { Quantity } from './quantity';
import { defaults } from './defaults';

T6.isTrue(true);

const lb = new Quantity(130, defaults.pound),
    accel = new Quantity(1, defaults.foot.over(defaults.second.pow(2)));

console.log(lb.times(accel).as(defaults.Newton).toString())
console.log(defaults.year.to(defaults.second));