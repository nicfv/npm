import * as SMath from '.';
import * as T6 from 't6';

T6.isTrue(SMath.approx(0.1 + 0.2, 0.3));
T6.isTrue(SMath.approx(0.3 - 0.1, 0.2));
T6.isTrue(SMath.approx(1 + 1e-7, 1));
T6.isTrue(SMath.approx(1 - 1e-7, 1));
T6.isFalse(SMath.approx(1 + 1e-5, 1));
T6.isFalse(SMath.approx(1 - 1e-5, 1));
T6.isFalse(SMath.approx(1 + 1e-7, 1, 1e-8));
T6.isFalse(SMath.approx(1 - 1e-7, 1, 1e-8));
T6.isTrue(SMath.approx(1 + 1e-5, 1, 1e-4));
T6.isTrue(SMath.approx(1 - 1e-5, 1, 1e-4));

T6.eq(SMath.clamp(4, 2, 6), 4);
T6.eq(SMath.clamp(1, 2, 6), 2);
T6.eq(SMath.clamp(7, 2, 6), 6);

T6.eq(SMath.expand(-1, 4, 8), 0);
T6.eq(SMath.expand(0, 4, 8), 4);
T6.eq(SMath.expand(0.5, 4, 8), 6);
T6.eq(SMath.expand(1, 4, 8), 8);
T6.eq(SMath.expand(2, 4, 8), 12);

T6.eq(SMath.normalize(8, 10, 12), -1);
T6.eq(SMath.normalize(10, 10, 12), 0);
T6.eq(SMath.normalize(11, 10, 12), 0.5);
T6.eq(SMath.normalize(12, 10, 12), 1);
T6.eq(SMath.normalize(14, 10, 12), 2);

T6.eq(SMath.translate(20, 0, 100, 32, 212), 68);
T6.eq(SMath.translate(-40, 0, 100, 32, 212), -40);
T6.eq(SMath.translate(68, 32, 212, 0, 100), 20);
T6.eq(SMath.translate(-40, 32, 212, 0, 100), -40);

T6.is(SMath.linspace(1, 5, 6).join(), '1,1.8,2.6,3.4,4.2,5');
T6.is(SMath.linspace(10, 20, 3).join(), '10,15,20');
T6.is(SMath.linspace(3, -3, 5).join(), '3,1.5,0,-1.5,-3');
T6.is(SMath.linspace(0, 0, -1).join(), '');

T6.gt(SMath.logspace(0, 2, 5)[3], 31.622); // Approx 31.6227766...
T6.lt(SMath.logspace(0, 2, 5)[3], 31.623);
T6.is(SMath.logspace(2, -2, 5).join(), '100,10,1,0.1,0.01');
T6.is(SMath.logspace(0, 0, -1).join(), '');

T6.eq(SMath.factorial(0), 1);
T6.eq(SMath.factorial(1), 1);
T6.eq(SMath.factorial(2), 2);
T6.eq(SMath.factorial(3), 6);
T6.eq(SMath.factorial(4), 24);
T6.eq(SMath.factorial(5), 120);

T6.is(SMath.factors(0).join(), '0');
T6.is(SMath.factors(1).join(), '1');
T6.is(SMath.factors(2).join(), '2');
T6.is(SMath.factors(3).join(), '3');
T6.is(SMath.factors(4).join(), '2,2');
T6.is(SMath.factors(5).join(), '5');
T6.is(SMath.factors(6).join(), '2,3');
T6.is(SMath.factors(7).join(), '7');
T6.is(SMath.factors(8).join(), '2,2,2');
T6.is(SMath.factors(24).join(), '2,2,2,3');
for (let i = 0; i <= 100; i++) {
    T6.eq(SMath.prod(SMath.factors(i)), i);
}

T6.eq(SMath.round2(6.12, 0.2), 6.2);
T6.eq(SMath.round2(-0.53, 0.25), -0.5);
T6.eq(SMath.round2(Math.PI, 0.125), 3.125);
T6.eq(SMath.round2(2.2, -1), 2);
T6.eq(SMath.round2(2.7 + 0.35, 0.01), 3.05);

T6.eq(SMath.error(9, 10), -0.1);
T6.eq(SMath.error(11, 10), 0.1);
T6.eq(SMath.error(-1, 2), -1.5);
T6.eq(SMath.error(2.5, 2), 0.25);

T6.eq(SMath.sum([]), 0);
T6.eq(SMath.sum([1]), 1);
T6.eq(SMath.sum([1, 2]), 3);
T6.eq(SMath.sum([1, 2, 3]), 6);
T6.eq(SMath.sum([1, 2, 3, 4]), 10);

T6.eq(SMath.prod([]), 1);
T6.eq(SMath.prod([1]), 1);
T6.eq(SMath.prod([1, 2]), 2);
T6.eq(SMath.prod([1, 2, 3]), 6);
T6.eq(SMath.prod([1, 2, 3, 4]), 24);

