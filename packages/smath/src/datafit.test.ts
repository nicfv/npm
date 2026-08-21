import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { SMath, DataFit } from './index.js';

describe('DataFit', () => {
    it('should fit a quadratic curve in one dimension', () => {
        const a: number[] = [-3, 1, 0.2];

        function f(x: number, a0: number | undefined, a1: number | undefined, a2: number | undefined): number {
            a0 ??= a[0];
            a1 ??= a[1];
            a2 ??= a[2];
            return a2 * x ** 2 + a1 * x + a0;
        }

        const data: DataFit.Datum<number>[] = SMath.linspace(-5, 5, 9).map(x => ({ x, y: f(x, undefined, undefined, undefined) }));
        const summary: DataFit.Summary<number> = DataFit.fit(f, data);
        const tolerance = 0.20;

        assert.strictEqual(data[0].x, -5);
        assert.strictEqual(data[0].y, -3);
        assert.strictEqual(data[4].x, 0);
        assert.strictEqual(data[4].y, -3);
        assert.strictEqual(data[8].x, 5);
        assert.strictEqual(data[8].y, 7);
        assert.strictEqual(summary.params.length, a.length, `There are ${summary.params.length} parameters in the summary, but there should be ${a.length}.`);
        assert.ok(Math.abs(SMath.error(summary.params[0], a[0])) <= tolerance);
        assert.ok(Math.abs(SMath.error(summary.params[1], a[1])) <= tolerance);
        assert.ok(Math.abs(SMath.error(summary.params[2], a[2])) <= tolerance);
        assert.ok(Math.abs(SMath.error(summary.f(-5), f(-5, undefined, undefined, undefined))) <= tolerance);
        assert.ok(Math.abs(SMath.error(summary.f(0), f(0, undefined, undefined, undefined))) <= tolerance);
        assert.ok(Math.abs(SMath.error(summary.f(5), f(5, undefined, undefined, undefined))) <= tolerance);
    });

    it('should fit a 2D linear model', () => {
        const b = [0.5, -2, 1];
        const tolerance = 0.20;

        function g([x, y]: number[], bx: number | undefined, by: number | undefined, bz: number | undefined): number {
            bx ??= b[0];
            by ??= b[1];
            bz ??= b[2];
            return bx * x + by * y + bz;
        }

        const data2: DataFit.Datum<number[]>[] = [];
        SMath.linspace(-5, 5, 9).forEach(x => {
            SMath.linspace(-5, 5, 9).forEach(y => {
                data2.push({ x: [x, y], y: g([x, y], undefined, undefined, undefined) });
            });
        });

        const summary2: DataFit.Summary<number[]> = DataFit.fit(g, data2);

        assert.strictEqual(data2[0].x[0], -5);
        assert.strictEqual(data2[0].x[1], -5);
        assert.strictEqual(data2[0].y, 8.5);
        assert.ok(Math.abs(SMath.error(summary2.params[0], b[0])) <= tolerance);
        assert.ok(Math.abs(SMath.error(summary2.params[1], b[1])) <= tolerance);
        assert.ok(Math.abs(SMath.error(summary2.params[2], b[2])) <= tolerance);
        assert.ok(Math.abs(SMath.error(summary2.f([-5, -5]), g([-5, -5], undefined, undefined, undefined))) <= tolerance);
    });

    it('should fit a nonlinear model with different parameter magnitudes', () => {
        const c: number[] = [1050, 0.2];
        const tolerance = 0.20;

        function h(x: number, A: number | undefined, w: number | undefined): number {
            A ??= c[0];
            w ??= c[1];
            return A * Math.sin(w * x);
        }

        const data3: DataFit.Datum<number>[] = SMath.linspace(0, 15, 100).map(x => ({ x, y: h(x, undefined, undefined) }));
        const summary3: DataFit.Summary<number> = DataFit.fit(h, data3);

        assert.strictEqual(data3[0].x, 0);
        assert.strictEqual(data3[0].y, 0);
        assert.ok(Math.abs(SMath.error(Math.abs(summary3.params[0]), c[0])) <= tolerance, JSON.stringify(summary3));
        assert.ok(Math.abs(SMath.error(Math.abs(summary3.params[1]), c[1])) <= tolerance, JSON.stringify(summary3));
        assert.ok(Math.abs(SMath.error(summary3.f(3), h(3, undefined, undefined))) <= tolerance, JSON.stringify([summary3, summary3.f(0), h(0, undefined, undefined)]));
        assert.ok(Math.abs(SMath.error(summary3.f(4), h(4, undefined, undefined))) <= tolerance, JSON.stringify([summary3, summary3.f(1), h(1, undefined, undefined)]));
    });
});
