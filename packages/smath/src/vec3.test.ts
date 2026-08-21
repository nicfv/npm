import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Vec3 } from './vec3.js';
import { SMath } from './index.js';

describe('Vec3', () => {
    it('should construct vectors in Cartesian and polar form', () => {
        const a: Vec3 = new Vec3(2, 2);
        const b: Vec3 = new Vec3(-Math.sqrt(3), 0, 1);
        const c: Vec3 = Vec3.fromPolar(5, Math.PI / 2, 0);

        assert.strictEqual(a.x, 2);
        assert.strictEqual(a.y, 2);
        assert.strictEqual(a.z, 0);
        assert.ok(SMath.approx(a.r, 2 * Math.SQRT2));
        assert.ok(SMath.approx(a.theta, Math.PI / 4));
        assert.strictEqual(a.phi, 0);

        assert.strictEqual(b.x, -Math.sqrt(3));
        assert.strictEqual(b.y, 0);
        assert.strictEqual(b.z, 1);
        assert.ok(SMath.approx(b.r, 2));
        assert.strictEqual(b.theta, Math.PI);
        assert.ok(SMath.approx(b.phi, Math.PI / 6), `Found ${b.phi}, expected pi/6`);

        assert.ok(SMath.approx(c.x, 0));
        assert.strictEqual(c.y, 5);
        assert.strictEqual(c.z, 0);
        assert.strictEqual(c.r, 5);
        assert.strictEqual(c.theta, Math.PI / 2);
        assert.strictEqual(c.phi, 0);
    });

    it('should compare vectors and compute unit, sum, diff, scaling, cross, dot, and projection', () => {
        const a: Vec3 = new Vec3(2, 2);
        const b: Vec3 = new Vec3(-Math.sqrt(3), 0, 1);

        assert.ok(a.equals(a));
        assert.ok(b.equals(b));
        assert.ok(!a.equals(b));
        assert.ok(!b.equals(a));

        const a1: Vec3 = a.unit();
        assert.ok(SMath.approx(a1.x, 1 / Math.SQRT2));
        assert.ok(SMath.approx(a1.y, 1 / Math.SQRT2));
        assert.strictEqual(a1.z, 0);
        assert.strictEqual(a1.r, 1);
        assert.strictEqual(a1.theta, a.theta);
        assert.strictEqual(a1.phi, a.phi);

        const sum: Vec3 = a.plus(b);
        assert.ok(sum.equals(new Vec3(2 - Math.sqrt(3), 2, 1)));

        const diff: Vec3 = a.minus(b);
        assert.ok(diff.equals(new Vec3(2 + Math.sqrt(3), 2, -1)));

        const scaled: Vec3 = a.scaleBy(2);
        assert.ok(scaled.equals(new Vec3(4, 4, 0)));

        const cross1: Vec3 = a.cross(b);
        const cross2: Vec3 = b.cross(a);
        assert.ok(cross1.equals(cross2.scaleBy(-1)));

        const dot: number = a.dot(a);
        assert.strictEqual(dot, 8);

        const ab: Vec3 = a.projectOnto(b);
        assert.ok(ab.unit().scaleBy(-1).equals(b.unit(), 1e-6));
    });
});
