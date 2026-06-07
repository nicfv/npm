import * as T6 from 't6';
import { Psychart } from './index.js';
import { defaultOptions, regions } from './psychart/defaults.js';
import { PsyState } from './psychart/psystate.js';

T6.eq(Psychart.getRegionNamesAndTips().length, Object.entries(regions).length);

let caught: boolean;

caught = false;
try {
    new PsyState({ db: 70, other: 1.60, measurement: 'dbrh' }, defaultOptions);
} catch {
    caught = true;
}
T6.isTrue(caught, 'Uncaught RH was out of bounds.');

caught = false;
try {
    new PsyState({ db: 70, other: -0.60, measurement: 'dbrh' }, defaultOptions);
} catch {
    caught = true;
}
T6.isTrue(caught, 'Uncaught RH was out of bounds.');

caught = false;
try {
    new PsyState({ db: 70, other: 80, measurement: 'dbwb' }, defaultOptions);
} catch {
    caught = true;
}
T6.isTrue(caught, 'Uncaught wb > db.');

caught = false;
try {
    new PsyState({ db: 60, other: -10e-3, measurement: 'dbhr' }, defaultOptions);
} catch {
    caught = true;
}
T6.isTrue(caught, 'Uncaught invalid (low) humidity ratio');

caught = false;
try {
    new PsyState({ db: 60, other: 20e-3, measurement: 'dbhr' }, defaultOptions);
} catch {
    caught = true;
}
T6.isTrue(caught, 'Uncaught invalid (high) humidity ratio');

caught = false;
try {
    new PsyState({ db: 60, other: 10e-3, measurement: 'dbhr' }, defaultOptions);
} catch (e) {
    console.log(e);
    caught = true;
}
T6.isFalse(caught, 'Caught valid humidity ratio');

caught = false;
try {
    new PsyState({ db: 60, other: 10, measurement: 'dbh' }, defaultOptions);
} catch {
    caught = true;
}
T6.isTrue(caught, 'Uncaught invalid (low) enthalpy');

caught = false;
try {
    new PsyState({ db: 60, other: 30, measurement: 'dbh' }, defaultOptions);
} catch {
    caught = true;
}
T6.isTrue(caught, 'Uncaught invalid (high) enthalpy');

caught = false;
try {
    new PsyState({ db: 60, other: 20, measurement: 'dbh' }, defaultOptions);
} catch {
    caught = true;
}
T6.isFalse(caught, 'Caught valid enthalpy');

// We will not be testing the accuracy of psychrolib, but will make sure that PsyState computes.
const ps1: PsyState = new PsyState({ db: 70, other: 0.50, measurement: 'dbrh' }, defaultOptions);
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
