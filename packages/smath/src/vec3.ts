import { SMath } from '.';

/**
 * Structure for a vector in 3D space.
 */
export class Vec3 {
    /**
     * The magnitude/length of the vector
     */
    public readonly r: number;
    /**
     * The angle of the vector in radians, measured from the x-axis
     */
    public readonly theta: number;
    /**
     * The angle of the vector in radians, measured from the xy-plane
     */
    public readonly phi: number;
    /**
     * Create a vector from cartesian coordinates
     * @param x The cartesian x-coordinate
     * @param y The cartesian y-coordinate
     * @param z The cartesian z-coordinate
     */
    constructor(public readonly x: number, public readonly y: number, public readonly z = 0) {
        this.r = Math.sqrt(x * x + y * y + z * z);
        this.theta = Math.atan2(y, x);
        this.phi = Math.atan2(z, Math.sqrt(x * x + y * y));
    }
    /**
     * Create a vector from polar coordinates
     * @param r The magnitude/length of the vector
     * @param theta The angle of the vector in radians, measured from the x-axis
     * @param phi The angle of the vector in radians, measured from the xy-plane
     * @returns A vector created from polar coordinates
     */
    public static fromPolar(r: number, theta: number, phi = 0): Vec3 {
        return new Vec3(r * Math.cos(phi) * Math.cos(theta), r * Math.cos(phi) * Math.sin(theta), r * Math.sin(phi));
    }
    /**
     * Determine if two vectors are equal (or approximately equal)
     * @param other Arbitrary vector
     * @param tolerance Optional absolute tolerance
     * @returns `true` if v1 = v2
     */
    public equals(other: Vec3, tolerance = 0): boolean {
        return SMath.approx(this.x, other.x, tolerance) && SMath.approx(this.y, other.y, tolerance) && SMath.approx(this.z, other.z, tolerance);
    }
    /**
     * Get a unit vector in this direction
     * @returns v1 (with length 1)
     */
    public unit(): Vec3 {
        return Vec3.fromPolar(1, this.theta, this.phi);
    }
    /**
     * Scale this vector by a numeric factor
     * @param factor Scaling factor
     * @returns A scaled vector
     */
    public scaleBy(factor: number): Vec3 {
        return new Vec3(this.x * factor, this.y * factor, this.z * factor);
    }
    /**
     * Add this vector and another vector
     * @param other Arbitrary vector
     * @returns v1 + v2
     */
    public plus(other: Vec3): Vec3 {
        return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z);
    }
    /**
     * Subtract another vector from this vector
     * @param other Arbitrary vector
     * @returns v1 - v2
     */
    public minus(other: Vec3): Vec3 {
        return this.plus(other.scaleBy(-1));
    }
    /**
     * Compute the dot product between this vector and another vector
     * @param other Arbitrary vector
     * @returns v1 . v2
     */
    public dot(other: Vec3): number {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
    /**
     * Compute the cross product between this vector and another vector
     * @param other Arbitrary vector
     * @returns v1 x v2
     */
    public cross(other: Vec3): Vec3 {
        return new Vec3(this.y * other.z - this.z * other.y, this.z * other.x - this.x * other.z, this.x * other.y - this.y * other.x);
    }
    /**
     * Project this vector onto another vector
     * @param other Arbitrary vector
     * @returns proj_v2(v1)
     */
    public projectOnto(other: Vec3): Vec3 {
        return other.scaleBy(this.dot(other) / other.dot(other));
    }
}
