import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { SMath } from './index.js';

describe('approx', () => {
    it('should determine if numbers are approximate', () => {
        assert.ok(SMath.approx(0.1 + 0.2, 0.3));
        assert.ok(SMath.approx(0.3 - 0.1, 0.2));
        assert.ok(SMath.approx(1 + 1e-7, 1));
        assert.ok(SMath.approx(1 - 1e-7, 1));
        assert.ok(!SMath.approx(1 + 1e-5, 1));
        assert.ok(!SMath.approx(1 - 1e-5, 1));
        assert.ok(!SMath.approx(1 + 1e-7, 1, 1e-8));
        assert.ok(!SMath.approx(1 - 1e-7, 1, 1e-8));
        assert.ok(SMath.approx(1 + 1e-5, 1, 1e-4));
        assert.ok(SMath.approx(1 - 1e-5, 1, 1e-4));
    });
});

describe('clamp', () => {
    it('should clamp a number within bounds', () => {
        assert.strictEqual(SMath.clamp(4, 2, 6), 4);
        assert.strictEqual(SMath.clamp(1, 2, 6), 2);
        assert.strictEqual(SMath.clamp(7, 2, 6), 6);
    });
});

describe('expand', () => {
    it('should expand a normalized number', () => {
        assert.strictEqual(SMath.expand(-1, 4, 8), 0);
        assert.strictEqual(SMath.expand(0, 4, 8), 4);
        assert.strictEqual(SMath.expand(0.5, 4, 8), 6);
        assert.strictEqual(SMath.expand(1, 4, 8), 8);
        assert.strictEqual(SMath.expand(2, 4, 8), 12);
    });
});

describe('normalize', () => {
    it('should normalize a number', () => {
        assert.strictEqual(SMath.normalize(8, 10, 12), -1);
        assert.strictEqual(SMath.normalize(10, 10, 12), 0);
        assert.strictEqual(SMath.normalize(11, 10, 12), 0.5);
        assert.strictEqual(SMath.normalize(12, 10, 12), 1);
        assert.strictEqual(SMath.normalize(14, 10, 12), 2);
    });
});

describe('translate', () => {
    it('should translate a number', () => {
        assert.strictEqual(SMath.translate(20, 0, 100, 32, 212), 68);
        assert.strictEqual(SMath.translate(-40, 0, 100, 32, 212), -40);
        assert.strictEqual(SMath.translate(68, 32, 212, 0, 100), 20);
        assert.strictEqual(SMath.translate(-40, 32, 212, 0, 100), -40);
    });
});

describe('linspace', () => {
    it('should generate an array of linearly-spaced numbers', () => {
        assert.deepEqual(SMath.linspace(1, 5, 6), [1, 1.8, 2.6, 3.4, 4.2, 5]);
        assert.deepEqual(SMath.linspace(10, 20, 3), [10, 15, 20]);
        assert.deepEqual(SMath.linspace(3, -3, 5), [3, 1.5, 0, -1.5, -3]);
        assert.deepEqual(SMath.linspace(0, 0, -1), []);
    });
});

describe('logspace', () => {
    it('should generate logarithmically spaced values', () => {
        const values = SMath.logspace(0, 2, 5);
        assert.ok(values[3] > 31.622);
        assert.ok(values[3] < 31.623);
        assert.deepStrictEqual(SMath.logspace(2, -2, 5), [100, 10, 1, 0.1, 0.01]);
        assert.deepStrictEqual(SMath.logspace(0, 0, -1), []);
    });
});

describe('factorial', () => {
    it('should compute factorials', () => {
        assert.strictEqual(SMath.factorial(0), 1);
        assert.strictEqual(SMath.factorial(1), 1);
        assert.strictEqual(SMath.factorial(2), 2);
        assert.strictEqual(SMath.factorial(3), 6);
        assert.strictEqual(SMath.factorial(4), 24);
        assert.strictEqual(SMath.factorial(5), 120);
    });
});

