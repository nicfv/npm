import { X } from 'exray';
import { Dim, Dimension } from './dimension';
import { Unit, UoM } from './unit';

{
    const velocity: Dimension = Dim({ length: 1, time: -1 }),
        distance: Dimension = Dim({ length: 1 }),
        time: Dimension = Dim({ time: 1 });
    X.eq(velocity.getExponent('length'), 1);
    X.eq(velocity.getExponent('current'), 0);
    X.eq(velocity.getNonzeroExponents().length, 2);
    X.true(velocity.is(distance.mult(time, -1)));
    X.false(velocity.is(distance.mult(time, 1)));
    X.is(velocity.toString(), '\\frac{\\textbf{L}}{\\textbf{T}}')
}

{
    const meters_per_second: Unit = UoM({ meter: 1, second: -1 }),
        miles_per_hour: Unit = UoM({ mile: 1, hour: -1 });
    X.true(meters_per_second.dimension.is(miles_per_hour.dimension));
    X.false(meters_per_second.is(miles_per_hour));
    X.eq(meters_per_second.getNonzeroExponents().length, 2);
    X.eq(meters_per_second.getExponent('meter'), 1);
    X.eq(meters_per_second.getExponent('day'), 0);
    X.is(meters_per_second.toString(), '\\frac{\\text{m}}{\\text{s}}');
}