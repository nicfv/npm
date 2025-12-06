import * as T6 from 't6';
import * as SMath from 'smath';
import { Psychart } from '.';
import { defaultPsychartOptions, regions } from './psychart/defaults';
import { PsyState } from './psychart/psystate';
import { f, toFunction, zero } from './pumpchart/lib';

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
    const f1: f = x => x * x - 9; // Has 2 solutions
    T6.isTrue(SMath.approx(zero(f1, 0, 10), 3));
    T6.isTrue(SMath.approx(zero(f1, 0, -10), -3));
    const f2: f = x => x * x * x - 64;
    T6.isTrue(SMath.approx(zero(f2, 0, 10), 4));
    T6.isTrue(SMath.approx(zero(f2, 0, 4), 4));
    T6.isTrue(SMath.approx(zero(f2, 4, 0), 4));
    let caught: boolean;
    let message: string;
    caught = false;
    message = '';
    try {
        zero(f1, -5, -4);
    } catch (e) {
        caught = true;
        message = (e as Error).message;
    }
    T6.isTrue(caught, 'Did not catch f1 [-5, -4]');
    T6.is(message, 'A solution cannot be found.');
    caught = false;
    message = '';
    try {
        zero(f1, -5, 5); // Cannot find both solutions at once
    } catch (e) {
        caught = true;
        message = (e as Error).message;
    }
    T6.isTrue(caught, 'Did not catch f1 [-5, 5]');
    T6.is(message, 'A solution cannot be found.');
    caught = false;
    message = '';
    try {
        zero(f2, -5, -10);
    } catch (e) {
        caught = true;
        message = (e as Error).message;
    }
    T6.isTrue(caught, 'Did not catch f2');
    T6.is(message, 'A solution cannot be found.');
    T6.isTrue(SMath.approx(zero(Math.sin, 1, 5), Math.PI), 'sin');
    T6.isTrue(SMath.approx(zero(Math.cos, 0, 4), Math.PI / 2), 'cos');
    T6.isTrue(SMath.approx(zero(Math.log, 0, 10), 1), 'log');
    caught = false;
    message = '';
    try {
        zero(Math.log, -1, 10); // Bad domain
    } catch (e) {
        caught = true;
        message = (e as Error).message;
    }
    T6.isTrue(caught, 'Did not catch log(-1)');
    T6.is(message, 'f(-1) is NaN');
}

{
    const f1: f = toFunction('x^2-1', 'x');
    const g1: f = x => x * x - 1;
    for (const i of SMath.linspace(-10, 10, 5)) {
        T6.eq(f1(i), g1(i), `f1(${i}) = ${f1(i)}; g1(${i}) = ${g1(i)}`);
    }
    const f2: f = toFunction('5*(2 - 4y + (y/3)^2)', 'y');
    const g2: f = x => 5 * (2 - 4 * x + (x / 3) ** 2);
    for (const i of SMath.linspace(-10, 10, 5)) {
        T6.eq(f2(i), g2(i));
    }
    const f3: f = toFunction('4test/5  +  test', 'test');
    const g3: f = x => 1.8 * x;
    for (const i of SMath.linspace(-10, 10, 5)) {
        T6.eq(f3(i), g3(i));
    }
    let caught: boolean;
    caught = false;
    try {
        toFunction('', 'hello');
    } catch {
        caught = true;
    }
    T6.isTrue(caught); // Empty
    caught = false;
    try {
        toFunction('hello!', 'hello');
    } catch {
        caught = true;
    }
    T6.isTrue(caught); // Illegal chars
    caught = false;
    try {
        toFunction('5hello', 'hello');
    } catch {
        caught = true;
    }
    T6.isFalse(caught); // Valid function (5 * hello)
    caught = false;
    try {
        toFunction('hello5', 'hello');
    } catch {
        caught = true;
    }
    T6.isFalse(caught); // Does not catch because no illegal chars
}