import * as T6 from 't6';
// import { Dimension } from './dimension';
// import { Attribute } from './attribute';
import { Compound } from './compound';

T6.isTrue(true);

// new Dimension('mass', 'M');
// new Dimension('length', 'L');
// new Dimension('time', 'T');

// new Attribute('length', 'x', 'length');
// new Attribute('time', 't', 'time');
// new Attribute('velocity', 'v', { 'length': 1, 'time': -1 });
// new Attribute('acceleration', 'a', { 'velocity': 1, 'time': -1 });

// console.log(Dimension.get('mass')?.toString(), Dimension.getNames());
// console.log(Attribute.get('acceleration')?.getBaseDimensions());
// console.log(Attribute.get('acceleration')?.toString('base-dimensions'));

type hiscore = { name: string, score: number, sym: string };

const hiscore1: hiscore = { name: 'asdf', score: 12, sym: 'A' },
    hiscore2: hiscore = { name: 'fdsa', score: 21, sym: 'B' };

function getSym(x: hiscore) { return x.sym; }

const c = new Compound<hiscore>([
    [hiscore1, 2],
    [hiscore2, 3],
    [hiscore1, 1],
]),
    d = new Compound<hiscore>([
        [hiscore1, 4],
        [hiscore2, -1],
    ]);
console.log(c.LaTeX(getSym), d.LaTeX(getSym), (c.over(d)).LaTeX(getSym));
