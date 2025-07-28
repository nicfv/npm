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

const F1: Quantity = new Quantity(55, newton),
    F2: Quantity = new Quantity(1, kilonewton);

console.log(F1.plus(F2).toString(), F2.plus(F1).toString());
