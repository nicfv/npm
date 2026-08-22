import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import * as SMath from 'smath';
import { Pumpchart } from './index.js';
import { f, zero } from './pumpchart/lib.js';
import { FlowUnits, HeadUnits, PowerUnits, SpeedUnits } from './pumpchart/units.js';

describe('pumpchart static methods', () => {
    it('get units', () => {
        assert.strictEqual(Pumpchart.getFlowUnits().length, Object.entries(FlowUnits).length);
        assert.strictEqual(Pumpchart.getHeadUnits().length, Object.entries(HeadUnits).length);
        assert.strictEqual(Pumpchart.getPowerUnits().length, Object.entries(PowerUnits).length);
        assert.strictEqual(Pumpchart.getSpeedUnits().length, Object.entries(SpeedUnits).length);
    });
});

describe('zero', () => {
    const f1: f = x => x * x - 9; // Has 2 solutions
    const f2: f = x => x * x * x - 64;

    it('should find the zeroes for the functions', () => {
        assert.ok(SMath.approx(zero(f1, 0, 10), 3));
        assert.ok(SMath.approx(zero(f1, 0, -10), -3));
        assert.ok(SMath.approx(zero(f2, 0, 10), 4));
        assert.ok(SMath.approx(zero(f2, 0, 4), 4));
        assert.ok(SMath.approx(zero(f2, 4, 0), 4));
    });

    it('no zeros in this range', () => {
        assert.throws(() => zero(f1, -5, -4), /a solution cannot be found/i);
        assert.throws(() => zero(f2, -5, -10), /a solution cannot be found/i);
    });

    it('two zeros in this range', () => {
        assert.throws(() => zero(f1, -5, 5), /a solution cannot be found/i); // Cannot find both solutions at once
    });

    it('bad domain for function', () => {
        assert.throws(() => zero(Math.log, -1, 10), 'f(-1) is NaN');
    });

    it('generic math functions', () => {
        assert.ok(SMath.approx(zero(Math.sin, 1, 5), Math.PI), 'sin');
        assert.ok(SMath.approx(zero(Math.cos, 0, 4), Math.PI / 2), 'cos');
        assert.ok(SMath.approx(zero(Math.log, 0, 10), 1), 'log');
    });
});
