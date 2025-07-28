import * as T6 from 't6';
import { Unit } from './unit';
import { Compound } from './compound';
import { defaults } from './defaults';

T6.isTrue(true);

const meter = new Unit('m', { base: defaults.dimensions.length }),
    second = new Unit('s', { base: defaults.dimensions.time }),
    gram = new Unit('g', { base: defaults.dimensions.mass }),
    kilogram = gram.prefix(defaults.prefixes.kilo),
    newton = new Unit('N', { units: new Compound([[kilogram, 1], [meter, 1], [second, -2]]) });

console.log(newton.LaTeX, newton.baseDimensions.toString(), newton.scale);
