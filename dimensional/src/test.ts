import { X } from 'exray';
import { D, Dimension } from './dimension';
import { U, Unit } from './unit';

{
    const velocity: Dimension = D({ length: 1, time: -1 }),
        distance: Dimension = D({ length: 1 }),
        time: Dimension = D({ time: 1 });
    X.eq(velocity.getExponent('length'), 1);
    X.eq(velocity.getExponent('current'), 0);
    X.eq(velocity.getNonzeroExponents().length, 2);
    X.true(velocity.is(distance.mult(time, -1)));
    X.false(velocity.is(distance.mult(time, 1)));
    X.is(velocity.toString(), '\\frac{\\textbf{L}}{\\textbf{T}}')
}

{
    const meters_per_second: Unit = U({ meter: 1, second: -1 }),
        miles_per_hour: Unit = U({ mile: 1, hour: -1 });
    X.true(meters_per_second.dimension.is(miles_per_hour.dimension));
    X.false(meters_per_second.is(miles_per_hour));
    X.eq(meters_per_second.getNonzeroExponents().length, 2);
    X.eq(meters_per_second.getExponent('meter'), 1);
    X.eq(meters_per_second.getExponent('day'), 0);
    X.is(meters_per_second.toString(), '\\frac{\\text{m}}{\\text{s}}');
}

{
    const kN: Unit = U({ kiloNewton: 1 }),
        kg_m_s2: Unit = U({ kilogram: 1, meter: 1, second: -2 });
    X.true(kN.dimension.is(kg_m_s2.dimension));
    X.false(kN.is(kg_m_s2));
    X.eq(kN.getNonzeroExponents().length, 1);
    X.eq(kN.getExponent('kiloNewton'), 1);
    X.eq(kN.getExponent('Newton'), 0);
    X.eq(kN.scale, 1000);
    X.is(kN.toString(), '\\text{kN}');
}