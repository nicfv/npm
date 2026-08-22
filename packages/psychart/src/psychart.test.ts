import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Psychart } from './index.js';
import { defaultOptions, regions } from './psychart/defaults.js';
import { PsyState } from './psychart/psystate.js';

describe('psychart static methods', () => {
    it('get region names and tips', () => {
        assert.strictEqual(Psychart.getRegionNamesAndTips().length, Object.entries(regions).length);
    });
});

describe('psystate', () => {
    describe('error catching', () => {
        it('rh out of bounds', () => {
            assert.throws(() => new PsyState({ db: 70, other: 1.60, measurement: 'dbrh' }, defaultOptions), /bounds/i);
            assert.throws(() => new PsyState({ db: 70, other: -0.60, measurement: 'dbrh' }, defaultOptions), /bounds/i);
        });

        it('wb > db', () => {
            assert.throws(() => new PsyState({ db: 70, other: 80, measurement: 'dbwb' }, defaultOptions), /bulb/i);
            assert.throws(() => new PsyState({ db: 50, other: 51, measurement: 'dbwb' }, defaultOptions), /bulb/i);
        });

        it('invalid hr', () => {
            assert.throws(() => new PsyState({ db: 60, other: -10e-3, measurement: 'dbhr' }, defaultOptions), /ratio/i);
            assert.throws(() => new PsyState({ db: 60, other: 20e-3, measurement: 'dbhr' }, defaultOptions), /ratio/i);
        });

        it('valid hr', () => {
            assert.ok(new PsyState({ db: 60, other: 10e-3, measurement: 'dbhr' }, defaultOptions));
        });

        it('invalid enthalpy', () => {
            assert.throws(() => new PsyState({ db: 60, other: 10, measurement: 'dbh' }, defaultOptions), /ratio/i);
            assert.throws(() => new PsyState({ db: 60, other: 30, measurement: 'dbh' }, defaultOptions), /ratio/i);
        });

        it('valid enthalpy', () => {
            assert.ok(new PsyState({ db: 60, other: 20, measurement: 'dbh' }, defaultOptions));
        });
    });

    describe('valid psystate', () => {
        it('test', () => {
            // We will not be testing the accuracy of psychrolib, but will make sure that PsyState computes.
            const ps1: PsyState = new PsyState({ db: 70, other: 0.50, measurement: 'dbrh' }, defaultOptions);
            assert.strictEqual(ps1.db, 70);
            assert.strictEqual(ps1.rh, 0.50);
            // Just make sure that values are greater than zero.
            assert.ok(ps1.dp > 0);
            assert.ok(ps1.h > 0);
            assert.ok(ps1.hr > 0);
            assert.ok(ps1.s > 0);
            assert.ok(ps1.v > 0);
            assert.ok(ps1.vp > 0);
            assert.ok(ps1.wb > 0);
            const xy = ps1.toXY();
            assert.ok(xy.x > 0);
            assert.ok(xy.y > 0);
        });
    });
});
