import * as T6 from 't6';
import { Psychart } from '.';
import { defaultPsychartOptions, regions, setDefaults } from './psychart/defaults';
import { PsyState } from './psychart/psystate';

{
    const template = { a: 'alpha', b: 'bravo' },
        dirty = { a: 'test', c: 'charlie' },
        clean = setDefaults(dirty, template);
    T6.is(JSON.stringify(clean), '{"a":"test","b":"bravo"}');
    T6.is(JSON.stringify(setDefaults({}, template)), '{"a":"alpha","b":"bravo"}');
    T6.is(JSON.stringify(setDefaults(dirty, {})), '{}');
}

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
