import { test } from 't6';
import assert from 'node:assert/strict';
import { Complex } from './complex.js';

const approx = (a: number, b: number, tol = 1e-12) => Math.abs(a - b) <= tol;

test('constructor computes Cartesian and polar values', () => {
    const c = new Complex(3, 4);
    assert.ok(approx(c.real, 3));
    assert.ok(approx(c.imag, 4));
    assert.ok(approx(c.r, 5));
    assert.ok(approx(c.theta, Math.atan2(4, 3)));
});

test('fromPolar creates expected Cartesian values', () => {
    const r = 2;
    const theta = Math.PI / 2;
    const c = Complex.fromPolar(r, theta);
    assert.ok(approx(c.real, r * Math.cos(theta)));
    assert.ok(approx(c.imag, r * Math.sin(theta)));
});

test('equals respects exact and tolerance-based comparisons', () => {
    const a = new Complex(1, 1);
    const b = new Complex(1, 1 + 1e-9);
    assert.ok(a.equals(new Complex(1, 1)));
    assert.ok(a.equals(b, 1e-8));
    assert.strictEqual(a.equals(b, 1e-12), false);
});

test('plus and minus produce correct Cartesian results', () => {
    const a = new Complex(2, 3);
    const b = new Complex(1, -4);
    const sum = a.plus(b);
    const diff = a.minus(b);
    assert.ok(approx(sum.real, 3) && approx(sum.imag, -1));
    assert.ok(approx(diff.real, 1) && approx(diff.imag, 7));
});

test('times uses correct multiplication (Cartesian result)', () => {
    const a = new Complex(1, 1);
    const b = new Complex(1, 1);
    // (1 + i)^2 = 0 + 2i
    const prod = a.times(b);
    assert.ok(approx(prod.real, 0));
    assert.ok(approx(prod.imag, 2));
});

test('over divides correctly (Cartesian result)', () => {
    const a = new Complex(1, 2);
    const b = new Complex(3, -4);
    // (1+2i)/(3-4i) = ((1+2i)*(3+4i))/ (3^2+4^2)
    const denom = 3 * 3 + 4 * 4;
    const expectedReal = (1 * 3 + 2 * 4) / denom;
    const expectedImag = (2 * 3 - 1 * 4) / denom;
    const q = a.over(b);
    assert.ok(approx(q.real, expectedReal, 1e-10));
    assert.ok(approx(q.imag, expectedImag, 1e-10));
});

test('pow raises to integer powers correctly', () => {
    const a = new Complex(1, 1);
    const squared = a.pow(2);
    // (1+i)^2 = 0 + 2i
    assert.ok(approx(squared.real, 0, 1e-12));
    assert.ok(approx(squared.imag, 2, 1e-12));

    const cubed = a.pow(3);
    // (1+i)^3 = (1+i)*(0+2i) = -2+2i
    assert.ok(approx(cubed.real, -2, 1e-12));
    assert.ok(approx(cubed.imag, 2, 1e-12));
});