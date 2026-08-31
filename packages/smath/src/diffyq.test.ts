import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DiffyQ, SMath } from './index.js';

describe('differential equation', () => {
    describe('y=e^x', () => {
        const exp: DiffyQ.DifferentialEquation = new DiffyQ.DifferentialEquation((t, x) => x, 1);
        const data: DiffyQ.Step[] = exp.solve(1e-3, 4);
        const last: DiffyQ.Step = data[data.length - 1];
        const e4: number = Math.E ** 4;
        console.log(last, e4);
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
                if (!(i % 1e3)) {
                    console.log(data[0][i], data[1][i], data[2][i]);
                }
                assert.ok(data[0][i].dx[0] < 30);
                assert.ok(data[1][i].dx[0] < 30);
                assert.ok(data[2][i].dx[0] < 30);
            }
        });
    });
});
