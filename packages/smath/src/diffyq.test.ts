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
            assert.equal(data.length, 4e3 + 2);
            assert.equal(last.time, 4);
            assert.ok(SMath.approx(last.dx[0], e4, 0.5));
            assert.ok(SMath.approx(last.dx[1], e4, 0.5));
        });
        it('make sure that all orders exist', () => {
            for (const point of data) {
                assert.equal(point.dx.length, 2);
            }
        });
        it('make sure that x = dx', () => {
            for (let i = 1; i < data.length; i++) {
                assert.equal(data[i - 1].dx[0], data[i].dx[1]);
            }
        });
    });
});