describe('factors', () => {
    it('should factor integers into prime factors', () => {
        assert.deepStrictEqual(SMath.factors(0), [0]);
        assert.deepStrictEqual(SMath.factors(1), [1]);
        assert.deepStrictEqual(SMath.factors(2), [2]);
        assert.deepStrictEqual(SMath.factors(3), [3]);
        assert.deepStrictEqual(SMath.factors(4), [2, 2]);
        assert.deepStrictEqual(SMath.factors(5), [5]);
        assert.deepStrictEqual(SMath.factors(6), [2, 3]);
        assert.deepStrictEqual(SMath.factors(7), [7]);
        assert.deepStrictEqual(SMath.factors(8), [2, 2, 2]);
        assert.deepStrictEqual(SMath.factors(24), [2, 2, 2, 3]);
        for (let i = 0; i <= 100; i++) {
            assert.strictEqual(SMath.prod(SMath.factors(i)), i);
        }
    });
});

describe('isPrime', () => {
    it('should detect prime numbers', () => {
        assert.ok(!SMath.isPrime(-4));
        assert.ok(!SMath.isPrime(-2));
        assert.ok(!SMath.isPrime(-1.5));
        assert.ok(!SMath.isPrime(1));
        assert.ok(SMath.isPrime(2));
        assert.ok(SMath.isPrime(3));
        assert.ok(!SMath.isPrime(4));
        assert.ok(SMath.isPrime(5));
        assert.ok(SMath.isPrime(23));
        assert.ok(!SMath.isPrime(23.5));
        assert.ok(!SMath.isPrime(81));
        assert.ok(SMath.isPrime(83));
    });
});

describe('round2', () => {
    it('should round to the nearest multiple of a base', () => {
        assert.strictEqual(SMath.round2(6.12, 0.2), 6.2);
        assert.strictEqual(SMath.round2(-0.53, 0.25), -0.5);
        assert.strictEqual(SMath.round2(Math.PI, 0.125), 3.125);
        assert.strictEqual(SMath.round2(2.2, -1), 2);
        assert.strictEqual(SMath.round2(2.7 + 0.35, 0.01), 3.05);
    });
});

describe('error', () => {
    it('should compute relative normalized error', () => {
        assert.strictEqual(SMath.error(9, 10), -0.1);
        assert.strictEqual(SMath.error(11, 10), 0.1);
        assert.strictEqual(SMath.error(-1, 2), -1.5);
        assert.strictEqual(SMath.error(2.5, 2), 0.25);
    });
});

describe('sum and prod', () => {
    it('should sum and multiply collections', () => {
        assert.strictEqual(SMath.sum([]), 0);
        assert.strictEqual(SMath.sum([1]), 1);
        assert.strictEqual(SMath.sum([1, 2]), 3);
        assert.strictEqual(SMath.sum([1, 2, 3]), 6);
        assert.strictEqual(SMath.sum([1, 2, 3, 4]), 10);

        assert.strictEqual(SMath.prod([]), 1);
        assert.strictEqual(SMath.prod([1]), 1);
        assert.strictEqual(SMath.prod([1, 2]), 2);
        assert.strictEqual(SMath.prod([1, 2, 3]), 6);
        assert.strictEqual(SMath.prod([1, 2, 3, 4]), 24);
    });
});

describe('average and median', () => {
    it('should compute average and median values', () => {
        assert.ok(Number.isNaN(SMath.avg([])));
        assert.strictEqual(SMath.avg([1]), 1);
        assert.strictEqual(SMath.avg([1, 2]), 1.5);
        assert.strictEqual(SMath.avg([1, 2, 3]), 2);
        assert.strictEqual(SMath.avg([1, 2, 3, 4]), 2.5);

        assert.ok(Number.isNaN(SMath.median([])));
        assert.strictEqual(SMath.median([1]), 1);
        assert.strictEqual(SMath.median([1, 3]), 2);
        assert.strictEqual(SMath.median([1, 3, 2]), 2);
        assert.strictEqual(SMath.median([5, 1, 2, 3]), 2.5);
        assert.strictEqual(SMath.median([10, 2, 30, 4]), 7);
        assert.strictEqual(SMath.median([10, 2, 30, 4, 5]), 5);
    });
});

