import * as T6 from 't6';
import { Unit } from './unit';
import { Compound } from './compound';
import { Dimension } from './dimension';

T6.isTrue(true);

const meter = new Unit('m', { base: Dimension.Length }),
    second = new Unit('s', { base: Dimension.Time }),
    gram = new Unit('g', { base: Dimension.Mass }),
    kilogram = new Unit('kg', { unit: gram, scale: 1000 }),
    newton = new Unit('N', { units: new Compound([[kilogram, 1], [meter, 1], [second, -2]]) });

console.log(newton.LaTeX, newton.baseDimensions.toString(), newton.scale);
