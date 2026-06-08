import * as T6 from 't6';
import * as SMath from 'smath';
import { Pumpchart } from './index.js';
import { f, zero } from './pumpchart/lib.js';
import { FlowUnits } from './pumpchart/units.js';

T6.eq(Pumpchart.getFlowUnits().length, Object.entries(FlowUnits).length);

const f1: f = x => x * x - 9; // Has 2 solutions
T6.isTrue(SMath.approx(zero(f1, 0, 10), 3));
T6.isTrue(SMath.approx(zero(f1, 0, -10), -3));
const f2: f = x => x * x * x - 64;
T6.isTrue(SMath.approx(zero(f2, 0, 10), 4));
T6.isTrue(SMath.approx(zero(f2, 0, 4), 4));
T6.isTrue(SMath.approx(zero(f2, 4, 0), 4));
let caught: boolean;
let message: string;
caught = false;
message = '';
try {
    zero(f1, -5, -4);
} catch (e) {
    caught = true;
    message = (e as Error).message;
}
T6.isTrue(caught, 'Did not catch f1 [-5, -4]');
T6.is(message, 'A solution cannot be found.');
caught = false;
message = '';
try {
    zero(f1, -5, 5); // Cannot find both solutions at once
} catch (e) {
    caught = true;
    message = (e as Error).message;
}
T6.isTrue(caught, 'Did not catch f1 [-5, 5]');
T6.is(message, 'A solution cannot be found.');
caught = false;
message = '';
try {
    zero(f2, -5, -10);
} catch (e) {
    caught = true;
    message = (e as Error).message;
}
T6.isTrue(caught, 'Did not catch f2');
T6.is(message, 'A solution cannot be found.');
T6.isTrue(SMath.approx(zero(Math.sin, 1, 5), Math.PI), 'sin');
T6.isTrue(SMath.approx(zero(Math.cos, 0, 4), Math.PI / 2), 'cos');
T6.isTrue(SMath.approx(zero(Math.log, 0, 10), 1), 'log');
caught = false;
message = '';
try {
    zero(Math.log, -1, 10); // Bad domain
} catch (e) {
    caught = true;
    message = (e as Error).message;
}
T6.isTrue(caught, 'Did not catch log(-1)');
T6.is(message, 'f(-1) is NaN');
