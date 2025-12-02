import * as T6 from 't6';
import * as SMath from 'smath';
import { Psychart } from '.';
import { defaultPsychartOptions, regions } from './psychart/defaults';
import { PsyState } from './psychart/psystate';
import { zero } from './pumpchart/lib';

T6.eq(Psychart.getRegionNamesAndTips().length, Object.entries(regions).length);

{
    let caught: boolean;

    caught = false;
    try {
        new PsyState({ db: 70, other: 1.60, measurement: 'dbrh' }, defaultPsychartOptions);
    } catch {
        caught = true;
    }
    T6.isTrue(caught, 'Uncaught RH was out of bounds.');

    caught = false;
    try {
        new PsyState({ db: 70, other: -0.60, measurement: 'dbrh' }, defaultPsychartOptions);
    } catch {
        caught = true;
    }
    T6.isTrue(caught, 'Uncaught RH was out of bounds.');

    caught = false;
    try {
        new PsyState({ db: 70, other: 80, measurement: 'dbwb' }, defaultPsychartOptions);
    } catch {
        caught = true;
    }
    T6.isTrue(caught, 'Uncaught wb > db.');

    // We will not be testing the accuracy of psychrolib, but will make sure that PsyState computes.
    const ps1: PsyState = new PsyState({ db: 70, other: 0.50, measurement: 'dbrh' }, defaultPsychartOptions);
    T6.eq(ps1.db, 70);
    T6.eq(ps1.rh, 0.50);
    // Just make sure that values are greater than zero.
    T6.gt(ps1.dp, 0);
    T6.gt(ps1.h, 0);
    T6.gt(ps1.hr, 0);
    T6.gt(ps1.s, 0);
    T6.gt(ps1.v, 0);
    T6.gt(ps1.vp, 0);
    T6.gt(ps1.wb, 0);
    const xy = ps1.toXY();
    T6.gt(xy.x, 0);
    T6.gt(xy.y, 0);
}

{
    const f1 = (x: number) => x * x - 9; // Has 2 solutions
    T6.isTrue(SMath.approx(zero(f1, 0, 10), 3));
    T6.isTrue(SMath.approx(zero(f1, 0, -10), -3));
    const f2 = (x: number) => x * x * x - 64;
    T6.isTrue(SMath.approx(zero(f2, 0, 10), 4));
    T6.isTrue(SMath.approx(zero(f2, 0, 4), 4));
    T6.isTrue(SMath.approx(zero(f2, 4, 0), 4));
    let caught: boolean;
    caught = false;
    try {
        zero(f1, -5, -4);
    } catch {
        caught = true;
    }
    T6.isTrue(caught, 'Did not catch f1 [-5, -4]');
    caught = false;
    try {
        zero(f1, -5, 5); // Cannot find both solutions at once
    } catch {
        caught = true;
    }
    T6.isTrue(caught, 'Did not catch f1 [-5, 5]');
    caught = false;
    try {
        zero(f2, -5, -10);
    } catch {
        caught = true;
    }
    T6.isTrue(caught, 'Did not catch f2');
}