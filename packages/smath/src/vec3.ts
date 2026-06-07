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
    }
    /**
     * Create a vector from polar coordinates
     * @param r Magnitude
     * @param theta Angle
     * @returns A vector created from polar coordinates
     */
    public static fromPolar(r: number, theta: number): Vec3 {
        return new Vec3(r * Math.cos(theta), r * Math.sin(theta));
    }
    /**
     * Scale this vector by a numeric factor
     * @param factor Scaling factor
     * @returns A scaled vector
     */
    public scaleBy(factor: number): Vec3 {
        return new Vec3(this.x * factor, this.y * factor);
    }
    /**
     * Add this vector and another vector
     * @param other Arbitrary vector
     * @returns v1 + v2
     */
    public plus(other: Vec3): Vec3 {
        return new Vec3(this.x + other.x, this.y + other.y);
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
        return this.x * other.x + this.y * other.y;
    }
}