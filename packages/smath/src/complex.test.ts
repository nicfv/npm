import * as T6 from 't6';
import { Complex } from './complex.js';
import { SMath } from './index.js';

// constructor computes Cartesian and polar values
const c1 = new Complex(3, 4);
T6.isTrue(SMath.approx(c1.real, 3));
T6.isTrue(SMath.approx(c1.imag, 4));
T6.isTrue(SMath.approx(c1.r, 5), `c1.r = ${c1.r}`);
T6.isTrue(SMath.approx(c1.theta, Math.atan2(4, 3)));

// fromPolar creates expected Cartesian values
const r = 2;
const theta = Math.PI / 2;
const c2 = Complex.fromPolar(r, theta);
T6.isTrue(SMath.approx(c2.real, r * Math.cos(theta)));
T6.isTrue(SMath.approx(c2.imag, r * Math.sin(theta)));

// equals respects exact and tolerance-based comparisons
const a1 = new Complex(1, 1);
const b1 = new Complex(1, 1 + 1e-9);
T6.isTrue(a1.equals(new Complex(1, 1)));
T6.isTrue(a1.equals(b1, 1e-8));
T6.isFalse(a1.equals(b1, 1e-12));

// plus and minus produce correct Cartesian results
const a2 = new Complex(2, 3);
const b2 = new Complex(1, -4);
const sum = a2.plus(b2);
const diff = a2.minus(b2);
T6.isTrue(sum.equals(new Complex(3, -1)));
T6.isTrue(diff.equals(new Complex(1, 7)));

// times uses correct multiplication (Cartesian result)
const a3 = new Complex(1, 1);
const b3 = new Complex(1, 1);
// (1 + i)^2 = 0 + 2i
const prod = a3.times(b3);
T6.isTrue(SMath.approx(prod.real, 0));
T6.isTrue(SMath.approx(prod.imag, 2));

// over divides correctly (Cartesian result)
const a4 = new Complex(1, 2);
const b4 = new Complex(3, -4);
// (1+2i)/(3-4i) = [(1*3+2*-4) + (2*3-1*-4)] / (3^2+4^2)
const denom = 3 * 3 + 4 * 4;
const expectedReal = (1 * 3 - 2 * 4) / denom;
const expectedImag = (2 * 3 + 1 * 4) / denom;
const q = a4.over(b4);
T6.isTrue(SMath.approx(q.real, expectedReal));
T6.isTrue(SMath.approx(q.imag, expectedImag));

// pow raises to integer powers correctly
const a5 = new Complex(1, 1);
const squared = a5.pow(2);
// (1+i)^2 = 0 + 2i
T6.isTrue(SMath.approx(squared.real, 0));
T6.isTrue(SMath.approx(squared.imag, 2));

const cubed = a5.pow(3);
// (1+i)^3 = (1+i)*(0+2i) = -2+2i
T6.isTrue(SMath.approx(cubed.real, -2));
T6.isTrue(SMath.approx(cubed.imag, 2));
