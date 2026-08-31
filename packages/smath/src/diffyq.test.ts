import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DiffyQ, SMath } from './index.js';

describe('differential equation', () => {
    describe('y=e^x', () => {
        const exp: DiffyQ.DifferentialEquation = new DiffyQ.DifferentialEquation((t, x) => x, 1);
        const data: DiffyQ.Step[] = exp.solve(1e-3, 4);
        const last: DiffyQ.Step = data[data.length - 1];
        const e4: number = Math.E ** 4;
        it('check solution', () => {
            assert.strictEqual(data.length, 4e3 + 2);
            assert.strictEqual(last.time, 4);
            assert.ok(SMath.approx(last.dx[0], e4, 0.5));
            assert.ok(SMath.approx(last.dx[1], e4, 0.5));
        });
        it('make sure that all orders exist', () => {
            for (const point of data) {
                assert.strictEqual(point.dx.length, 2);
            }
        });
        it('make sure that x = dx', () => {
            for (let i = 1; i < data.length; i++) {
                assert.strictEqual(data[i - 1].dx[0], data[i].dx[1]);
            }
        });
        it('continue solution', () => {
            assert.throws(() => exp.solve(0, 5), /timestep must be positive/i);
            assert.throws(() => exp.solve(1e-2, 4), /final time must be in the future/i);
            const data2: DiffyQ.Step[] = exp.solve(1e-2, 5);
            const e5: number = Math.E ** 5;
            assert.strictEqual(data2.length, 4e3 + 2 + 1e2 + 1);
            assert.strictEqual(data2[data2.length - 1].time, 5);
            assert.ok(SMath.approx(data2[data2.length - 1].dx[0], e5, 5));
            assert.ok(SMath.approx(data2[data2.length - 1].dx[1], e5, 5));
        });
    });

    describe('mass-spring-damper', () => {
        const m = 10;
        const b = 1;
        const k = 1;
        const F: DiffyQ.Equation = (t) => 1 / (t + 1);
        const a: DiffyQ.Equation = (t, x, v) => (F(t) - b * v - k * x) / m;
        const msd: DiffyQ.DifferentialEquation = new DiffyQ.DifferentialEquation(a, 0, 0);
        const data: DiffyQ.Step[] = msd.solve(0.1, 100);
        it('check timestamps', () => {
            assert.strictEqual(data.length, 1e3 + 2);
            assert.strictEqual(data[0].time, 0);
            assert.strictEqual(data[data.length - 1].time, 100);
        });
        it('check solution', () => {
            for (const pt of data) {
                assert.ok(Math.abs(pt.dx[0]) < 1);
                assert.ok(Math.abs(pt.dx[1]) < 1);
                assert.ok(Math.abs(pt.dx[2]) < 1);
            }
        });
    });
});

describe('differential system', () => {
    describe('lorenz attractor', () => {
        const sigma = 1;
        const rho = 1;
        const beta = 8 / 3;
        /* eslint @typescript-eslint/no-unused-vars: 0 */
        const dx: DiffyQ.Equation = (t, x, y, z) => sigma * (y - x);
        const dy: DiffyQ.Equation = (t, x, y, z) => x * (rho - z) - y;
        const dz: DiffyQ.Equation = (t, x, y, z) => x * y - beta * z;
        const system: DiffyQ.DifferentialSystem = new DiffyQ.DifferentialSystem(3);
        system.setEquationFor(0, dx, 10);
        system.setEquationFor(1, dy, 10);
        system.setEquationFor(2, dz, 10);
        const data: DiffyQ.Step[][] = system.solve(1e-3, 4);
        it('check timestamps', () => {
            assert.strictEqual(data[0][0].time, 0);
            assert.strictEqual(data[0][data[0].length - 1].time, 4);
            assert.strictEqual(data[0].length, 4e3 + 2);
            for (let i = 0; i < data[0].length; i++) {
                assert.strictEqual(data[0][i].time, data[1][i].time);
                assert.strictEqual(data[0][i].time, data[2][i].time);
            }
        });
        it('check x,y,z bounds', () => {
            for (let i = 0; i < data[0].length; i++) {
                assert.ok(data[0][i].dx[0] < 30);
                assert.ok(data[1][i].dx[0] < 30);
                assert.ok(data[2][i].dx[0] < 30);
            }
        });
        it('fail when unset', () => {
            assert.throws(() => new DiffyQ.DifferentialSystem(3).solve(0, 0), /not been assigned/i);
        });
        it('fail when set', () => {
            assert.throws(() => system.setEquationFor(0, dx, 0), /has already been set/i);
        });
        it('continue solution', () => {
            assert.throws(() => system.solve(0, 5), /timestep must be positive/i);
            assert.throws(() => system.solve(1e-2, 4), /final time must be in the future/i);
            const data2: DiffyQ.Step[][] = system.solve(1e-2, 5);
            const lastX: DiffyQ.Step = data2[0][data2[0].length - 1];
            assert.strictEqual(data2[0].length, 4e3 + 2 + 1e2 + 1);
            assert.strictEqual(lastX.time, 5);
            assert.ok(lastX.dx[0] < 30);
            assert.ok(lastX.dx[0] > -30);
        });
    });
});
