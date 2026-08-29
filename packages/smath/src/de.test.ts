import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DifferentialEquation, SMath } from './index.js';

describe('differential equations', () => {
    it('should solve y=e^x', () => {
        const exp: DifferentialEquation = new DifferentialEquation((_t, x) => x, 1);
        exp.solve(1e-3, 4);
        const t: number[] = exp.getTimeArray();
        const y: number[] = exp.getNthDerivative(0);
        const e4: number = Math.E ** 4;
        assert.equal(t.length, y.length);
        assert.ok(SMath.approx(t[t.length - 1], 4, 0.1));
        assert.ok(SMath.approx(y[y.length - 1], e4, 0.5));
    });
});
