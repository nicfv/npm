import { X } from 'exray';
import { D, Q, U } from './lib';

{
    const velocity = D({ length: 1, time: -1 }),
        distance = D({ length: 1 }),
        time = D({ time: 1 });
    X.eq(velocity.getExponent('length'), 1);
    X.eq(velocity.getExponent('current'), 0);
    X.eq(velocity.getNonzeroExponents().length, 2);
    X.isTrue(velocity.is(distance.mult(time, -1)));
    X.isFalse(velocity.is(distance.mult(time, 1)));
    X.is(velocity.toString(), '\\frac{\\textbf{L}}{\\textbf{T}}')
}

{
    const meters_per_second = U({ meter: 1, second: -1 }),
        miles_per_hour = U({ mile: 1, hour: -1 });
    X.isTrue(meters_per_second.dimension.is(miles_per_hour.dimension));
    X.isFalse(meters_per_second.is(miles_per_hour));
    X.gt(miles_per_hour.scale, 0.44); // 0.447...
    X.lt(miles_per_hour.scale, 0.45);
    X.eq(meters_per_second.getNonzeroExponents().length, 2);
    X.eq(meters_per_second.getExponent('meter'), 1);
    X.eq(meters_per_second.getExponent('day'), 0);
    X.is(meters_per_second.toString(), '\\frac{\\text{m}}{\\text{s}}');
}

{
    const kN = U({ kiloNewton: 1 }),
        kg_m_s2 = U({ kilogram: 1, meter: 1, second: -2 }),
        lbf = U({ pound_force: 1 });
    X.isTrue(kN.dimension.is(kg_m_s2.dimension));
    X.isFalse(kN.is(kg_m_s2));
    X.eq(kN.getNonzeroExponents().length, 1);
    X.eq(kN.getExponent('kiloNewton'), 1);
    X.eq(kN.getExponent('Newton'), 0);
    X.eq(kN.scale / kg_m_s2.scale, 1000);
    X.is(kN.toString(), '\\text{k} \\text{N}');
    X.isTrue(kN.dimension.is(lbf.dimension));
    X.gt(lbf.scale / kg_m_s2.scale, 4.44);// 4.448...
    X.lt(lbf.scale / kg_m_s2.scale, 4.45);
    X.is(lbf.dimension.toString(), '\\frac{\\textbf{M} \\cdot \\textbf{L}}{\\textbf{T}^{2}}')
}

{
    const speed_limit_mph = Q(60, U({ mile: 1, hour: -1 })),
        tolerance = Q(1, U({ meter: 1, second: -1 }));
    X.isTrue(speed_limit_mph.is(tolerance));
    X.isFalse(speed_limit_mph.pow(0.5).is(tolerance));
    X.gt(speed_limit_mph.plus(tolerance).value, 62.23); // 62.236936...
    X.lt(speed_limit_mph.plus(tolerance).value, 62.24);
    X.eq(speed_limit_mph.plus(tolerance).unit.getExponent('mile'), 1);
    X.eq(speed_limit_mph.plus(tolerance).unit.getExponent('hour'), -1);
    X.eq(speed_limit_mph.plus(tolerance).unit.getExponent('meter'), 0);
    X.eq(speed_limit_mph.plus(tolerance).unit.getExponent('second'), 0);
    X.gt(speed_limit_mph.minus(tolerance).value, 57.76); // 57.763...
    X.lt(speed_limit_mph.minus(tolerance).value, 57.77);
    X.eq(speed_limit_mph.minus(tolerance).unit.getExponent('mile'), 1);
    X.eq(speed_limit_mph.minus(tolerance).unit.getExponent('hour'), -1);
    X.eq(speed_limit_mph.minus(tolerance).unit.getExponent('meter'), 0);
    X.eq(speed_limit_mph.minus(tolerance).unit.getExponent('second'), 0);
    X.eq(speed_limit_mph.scale(2).value, 120);
    X.eq(speed_limit_mph.scale(0.5).value, 30);
    X.eq(speed_limit_mph.pow(2).value, 3600);
    X.is(speed_limit_mph.pow(2).unit.toString(), '\\frac{\\text{mi}^{2}}{\\text{h}^{2}}');
    X.eq(speed_limit_mph.times(tolerance.scale(2)).value, 120);
    X.eq(speed_limit_mph.times(tolerance.scale(2)).unit.getExponent('mile'), 1);
    X.eq(speed_limit_mph.times(tolerance.scale(2)).unit.getExponent('hour'), -1);
    X.eq(speed_limit_mph.times(tolerance.scale(2)).unit.getExponent('meter'), 1);
    X.eq(speed_limit_mph.times(tolerance.scale(2)).unit.getExponent('second'), -1);
    X.eq(speed_limit_mph.over(tolerance.scale(2)).value, 30);
    X.eq(speed_limit_mph.over(tolerance.scale(2)).unit.getExponent('mile'), 1);
    X.eq(speed_limit_mph.over(tolerance.scale(2)).unit.getExponent('hour'), -1);
    X.eq(speed_limit_mph.over(tolerance.scale(2)).unit.getExponent('meter'), -1);
    X.eq(speed_limit_mph.over(tolerance.scale(2)).unit.getExponent('second'), 1);
    X.gt(speed_limit_mph.as(U({ meter: 1, second: -1 })).value, 26.82); // 26.8224...
    X.lt(speed_limit_mph.as(U({ meter: 1, second: -1 })).value, 26.83);
    X.is(speed_limit_mph.toString(), '60 \\left[\\frac{\\text{mi}}{\\text{h}}\\right]');
    console.log(speed_limit_mph.plus(tolerance).toString());
}