describe('variance and standard deviation', () => {
    it('should compute population and sample stats', () => {
        const ds1 = [1, 2, 3, 4];
        const ds2 = [-3, 0, 1, 1, 2];

        assert.strictEqual(SMath.varp(ds1), 1.25);
        assert.ok(SMath.varp(ds2) > 2.95);
        assert.ok(SMath.varp(ds2) < 2.97);

        assert.ok(SMath.vars(ds1) > 1.66);
        assert.ok(SMath.vars(ds1) < 1.67);
        assert.ok(SMath.vars(ds2) > 3.69);
        assert.ok(SMath.vars(ds2) < 3.71);

        assert.ok(SMath.stdevp(ds1) > 1.11);
        assert.ok(SMath.stdevp(ds1) < 1.12);
        assert.ok(SMath.stdevp(ds2) > 1.72);
        assert.ok(SMath.stdevp(ds2) < 1.73);

        assert.ok(SMath.stdevs(ds1) > 1.29);
        assert.ok(SMath.stdevs(ds1) < 1.30);
        assert.ok(SMath.stdevs(ds2) > 1.92);
        assert.ok(SMath.stdevs(ds2) < 1.93);
    });
});

describe('random generators', () => {
    it('should generate random values within bounds', () => {
        for (let i = 0; i < 100; i++) {
            const randMin = i - 75;
            const randMax = i - 25;
            const rf = SMath.runif(randMin, randMax);
            const ri = SMath.rint(randMin, randMax);
            assert.ok(rf >= randMin && rf <= randMax);
            assert.ok(ri >= randMin && ri <= randMax);
        }
    });

    it('should generate approximately normal random data', () => {
        const tolerance = 0.5;
        const normMean = -1;
        const normStdev = 3;
        const normDist1 = SMath.linspace(0, 0, 1000).map(() => SMath.rnorm(normMean, normStdev));
        const normDist2 = SMath.rdist(1000, normMean, normStdev);
        const normMeanCalc1 = SMath.avg(normDist1);
        const normStdevCalc1 = SMath.stdevp(normDist1);
        const normMeanCalc2 = SMath.avg(normDist2);
        const normStdevCalc2 = SMath.stdevp(normDist2);

        assert.ok(SMath.approx(normMeanCalc1, normMean, tolerance));
        assert.ok(SMath.approx(normStdevCalc1, normStdev, tolerance));
        assert.ok(SMath.approx(normMeanCalc2, normMean, tolerance));
        assert.ok(SMath.approx(normStdevCalc2, normStdev, tolerance));
    });

    it('should shuffle and select values', () => {
        assert.strictEqual(SMath.shuffle(['a', 'b', 'c']).length, 3);
        assert.strictEqual(SMath.shuffle([1, 2, 3]).length, 3);
        assert.strictEqual(Math.min(...SMath.shuffle([1, 2, 3])), 1);
        assert.strictEqual(Math.max(...SMath.shuffle([1, 2, 3])), 3);
        assert.strictEqual(SMath.avg(SMath.shuffle([1, 2, 3])), 2);

        assert.strictEqual(SMath.selectRandom([5]), 5);
        assert.strictEqual(SMath.selectRandom([1, 1, 1, 1]), 1);
        assert.ok(SMath.selectRandom([1, 2, 3, 4]) > 0);
        assert.ok(SMath.selectRandom([1, 2, 3, 4]) < 5);
        assert.strictEqual(typeof SMath.selectRandom([]), 'undefined');

        assert.strictEqual(SMath.selectRandomWeighted([]), -1);
        assert.strictEqual(SMath.selectRandomWeighted([0]), -1);
        assert.strictEqual(SMath.selectRandomWeighted([1]), 0);
        assert.strictEqual(SMath.selectRandomWeighted([0.1, 0, 0]), 0);
        assert.strictEqual(SMath.selectRandomWeighted([0, 15, -3]), 1);
        assert.strictEqual(SMath.selectRandomWeighted([-4, 0, 20]), 2);
    });

    it('should weight random selection reasonably over repeated trials', () => {
        const trials = 1000;
        const weights = [1, 6.5, 0, 2.5];
        const counts = [0, 0, 0, 0];

        for (let i = 0; i < trials; i++) {
            const selected = SMath.selectRandomWeighted(weights);
            counts[selected]++;
        }

        assert.strictEqual(counts[2], 0);

        const totalWeight = SMath.sum(weights);
        for (const i in weights) {
            const actual = counts[i];
            const expected = weights[i] / totalWeight * trials;
            assert.ok(Math.abs(SMath.error(expected, actual)) <= 0.25, 'Random error bars exceeded 20% allowance, try running again.');
        }
    });
});

