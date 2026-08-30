import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DifferentialEquation, SMath, Timeseries } from './index.js';

describe('differential equations', () => {
    it('should solve y=e^x', () => {
        const exp: DifferentialEquation = new DifferentialEquation(1);
        exp.set(() => exp.d(0), 1);
        exp.solve(1e-3, 4);
        const e4: number = Math.E ** 4;
        const data: Timeseries<number>[] = exp.getTimeseries();
        const last: Timeseries<number> = data[data.length - 1];
        assert.equal(data.length, 4e3 + 2);
        assert.ok(SMath.approx(last.time, 4, 0.01));
        assert.ok(SMath.approx(last.data, e4, 0.1));
        console.log(last, e4);
    });
});
