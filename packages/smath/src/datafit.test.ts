import * as T6 from 't6';
import { SMath, DataFit } from './index.js';

// DataFit tests
// Define f(x)
const a: number[] = [-3, 1, 0.2];
function f(x: number, a0: number | undefined, a1: number | undefined, a2: number | undefined): number {
    a0 ??= a[0];
    a1 ??= a[1];
    a2 ??= a[2];
    return a2 * x ** 2 + a1 * x + a0;
}
// Generate dataset and fit curve
const data: DataFit.Datum<number>[] = SMath.linspace(-5, 5, 9).map(x => ({ x: x, y: f(x, undefined, undefined, undefined) })),
    summary: DataFit.Summary<number> = DataFit.fit(f, data);
// Make sure dataset is accurate
T6.eq(data[0].x, -5);
T6.eq(data[0].y, -3);
T6.eq(data[4].x, 0);
T6.eq(data[4].y, -3);
T6.eq(data[8].x, 5);
T6.eq(data[8].y, 7);
// Make sure that summary contains the correct number of parameters
T6.eq(summary.params.length, a.length, `There are ${summary.params.length} parameters in the summary, but there should be ${a.length}.`);
// Check accuracy of best fit
// Values should be within 20%
// of actual, but this could
// fail due to randomness.
const tolerance = 0.20;
T6.le(Math.abs(SMath.error(summary.params[0], a[0])), tolerance);
T6.le(Math.abs(SMath.error(summary.params[1], a[1])), tolerance);
T6.le(Math.abs(SMath.error(summary.params[2], a[2])), tolerance);
T6.le(Math.abs(SMath.error(summary.f(-5), f(-5, undefined, undefined, undefined))), tolerance);
T6.le(Math.abs(SMath.error(summary.f(0), f(0, undefined, undefined, undefined))), tolerance);
T6.le(Math.abs(SMath.error(summary.f(5), f(5, undefined, undefined, undefined))), tolerance);

// Define 2D function g(x,y)
const b = [0.5, -2, 1];
function g([x, y]: number[], bx: number | undefined, by: number | undefined, bz: number | undefined): number {
    bx ??= b[0];
    by ??= b[1];
    bz ??= b[2];
    return bx * x + by * y + bz;
}
// Generate dataset and fit curve
const data2: DataFit.Datum<number[]>[] = [];
SMath.linspace(-5, 5, 9).forEach(x => {
    SMath.linspace(-5, 5, 9).forEach(y => {
        data2.push({ x: [x, y], y: g([x, y], undefined, undefined, undefined) });
    });
});
const summary2: DataFit.Summary<number[]> = DataFit.fit(g, data2);
// Make sure dataset is accurate
T6.eq(data2[0].x[0], -5);
T6.eq(data2[0].x[1], -5);
T6.eq(data2[0].y, 8.5);
// Validate accuracy of fitted data
T6.le(Math.abs(SMath.error(summary2.params[0], b[0])), tolerance);
T6.le(Math.abs(SMath.error(summary2.params[1], b[1])), tolerance);
T6.le(Math.abs(SMath.error(summary2.params[2], b[2])), tolerance);
T6.le(Math.abs(SMath.error(summary2.f([-5, -5]), g([-5, -5], undefined, undefined, undefined))), tolerance);

// Define a nonlinear function with wildly different parameter magnitudes
const c: number[] = [1050, 0.2];
function h(x: number, A: number | undefined, w: number | undefined): number {
    A ??= c[0];
    w ??= c[1];
    return A * Math.sin(w * x);
}
// Generate dataset and fit curve
const data3: DataFit.Datum<number>[] = SMath.linspace(0, 15, 100).map(x => ({ x: x, y: h(x, undefined, undefined) })),
    summary3: DataFit.Summary<number> = DataFit.fit(h, data3);
// Make sure dataset is accurate
T6.eq(data3[0].x, 0);
T6.eq(data3[0].y, 0);
// Validate accuracy of fitted data
T6.le(Math.abs(SMath.error(Math.abs(summary3.params[0]), c[0])), tolerance, JSON.stringify(summary3));
T6.le(Math.abs(SMath.error(Math.abs(summary3.params[1]), c[1])), tolerance, JSON.stringify(summary3));
T6.le(Math.abs(SMath.error(summary3.f(3), h(3, undefined, undefined))), tolerance, JSON.stringify([summary3, summary3.f(0), h(0, undefined, undefined)]));
T6.le(Math.abs(SMath.error(summary3.f(4), h(4, undefined, undefined))), tolerance, JSON.stringify([summary3, summary3.f(1), h(1, undefined, undefined)]));
