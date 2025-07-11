import { T6 } from 't6';
import { A, D, Q, U } from './lib';

{
    const velocity = D({ length: 1, time: -1 }),
        distance = D('length'),
        time = D('time');
    T6.eq(velocity.getExponent('length'), 1);
    T6.eq(velocity.getExponent('current'), 0);
    T6.eq(velocity.getNonzeroExponents().length, 2);
    T6.isTrue(velocity.is(distance.mult(time, -1)));
    T6.isFalse(velocity.is(distance.mult(time, 1)));
    T6.is(velocity.toString(), '\\frac{\\textbf{L}}{\\textbf{T}}');
    T6.isFalse(velocity.isBase);
    T6.isTrue(distance.isBase);
    T6.isTrue(time.isBase);
}

{
    const velocity1 = A('velocity'),
        velocity2 = A({ length: 1, time: -1 }),
        velocity3 = A({ length: 1 }).mult(A({ time: -1 }), 1),
        velocity4 = A('length').mult(A('time'), -1),
        velocity5 = velocity4.simplify();
    T6.isTrue(velocity1.dimension.is(velocity2.dimension));
    T6.isTrue(velocity1.dimension.is(velocity3.dimension));
    T6.isTrue(velocity1.dimension.is(velocity4.dimension));
    T6.isFalse(velocity1.is(velocity2));
    T6.isTrue(velocity2.is(velocity3));
    T6.isTrue(velocity3.is(velocity4));
    T6.isFalse(velocity4.is(velocity5));
    T6.isTrue(velocity1.is(velocity5));
    T6.isTrue(velocity5.simplify().simplify().is(velocity1));
    T6.is(velocity1.toString(), 'v');
    T6.is(velocity2.toString(), '\\frac{x}{t}');
    T6.is(velocity2.toString(), velocity3.toString());
    T6.eq(velocity1.getNonzeroExponents().length, 1);
    T6.eq(velocity1.getExponent('velocity'), 1);
    T6.eq(velocity1.getExponent('length'), 0);
    T6.eq(velocity2.getNonzeroExponents().length, 2);
    T6.eq(velocity2.getExponent('velocity'), 0);
    T6.eq(velocity2.getExponent('length'), 1);
    T6.eq(velocity2.getExponent('time'), -1);
    T6.is(velocity1.getName()!, 'velocity');
    T6.is(velocity2.getName()!, 'velocity');
    T6.is(velocity3.getName()!, 'velocity');
    T6.is(velocity4.getName()!, 'velocity');
    T6.is(velocity5.getName()!, 'velocity');
}

{
    const energy1 = A({ length: 1, time: -1 }).mult(A({ mass: 1, velocity: 1 }), 1),
        energy2 = A({ force: 1, length: 1 }),
        energy3 = A('energy');
    T6.isFalse(energy1.is(energy2));
    T6.isFalse(energy2.is(energy3));
    T6.isFalse(energy1.is(energy3));
    T6.isTrue(energy1.dimension.is(energy2.dimension));
    T6.isTrue(energy1.dimension.is(energy3.dimension));
    T6.eq(energy1.getNonzeroExponents().length, 4);
    T6.eq(energy2.getNonzeroExponents().length, 2);
    T6.eq(energy3.getNonzeroExponents().length, 1);
    T6.is(energy1.getName()!, 'energy');
    T6.not(energy1.toString(), 'E');
    T6.is(energy1.simplify().toString(), 'E');
    T6.not(energy2.toString(), 'E');
    T6.is(energy2.simplify().toString(), 'E');
    T6.is(energy3.toString(), 'E');
    T6.is(energy3.simplify().toString(), 'E');
}

{
    const meters_per_second = U({ meter: 1, second: -1 }),
        miles_per_hour = U({ mile: 1, hour: -1 });
    T6.isFalse(meters_per_second.is(miles_per_hour));
    T6.isTrue(meters_per_second.attribute.is(miles_per_hour.attribute));
    T6.isTrue(meters_per_second.attribute.dimension.is(miles_per_hour.attribute.dimension));
    T6.gt(miles_per_hour.scale, 0.44); // 0.447...
    T6.lt(miles_per_hour.scale, 0.45);
    T6.eq(meters_per_second.getNonzeroExponents().length, 2);
    T6.eq(meters_per_second.getExponent('meter'), 1);
    T6.eq(meters_per_second.getExponent('day'), 0);
    T6.is(meters_per_second.toString(), '\\frac{\\text{m}}{\\text{s}}');
    T6.is(meters_per_second.attribute.toString(), 'v');
    T6.is(meters_per_second.attribute.getName()!, 'velocity');
}

