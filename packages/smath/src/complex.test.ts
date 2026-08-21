import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Complex } from './complex.js';
import { SMath } from './index.js';

describe('Complex', () => {
    it('should compute Cartesian and polar values', () => {
        const c1 = new Complex(3, 4);
        assert.ok(SMath.approx(c1.real, 3));
        assert.ok(SMath.approx(c1.imag, 4));
        assert.ok(SMath.approx(c1.r, 5), `c1.r = ${c1.r}`);
        assert.ok(SMath.approx(c1.theta, Math.atan2(4, 3)));
    });

    it('should create complex numbers from polar coordinates', () => {
        const r = 2;
        const theta = Math.PI / 2;
        const c2 = Complex.fromPolar(r, theta);
        assert.ok(SMath.approx(c2.real, r * Math.cos(theta)));
        assert.ok(SMath.approx(c2.imag, r * Math.sin(theta)));
    });

    it('should compare numbers with exact and tolerance-based equality', () => {
        const a1 = new Complex(1, 1);
        const b1 = new Complex(1, 1 + 1e-9);
        assert.ok(a1.equals(new Complex(1, 1)));
        assert.ok(a1.equals(b1, 1e-8));
        assert.ok(!a1.equals(b1, 1e-12));
    });

    it('should add and subtract complex numbers', () => {
        const a2 = new Complex(2, 3);
        const b2 = new Complex(1, -4);
        const sum = a2.plus(b2);
        const diff = a2.minus(b2);
        assert.ok(sum.equals(new Complex(3, -1)));
        assert.ok(diff.equals(new Complex(1, 7)));
    });

    it('should multiply complex numbers', () => {
        const a3 = new Complex(1, 1);
        const b3 = new Complex(1, 1);
        const prod = a3.times(b3);
        assert.ok(SMath.approx(prod.real, 0));
        assert.ok(SMath.approx(prod.imag, 2));
    });

    it('should divide complex numbers', () => {
        const a4 = new Complex(1, 2);
        const b4 = new Complex(3, -4);
        const denom = 3 * 3 + 4 * 4;
        const expectedReal = (1 * 3 - 2 * 4) / denom;
        const expectedImag = (2 * 3 + 1 * 4) / denom;
        const q = a4.over(b4);
        assert.ok(SMath.approx(q.real, expectedReal));
        assert.ok(SMath.approx(q.imag, expectedImag));
    });

    it('should raise complex numbers to powers', () => {
        const a5 = new Complex(1, 1);
        const squared = a5.pow(2);
        assert.ok(SMath.approx(squared.real, 0));
        assert.ok(SMath.approx(squared.imag, 2));

        const cubed = a5.pow(3);
        assert.ok(SMath.approx(cubed.real, -2));
        assert.ok(SMath.approx(cubed.imag, 2));
    });
});