T6.is(SMath.avg([]).toString(), 'NaN');
T6.eq(SMath.avg([1]), 1);
T6.eq(SMath.avg([1, 2]), 1.5);
T6.eq(SMath.avg([1, 2, 3]), 2);
T6.eq(SMath.avg([1, 2, 3, 4]), 2.5);

T6.is(SMath.median([]).toString(), 'NaN');
T6.eq(SMath.median([1]), 1);
T6.eq(SMath.median([1, 3]), 2);
T6.eq(SMath.median([1, 3, 2]), 2);
T6.eq(SMath.median([5, 1, 2, 3]), 2.5);
T6.eq(SMath.median([10, 2, 30, 4]), 7);
T6.eq(SMath.median([10, 2, 30, 4, 5]), 5);

const ds1: number[] = [1, 2, 3, 4],
    ds2: number[] = [-3, 0, 1, 1, 2];

T6.eq(SMath.varp(ds1), 1.25);
T6.gt(SMath.varp(ds2), 2.95); // 2.96
T6.lt(SMath.varp(ds2), 2.97);

T6.gt(SMath.vars(ds1), 1.66); // 1.666...
T6.lt(SMath.vars(ds1), 1.67);
T6.gt(SMath.vars(ds2), 3.69); // 3.7
T6.lt(SMath.vars(ds2), 3.71);

T6.gt(SMath.stdevp(ds1), 1.11); // 1.118...
T6.lt(SMath.stdevp(ds1), 1.12);
T6.gt(SMath.stdevp(ds2), 1.72); // 1.720...
T6.lt(SMath.stdevp(ds2), 1.73);

T6.gt(SMath.stdevs(ds1), 1.29); // 1.291...
T6.lt(SMath.stdevs(ds1), 1.30);
T6.gt(SMath.stdevs(ds2), 1.92); // 1.923...
T6.lt(SMath.stdevs(ds2), 1.93);

for (let i = 0; i < 100; i++) {
    const randMin: number = i - 75,
        randMax: number = i - 25,
        rf: number = SMath.runif(randMin, randMax),
        ri: number = SMath.rint(randMin, randMax);
    T6.ge(rf, randMin);
    T6.le(rf, randMax);
    T6.ge(ri, randMin);
    T6.le(ri, randMax);
}

{
    const tolerance = 0.5,
        normMean = -1,
        normStdev = 3,
        normDist1: number[] = SMath.linspace(0, 0, 1000).map(() => SMath.rnorm(normMean, normStdev)),
        normDist2: number[] = SMath.rdist(1000, normMean, normStdev),
        normMeanCalc1: number = SMath.avg(normDist1),
        normStdevCalc1: number = SMath.stdevp(normDist1),
        normMeanCalc2: number = SMath.avg(normDist2),
        normStdevCalc2: number = SMath.stdevp(normDist2);
    T6.isTrue(SMath.approx(normMeanCalc1, normMean, tolerance));
    T6.isTrue(SMath.approx(normStdevCalc1, normStdev, tolerance));
    T6.isTrue(SMath.approx(normMeanCalc2, normMean, tolerance));
    T6.isTrue(SMath.approx(normStdevCalc2, normStdev, tolerance));
}

T6.eq(SMath.shuffle(['a', 'b', 'c']).length, 3);
T6.eq(SMath.shuffle([1, 2, 3]).length, 3);
T6.eq(Math.min(...SMath.shuffle([1, 2, 3])), 1);
T6.eq(Math.max(...SMath.shuffle([1, 2, 3])), 3);
T6.eq(SMath.avg(SMath.shuffle([1, 2, 3])), 2);

T6.eq(SMath.selectRandom([5]), 5);
T6.eq(SMath.selectRandom([1, 1, 1, 1]), 1);
T6.gt(SMath.selectRandom([1, 2, 3, 4]), 0);
T6.lt(SMath.selectRandom([1, 2, 3, 4]), 5);
T6.isTrue(typeof SMath.selectRandom([]) === 'undefined');

T6.eq(SMath.selectRandomWeighted([]), -1);
T6.eq(SMath.selectRandomWeighted([0]), -1);
T6.eq(SMath.selectRandomWeighted([1]), 0);
T6.eq(SMath.selectRandomWeighted([0.1, 0, 0]), 0);
T6.eq(SMath.selectRandomWeighted([0, 15, -3]), 1);
T6.eq(SMath.selectRandomWeighted([-4, 0, 20]), 2);

{
    const trials = 1000;
    const weights = [1, 6.5, 0, 2.5];
    const counts = [0, 0, 0, 0];
    for (let i = 0; i < trials; i++) {
        const selected = SMath.selectRandomWeighted(weights);
        counts[selected]++;
    }
    T6.eq(counts[2], 0);
    const totalWeight = SMath.sum(weights);
    for (const i in weights) {
        const actual = counts[i];
        const expected = weights[i] / totalWeight * trials;
        T6.le(Math.abs(SMath.error(expected, actual)), 0.2, 'Random error bars exceeded 20% allowance, try running again.');
    }
}