{
    const kN = U('kiloNewton'),
        kg_m_s2 = U({ kilogram: 1, meter: 1, second: -2 }),
        lbf = U('pound_force');
    T6.isTrue(kN.attribute.dimension.is(kg_m_s2.attribute.dimension));
    T6.isFalse(kN.is(kg_m_s2));
    T6.eq(kN.getNonzeroExponents().length, 1);
    T6.eq(kN.getExponent('kiloNewton'), 1);
    T6.eq(kN.getExponent('Newton'), 0);
    T6.eq(kN.scale / kg_m_s2.scale, 1000);
    T6.is(kN.toString(), '\\text{k} \\text{N}');
    T6.isTrue(kN.attribute.dimension.is(lbf.attribute.dimension));
    T6.gt(lbf.scale / kg_m_s2.scale, 4.44);// 4.448...
    T6.lt(lbf.scale / kg_m_s2.scale, 4.45);
    T6.is(lbf.attribute.dimension.toString(), '\\frac{\\textbf{M} \\cdot \\textbf{L}}{\\textbf{T}^{2}}');
    T6.is(lbf.attribute.toString(), 'F');
    T6.is(lbf.attribute.getName()!, 'force');
    T6.eq(lbf.attribute.getNonzeroExponents().length, 1);
}

{
    const force_ma = U({ kilogram: 1 }).mult(U({ meter: 1, second: -2 }), 1),
        force1 = U({ kilogram: 1, meter: 1, second: -2 }),
        force2 = U({ Newton: 1 });
    T6.is(force_ma.attribute.toString(), 'm \\cdot a');
    T6.is(force1.attribute.toString(), 'F');
    T6.is(force2.attribute.toString(), 'F');
    T6.is(force_ma.mult(U({ foot: 1, minute: -2 }), -1).attribute.toString(), 'm');
}

{
    const speed_limit_mph = Q(60, U({ mile: 1, hour: -1 })),
        tolerance = Q(1, U({ meter: 1, second: -1 }));
    T6.isTrue(speed_limit_mph.is(tolerance));
    T6.isFalse(speed_limit_mph.pow(0.5).is(tolerance));
    T6.gt(speed_limit_mph.plus(tolerance).value, 62.23); // 62.236936...
    T6.lt(speed_limit_mph.plus(tolerance).value, 62.24);
    T6.eq(speed_limit_mph.plus(tolerance).unit.getExponent('mile'), 1);
    T6.eq(speed_limit_mph.plus(tolerance).unit.getExponent('hour'), -1);
    T6.eq(speed_limit_mph.plus(tolerance).unit.getExponent('meter'), 0);
    T6.eq(speed_limit_mph.plus(tolerance).unit.getExponent('second'), 0);
    T6.gt(speed_limit_mph.minus(tolerance).value, 57.76); // 57.763...
    T6.lt(speed_limit_mph.minus(tolerance).value, 57.77);
    T6.eq(speed_limit_mph.minus(tolerance).unit.getExponent('mile'), 1);
    T6.eq(speed_limit_mph.minus(tolerance).unit.getExponent('hour'), -1);
    T6.eq(speed_limit_mph.minus(tolerance).unit.getExponent('meter'), 0);
    T6.eq(speed_limit_mph.minus(tolerance).unit.getExponent('second'), 0);
    T6.eq(speed_limit_mph.scale(2).value, 120);
    T6.eq(speed_limit_mph.scale(0.5).value, 30);
    T6.eq(speed_limit_mph.pow(2).value, 3600);
    T6.is(speed_limit_mph.pow(2).unit.toString(), '\\frac{\\text{mi}^{2}}{\\text{h}^{2}}');
    T6.eq(speed_limit_mph.times(tolerance.scale(2)).value, 120);
    T6.eq(speed_limit_mph.times(tolerance.scale(2)).unit.getExponent('mile'), 1);
    T6.eq(speed_limit_mph.times(tolerance.scale(2)).unit.getExponent('hour'), -1);
    T6.eq(speed_limit_mph.times(tolerance.scale(2)).unit.getExponent('meter'), 1);
    T6.eq(speed_limit_mph.times(tolerance.scale(2)).unit.getExponent('second'), -1);
    T6.eq(speed_limit_mph.over(tolerance.scale(2)).value, 30);
    T6.eq(speed_limit_mph.over(tolerance.scale(2)).unit.getExponent('mile'), 1);
    T6.eq(speed_limit_mph.over(tolerance.scale(2)).unit.getExponent('hour'), -1);
    T6.eq(speed_limit_mph.over(tolerance.scale(2)).unit.getExponent('meter'), -1);
    T6.eq(speed_limit_mph.over(tolerance.scale(2)).unit.getExponent('second'), 1);
    T6.gt(speed_limit_mph.as(U({ meter: 1, second: -1 })).value, 26.82); // 26.8224...
    T6.lt(speed_limit_mph.as(U({ meter: 1, second: -1 })).value, 26.83);
    T6.is(speed_limit_mph.toString(), '60 \\left[\\frac{\\text{mi}}{\\text{h}}\\right]');
}

{
    const degR = Q(460 + 32, U('Rankine')); // About freezing temperature
    T6.eq(degR.value, 492);
    T6.eq(degR.unit.getExponent('Rankine'), 1);
    T6.eq(degR.unit.attribute.getExponent('temperature'), 1);
    T6.eq(degR.unit.attribute.dimension.getExponent('temperature'), 1);
    T6.gt(degR.as(U({ Kelvin: 1 })).value, 273); // 273.333...
    T6.lt(degR.as(U({ Kelvin: 1 })).value, 274);
    T6.gt(degR.as(U({ Fahrenheight_delta: 1 })).value, 491.9); // To allow for small error
    T6.lt(degR.as(U({ Fahrenheight_delta: 1 })).value, 492.1);
}