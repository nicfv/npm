import * as T6 from 't6';
import { Vec3 } from './vec3.js';
import { SMath } from './index.js';

// Make sure that constructors work
const a: Vec3 = new Vec3(2, 2);
const b: Vec3 = new Vec3(-Math.sqrt(3), 0, 1);
const c: Vec3 = Vec3.fromPolar(5, Math.PI / 2, 0);

T6.eq(a.x, 2);
T6.eq(a.y, 2);
T6.eq(a.z, 0);
T6.isTrue(SMath.approx(a.r, 2 * Math.SQRT2));
T6.isTrue(SMath.approx(a.theta, Math.PI / 4));
T6.eq(a.phi, 0);

T6.eq(b.x, -Math.sqrt(3));
T6.eq(b.y, 0);
T6.eq(b.z, 1);
T6.isTrue(SMath.approx(b.r, 2));
T6.eq(b.theta, Math.PI);
T6.isTrue(SMath.approx(b.phi, Math.PI / 6), `Found ${b.phi}, expected pi/6`);

T6.eq(c.x, 0);
T6.eq(c.y, 5);
T6.eq(c.z, 0);
T6.eq(c.r, 5);
T6.eq(b.theta, Math.PI / 2);
T6.eq(c.phi, 0);

T6.isTrue(a.equals(a));
T6.isTrue(b.equals(b));
T6.isFalse(a.equals(b));
T6.isFalse(b.equals(a));

const sum: Vec3 = a.plus(b);
const diff: Vec3 = a.minus(b);
const scaled: Vec3 = a.scaleBy(2);
const cross1: Vec3 = a.cross(b);
const cross2: Vec3 = b.cross(a);
const dot: number = a.dot(b);
const ab: Vec3 = a.projectOnto(b);
