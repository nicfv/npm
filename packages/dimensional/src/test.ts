import * as T6 from 't6';
import { Dimension } from './dimension';
import { Attribute } from './attribute';
import { Compound } from './compound';

T6.isTrue(true);

const length = new Dimension('L'),
    time = new Dimension('T');

const duration = new Attribute('t', time),
    distance = new Attribute('x', length),
    velocity = new Attribute('v', new Compound([[distance, 1], [duration, -1]])),
    acceleration = new Attribute('a', new Compound([[velocity, 1], [duration, -1]]));

console.log(acceleration.LaTeX, acceleration.baseDimensions.toString());

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

// type hiscore = { name: string, score: number } & MathSymbol;

// const hiscore1: hiscore = { name: 'hs1', score: 32, LaTeX: 'A' },
//     hiscore2: hiscore = { name: 'hs2', score: 21, LaTeX: 'B' };

// const c = new Compound<hiscore>([
//     [hiscore1, 2],
//     [hiscore2, 3],
//     [hiscore1, 1],
// ]),
//     d = new Compound<hiscore>([
//         [hiscore1, 4],
//         [hiscore2, 1],
//         [hiscore2, -1],
//     ]);
// console.log(c.toString(), d.toString(), (c.over(d)).toString(), c.is(c), c.is(d));
// console.log(d.times(hiscore2).toString());