describe('limits, differentiation, and integration', () => {
    const f1 = (x: number): number => 3 * x ** 2;
    const f2 = (x: number): number => 1 / x;

    it('should evaluate limits', () => {
        assert.strictEqual(SMath.lim(f1, -1), 3);
        assert.ok(Number.isNaN(SMath.lim(f2, 0)));
        assert.strictEqual(SMath.lim(Math.log, 0), -Infinity);
        assert.ok(Number.isNaN(SMath.lim(Math.log, -1)));
        assert.strictEqual(SMath.lim(x => x ** -2, 0), Infinity);
        assert.ok(Number.isNaN(SMath.lim(x => x > 0 ? 1 : (x < 0 ? -1 : NaN), 0)));
        assert.strictEqual(SMath.lim(() => 0, 0), 0);
        assert.strictEqual(SMath.lim(() => Infinity, 0), Infinity);
        assert.strictEqual(SMath.lim(() => -Infinity, 0), -Infinity);
        assert.ok(Number.isNaN(SMath.lim(() => NaN, 0)));
        assert.ok(SMath.lim(x => Math.sin(x) / x, 0) > 0.99);
        assert.ok(SMath.lim(x => Math.sin(x) / x, 0) <= 1);
        assert.ok(Number.isNaN(SMath.lim(x => Math.cos(x) / x, 0)));
        assert.strictEqual(SMath.lim(x => x * x / x, 0), 0);
        assert.strictEqual(SMath.lim(x => x * x / x, 5), 5);
        assert.strictEqual(SMath.lim(Math.cbrt, 0), 0);
        assert.strictEqual(SMath.lim(x => 100 * x * (x - 2) / (x - 2), 2), 200);
    });

    it('should compute derivatives', () => {
        assert.ok(SMath.differentiate(f1, 2) > 11.99);
        assert.ok(SMath.differentiate(f1, 2) < 12.01);
        assert.ok(SMath.differentiate(f2, -2) > -0.26);
        assert.ok(SMath.differentiate(f2, -2) < -0.24);
        assert.strictEqual(SMath.differentiate(Math.cbrt, 0), Infinity);
        assert.ok(SMath.approx(SMath.differentiate(Math.sin, 1), Math.cos(1)));
        assert.ok(SMath.approx(SMath.differentiate(Math.sqrt, 0.01), 5));
    });

    it('should compute definite integrals', () => {
        assert.ok(SMath.integrate(f1, 1, 3) > 25.99);
        assert.ok(SMath.integrate(f1, 1, 3) < 26.01);
        assert.ok(SMath.integrate(f2, 2, 4) > 0.69);
        assert.ok(SMath.integrate(f2, 2, 4) < 0.70);
        assert.ok(SMath.approx(SMath.integrate(Math.cos, 0, 1, 1e7), Math.sin(1)));
    });
});

