import { X } from 'exray';
import { D, M, Q, U } from './lib';

{
    const velocity = D({ length: 1, time: -1 }),
        distance = D('length'),
        time = D('time');
    X.eq(velocity.getExponent('length'), 1);
    X.eq(velocity.getExponent('current'), 0);
    X.eq(velocity.getNonzeroExponents().length, 2);
    X.isTrue(velocity.is(distance.mult(time, -1)));
    X.isFalse(velocity.is(distance.mult(time, 1)));
    X.is(velocity.toString(), '\\frac{\\textbf{L}}{\\textbf{T}}');
    X.isFalse(velocity.isBase);
    X.isTrue(distance.isBase);
    X.isTrue(time.isBase);
}

{
    const velocity1 = M('velocity'),
        velocity2 = M({ length: 1, time: -1 }),
        velocity3 = M({ length: 1 }).mult(M({ time: -1 }), 1),
        velocity4 = M('length').mult(M('time'), -1),
        velocity5 = velocity4.simplify();
    X.isTrue(velocity1.dimension.is(velocity2.dimension));
    X.isTrue(velocity1.dimension.is(velocity3.dimension));
    X.isTrue(velocity1.dimension.is(velocity4.dimension));
    X.isFalse(velocity1.is(velocity2));
    X.isTrue(velocity2.is(velocity3));
    X.isTrue(velocity3.is(velocity4));
    X.isFalse(velocity4.is(velocity5));
    X.isTrue(velocity1.is(velocity5));
    X.isTrue(velocity5.simplify().simplify().is(velocity1));
    X.is(velocity1.toString(), 'v');
    X.is(velocity2.toString(), '\\frac{x}{t}');
    X.is(velocity2.toString(), velocity3.toString());
    X.eq(velocity1.getNonzeroExponents().length, 1);
    X.eq(velocity1.getExponent('velocity'), 1);
    X.eq(velocity1.getExponent('length'), 0);
    X.eq(velocity2.getNonzeroExponents().length, 2);
    X.eq(velocity2.getExponent('velocity'), 0);
    X.eq(velocity2.getExponent('length'), 1);
    X.eq(velocity2.getExponent('time'), -1);
    X.is(velocity1.getName()!, 'velocity');
    X.is(velocity2.getName()!, 'velocity');
    X.is(velocity3.getName()!, 'velocity');
    X.is(velocity4.getName()!, 'velocity');
    X.is(velocity5.getName()!, 'velocity');
}

{
    const energy1 = M({ length: 1, time: -1 }).mult(M({ mass: 1, velocity: 1 }), 1),
        energy2 = M({ force: 1, length: 1 }),
        energy3 = M('energy');
    X.isFalse(energy1.is(energy2));
    X.isFalse(energy2.is(energy3));
    X.isFalse(energy1.is(energy3));
    X.isTrue(energy1.dimension.is(energy2.dimension));
    X.isTrue(energy1.dimension.is(energy3.dimension));
    X.eq(energy1.getNonzeroExponents().length, 4);
    X.eq(energy2.getNonzeroExponents().length, 2);
    X.eq(energy3.getNonzeroExponents().length, 1);
    X.is(energy1.getName()!, 'energy');
    X.not(energy1.toString(), 'E');
    X.is(energy1.simplify().toString(), 'E');
    X.not(energy2.toString(), 'E');
    X.is(energy2.simplify().toString(), 'E');
    X.is(energy3.toString(), 'E');
    X.is(energy3.simplify().toString(), 'E');
}

{
    const meters_per_second = U({ meter: 1, second: -1 }),
        miles_per_hour = U({ mile: 1, hour: -1 });
    X.isFalse(meters_per_second.is(miles_per_hour));
    X.isTrue(meters_per_second.measure.is(miles_per_hour.measure));
    X.isTrue(meters_per_second.measure.dimension.is(miles_per_hour.measure.dimension));
    X.gt(miles_per_hour.scale, 0.44); // 0.447...
    X.lt(miles_per_hour.scale, 0.45);
    X.eq(meters_per_second.getNonzeroExponents().length, 2);
    X.eq(meters_per_second.getExponent('meter'), 1);
    X.eq(meters_per_second.getExponent('day'), 0);
    X.is(meters_per_second.toString(), '\\frac{\\text{m}}{\\text{s}}');
    X.is(meters_per_second.measure.toString(), 'v');
    X.is(meters_per_second.measure.getName()!, 'velocity');
}

{
    const kN = U('kiloNewton'),
        kg_m_s2 = U({ kilogram: 1, meter: 1, second: -2 }),
        lbf = U('pound_force');
    X.isTrue(kN.measure.dimension.is(kg_m_s2.measure.dimension));
    X.isFalse(kN.is(kg_m_s2));
    X.eq(kN.getNonzeroExponents().length, 1);
    X.eq(kN.getExponent('kiloNewton'), 1);
    X.eq(kN.getExponent('Newton'), 0);
    X.eq(kN.scale / kg_m_s2.scale, 1000);
    X.is(kN.toString(), '\\text{k} \\text{N}');
    X.isTrue(kN.measure.dimension.is(lbf.measure.dimension));
    X.gt(lbf.scale / kg_m_s2.scale, 4.44);// 4.448...
    X.lt(lbf.scale / kg_m_s2.scale, 4.45);
    X.is(lbf.measure.dimension.toString(), '\\frac{\\textbf{M} \\cdot \\textbf{L}}{\\textbf{T}^{2}}');
    X.is(lbf.measure.toString(), 'F');
    X.is(lbf.measure.getName()!, 'force');
    X.eq(lbf.measure.getNonzeroExponents().length, 1);
}

{
    const force_ma = U({ kilogram: 1 }).mult(U({ meter: 1, second: -2 }), 1),
        force1 = U({ kilogram: 1, meter: 1, second: -2 }),
        force2 = U({ Newton: 1 });
    X.is(force_ma.measure.toString(), 'm \\cdot a');
    X.is(force1.measure.toString(), 'F');
    X.is(force2.measure.toString(), 'F');
    X.is(force_ma.mult(U({ foot: 1, minute: -2 }), -1).measure.toString(), 'm');
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
}

{
    const degR = Q(460 + 32, U('Rankine')); // About freezing temperature
    X.eq(degR.value, 492);
    X.eq(degR.unit.getExponent('Rankine'), 1);
    X.eq(degR.unit.measure.getExponent('temperature'), 1);
    X.eq(degR.unit.measure.dimension.getExponent('temperature'), 1);
    X.gt(degR.as(U({ Kelvin: 1 })).value, 273); // 273.333...
    X.lt(degR.as(U({ Kelvin: 1 })).value, 274);
    X.gt(degR.as(U({ Fahrenheight_delta: 1 })).value, 491.9); // To allow for small error
    X.lt(degR.as(U({ Fahrenheight_delta: 1 })).value, 492.1);
}