function f1(x: number): number {
    return 3 * x ** 2;
}

function f2(x: number): number {
    return 1 / x;
}

T6.eq(SMath.lim(f1, -1), 3);
T6.is(SMath.lim(f2, 0).toString(), 'NaN');
T6.eq(SMath.lim(Math.log, 0), -Infinity);
T6.is(SMath.lim(Math.log, -1).toString(), 'NaN');
T6.eq(SMath.lim(x => x ** -2, 0), Infinity);
T6.is(SMath.lim(x => x > 0 ? 1 : (x < 0 ? -1 : NaN), 0).toString(), 'NaN');
T6.eq(SMath.lim(() => 0, 0), 0);
T6.eq(SMath.lim(() => Infinity, 0), Infinity);
T6.eq(SMath.lim(() => -Infinity, 0), -Infinity);
T6.is(SMath.lim(() => NaN, 0).toString(), 'NaN');
T6.gt(SMath.lim(x => Math.sin(x) / x, 0), 0.99); // 1
T6.le(SMath.lim(x => Math.sin(x) / x, 0), 1);
T6.is(SMath.lim(x => Math.cos(x) / x, 0).toString(), 'NaN');
T6.eq(SMath.lim(x => x * x / x, 0), 0);
T6.eq(SMath.lim(x => x * x / x, 5), 5);
T6.eq(SMath.lim(Math.cbrt, 0), 0);
T6.eq(SMath.lim(x => 100 * x * (x - 2) / (x - 2), 2), 200); // Need to test this with a steeper slope

T6.gt(SMath.differentiate(f1, 2), 11.99); // 12
T6.lt(SMath.differentiate(f1, 2), 12.01);
T6.gt(SMath.differentiate(f2, -2), -0.26); // -0.25
T6.lt(SMath.differentiate(f2, -2), -0.24);
T6.eq(SMath.differentiate(Math.cbrt, 0), Infinity);
T6.isTrue(SMath.approx(SMath.differentiate(Math.sin, 1), Math.cos(1)));
T6.isTrue(SMath.approx(SMath.differentiate(Math.sqrt, 0.01), 5));

T6.gt(SMath.integrate(f1, 1, 3), 25.99); // 26
T6.lt(SMath.integrate(f1, 1, 3), 26.01);
T6.gt(SMath.integrate(f2, 2, 4), 0.69); // 0.693...
T6.lt(SMath.integrate(f2, 2, 4), 0.70);
T6.isTrue(SMath.approx(SMath.integrate(Math.cos, 0, 1, 1e7), Math.sin(1)));

{
    let frac: { num: number, den: number };
    frac = SMath.rat(1 / 3);
    T6.eq(frac.num, 1);
    T6.eq(frac.den, 3);
    frac = SMath.rat(0.625);
    T6.eq(frac.num, 5);
    T6.eq(frac.den, 8);
    frac = SMath.rat(-9 / 21);
    T6.eq(frac.num, -3);
    T6.eq(frac.den, 7);
    frac = SMath.rat(0);
    T6.eq(frac.num, 0);
    T6.eq(frac.den, 1);
    frac = SMath.rat(1);
    T6.eq(frac.num, 1);
    T6.eq(frac.den, 1);
    frac = SMath.rat(-1);
    T6.eq(frac.num, -1);
    T6.eq(frac.den, 1);
    frac = SMath.rat(2.75);
    T6.eq(frac.num, 11);
    T6.eq(frac.den, 4);
}

{
    let frac: { whole: number, num: number, den: number };
    frac = SMath.mixed(1 / 3);
    T6.eq(frac.whole, 0);
    T6.eq(frac.num, 1);
    T6.eq(frac.den, 3);
    frac = SMath.mixed(1.625);
    T6.eq(frac.whole, 1);
    T6.eq(frac.num, 5);
    T6.eq(frac.den, 8);
    frac = SMath.mixed(-9 / 20);
    T6.eq(frac.whole, 0);
    T6.eq(frac.num, -9);
    T6.eq(frac.den, 20);
    frac = SMath.mixed(0);
    T6.eq(frac.whole, 0);
    T6.eq(frac.num, 0);
    T6.eq(frac.den, 1);
    frac = SMath.mixed(1);
    T6.eq(frac.whole, 1);
    T6.eq(frac.num, 0);
    T6.eq(frac.den, 1);
    frac = SMath.mixed(-1);
    T6.eq(frac.whole, -1);
    T6.eq(frac.num, 0);
    T6.eq(frac.den, 1);
    frac = SMath.mixed(2.75);
    T6.eq(frac.whole, 2);
    T6.eq(frac.num, 3);
    T6.eq(frac.den, 4);
    frac = SMath.mixed(-4 / 2);
    T6.eq(frac.whole, -2);
    T6.eq(frac.num, 0);
    T6.eq(frac.den, 1);
    frac = SMath.mixed(-8 / 6);
    T6.eq(frac.whole, -1);
    T6.eq(frac.num, 1);
    T6.eq(frac.den, 3);
}