describe('rat and mixed', () => {
    it('should convert decimals to ratios and mixed fractions', () => {
        let frac: { num: number, den: number };
        frac = SMath.rat(1 / 3);
        assert.strictEqual(frac.num, 1);
        assert.strictEqual(frac.den, 3);

        frac = SMath.rat(0.625);
        assert.strictEqual(frac.num, 5);
        assert.strictEqual(frac.den, 8);

        frac = SMath.rat(-9 / 21);
        assert.strictEqual(frac.num, -3);
        assert.strictEqual(frac.den, 7);

        frac = SMath.rat(0);
        assert.strictEqual(frac.num, 0);
        assert.strictEqual(frac.den, 1);

        frac = SMath.rat(1);
        assert.strictEqual(frac.num, 1);
        assert.strictEqual(frac.den, 1);

        frac = SMath.rat(-1);
        assert.strictEqual(frac.num, -1);
        assert.strictEqual(frac.den, 1);

        frac = SMath.rat(2.75);
        assert.strictEqual(frac.num, 11);
        assert.strictEqual(frac.den, 4);

        let mixedFrac: { whole: number, num: number, den: number };
        mixedFrac = SMath.mixed(1 / 3);
        assert.strictEqual(mixedFrac.whole, 0);
        assert.strictEqual(mixedFrac.num, 1);
        assert.strictEqual(mixedFrac.den, 3);

        mixedFrac = SMath.mixed(1.625);
        assert.strictEqual(mixedFrac.whole, 1);
        assert.strictEqual(mixedFrac.num, 5);
        assert.strictEqual(mixedFrac.den, 8);

        mixedFrac = SMath.mixed(-9 / 20);
        assert.strictEqual(mixedFrac.whole, 0);
        assert.strictEqual(mixedFrac.num, -9);
        assert.strictEqual(mixedFrac.den, 20);

        mixedFrac = SMath.mixed(0);
        assert.strictEqual(mixedFrac.whole, 0);
        assert.strictEqual(mixedFrac.num, 0);
        assert.strictEqual(mixedFrac.den, 1);

        mixedFrac = SMath.mixed(1);
        assert.strictEqual(mixedFrac.whole, 1);
        assert.strictEqual(mixedFrac.num, 0);
        assert.strictEqual(mixedFrac.den, 1);

        mixedFrac = SMath.mixed(-1);
        assert.strictEqual(mixedFrac.whole, -1);
        assert.strictEqual(mixedFrac.num, 0);
        assert.strictEqual(mixedFrac.den, 1);

        mixedFrac = SMath.mixed(2.75);
        assert.strictEqual(mixedFrac.whole, 2);
        assert.strictEqual(mixedFrac.num, 3);
        assert.strictEqual(mixedFrac.den, 4);

        mixedFrac = SMath.mixed(-4 / 2);
        assert.strictEqual(mixedFrac.whole, -2);
        assert.strictEqual(mixedFrac.num, 0);
        assert.strictEqual(mixedFrac.den, 1);

        mixedFrac = SMath.mixed(-8 / 6);
        assert.strictEqual(mixedFrac.whole, -1);
        assert.strictEqual(mixedFrac.num, 1);
        assert.strictEqual(mixedFrac.den, 3);
    });
});

describe('gcd', () => {
    it('should compute greatest common divisors', () => {
        assert.strictEqual(SMath.gcd(48, 18), 6);
        assert.strictEqual(SMath.gcd(48, 49), 1);
        assert.strictEqual(SMath.gcd(1, 1), 1);
        assert.strictEqual(SMath.gcd(1, 49), 1);
        assert.strictEqual(SMath.gcd(49, 49), 49);
        assert.strictEqual(SMath.gcd(15, 0), 15);
    });
});
