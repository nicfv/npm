import { fit } from './lib';
import { Datum, Summary } from './types';
import { SMath } from 'smath';
import { X } from 'exray';

// Define f(x)
const a: Array<number> = [-3, 1, 0.2];
function f(x: number, a0: number = a[0], a1: number = a[1], a2: number = a[2]): number {
    return a2 * x ** 2 + a1 * x + a0;
}
// Generate dataset and fit curve
const data: Datum<number>[] = SMath.linspace(-5, 5, 9).map(x => ({ x: x, y: f(x) })),
    summary: Summary<number> = fit(f, data);
// Make sure dataset is accurate
X.eq(data[0].x, -5);
X.eq(data[0].y, -3);
X.eq(data[4].x, 0);
X.eq(data[4].y, -3);
X.eq(data[8].x, 5);
X.eq(data[8].y, 7);
// Check accuracy of best fit
// Values should be within 20%
// of actual, but this could
// fail due to randomness.
const tolerance: number = 0.20;
X.le(Math.abs(SMath.error(summary.params[0], a[0])), tolerance);
X.le(Math.abs(SMath.error(summary.params[1], a[1])), tolerance);
X.le(Math.abs(SMath.error(summary.params[2], a[2])), tolerance);
X.le(Math.abs(SMath.error(summary.f(-5), f(-5))), tolerance);
X.le(Math.abs(SMath.error(summary.f(0), f(0))), tolerance);
X.le(Math.abs(SMath.error(summary.f(5), f(5))), tolerance);

// Define 2D function g(x,y)
const b = [0.5, -2, 1];
function g([x, y]: Array<number>, bx: number = b[0], by: number = b[1], bz: number = b[2]): number {
    return bx * x + by * y + bz;
}
// Generate dataset and fit curve
const data2: Datum<number[]>[] = [];
SMath.linspace(-5, 5, 9).forEach(x => {
    SMath.linspace(-5, 5, 9).forEach(y => {
        data2.push({ x: [x, y], y: g([x, y]) });
    });
});
const summary2: Summary<number[]> = fit(g, data2);
// Make sure dataset is accurate
X.eq(data2[0].x[0], -5);
X.eq(data2[0].x[1], -5);
X.eq(data2[0].y, 8.5);
// Validate accuracy of fitted data
X.le(Math.abs(SMath.error(summary2.params[0], b[0])), tolerance);
X.le(Math.abs(SMath.error(summary2.params[1], b[1])), tolerance);
X.le(Math.abs(SMath.error(summary2.params[2], b[2])), tolerance);
X.le(Math.abs(SMath.error(summary2.f([-5, -5]), g([-5, -5]))), tolerance);

// Define a nonlinear function with wildly different parameter magnitudes
const c: Array<number> = [1000, -200, 1];
function h(x: number, c0: number = c[0], c1: number = c[1], c2: number = c[2]): number {
    return (1 + Math.abs(c2)) ** x + c1 * x + c0;
}
// Generate dataset and fit curve
const data3: Datum<number>[] = SMath.linspace(0, 10, 11).map(x => ({ x: x, y: h(x) })),
    summary3: Summary<number> = fit(h, data3);
// Make sure dataset is accurate
X.eq(data3[0].x, 0);
X.eq(data3[0].y, 1001);
X.eq(data3[5].x, 5);
X.eq(data3[5].y, 32);
X.eq(data3[8].x, 8);
X.eq(data3[8].y, -344);
X.eq(data3[10].x, 10);
X.eq(data3[10].y, 24);
// Validate accuracy of fitted data
X.le(Math.abs(SMath.error(summary3.params[0], c[0])), tolerance);
X.le(Math.abs(SMath.error(summary3.params[1], c[1])), tolerance);
X.le(Math.abs(SMath.error(Math.abs(summary3.params[2]), c[2])), tolerance);
X.le(Math.abs(SMath.error(summary3.f(0), h(0))), tolerance);
X.le(Math.abs(SMath.error(summary3.f(8), h(8))), tolerance);