import * as T6 from 't6';
import { Unit } from './unit';
import { Compound } from './compound';
import { defaults } from './defaults';
import { Quantity } from './quantity';

T6.isTrue(true);

const meter = new Unit('\\text{m}', { base: defaults.dimensions.length }),
    second = new Unit('\\text{s}', { base: defaults.dimensions.time }),
    gram = new Unit('\\text{g}', { base: defaults.dimensions.mass }),
    kilogram = gram.prefix(defaults.prefixes.kilo),
    newton = new Unit('\\text{N}', { units: new Compound([[kilogram, 1], [meter, 1], [second, -2]]) }),
    kilonewton = newton.prefix(defaults.prefixes.kilo);

const F1: Quantity = new Quantity(5.5, kilonewton),
    F2: Quantity = new Quantity(1.2, meter);

console.log(F1.over(F2).toString(), F2.over(F1).toString(), F2.pow(2).toString());
