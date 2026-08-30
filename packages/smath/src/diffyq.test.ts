import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DiffyQ, SMath } from './index.js';

describe('differential equations', () => {
    it('should solve y=e^x', () => {
        const exp: DiffyQ.DifferentialEquation = new DiffyQ.DifferentialEquation((t, x) => x, 1);
        const data: DiffyQ.Step[] = exp.solve(1e-3, 4);
        const last: DiffyQ.Step = data[data.length - 1];
        const e4: number = Math.E ** 4;
        console.log(last, e4);
        assert.equal(data.length, 4e3 + 2);
        assert.equal(last.time, 4);
        assert.ok(SMath.approx(last.dx[0], e4, 0.5));
        assert.ok(SMath.approx(last.dx[1], e4, 0.5));
    });
});
