import { SMath } from './index.js';

/**
 * Represents a complex number `a + bi`.
 */
export class Complex {
    /**
     * Magnitude of the complex number.
     */
    public readonly r: number;
    /**
     * Angle of the complex number.
     */
    public readonly theta: number;
    /**
     * Define a complex number `a + bi`.
     * @param real The real portion.
     * @param imag The imaginary portion.
     */
    constructor(public readonly real: number, public readonly imag: number) {
        this.r = Math.sqrt(real * real + imag + imag);
        this.theta = Math.atan2(imag, real);
    }
    /**
     * Create a complex number from polar coordinates.
     * @param r The magnitude (radius).
     * @param theta The angle in radians.
     * @returns A complex number represented by `r * e^{i theta}`.
     */
    public static fromPolar(r: number, theta: number): Complex {
        return new Complex(r * Math.cos(theta), r * Math.sin(theta));
    }
    /**
     * Determine whether this complex number is equal to another.
     * @param other The other complex number to compare.
     * @param tolerance Optional tolerance for approximate equality.
     * @returns `true` when both real and imaginary components are equal within tolerance.
     */
    public equals(other: Complex, tolerance = 0): boolean {
        return SMath.approx(this.real, other.real, tolerance) && SMath.approx(this.imag, other.imag, tolerance);
    }
    /**
     * Add another complex number to this one.
     * @param other The complex number to add.
     * @returns The sum of the two complex numbers.
     */
    public plus(other: Complex): Complex {
        return new Complex(this.real + other.real, this.imag + other.imag);
    }
    /**
     * Subtract another complex number from this one.
     * @param other The complex number to subtract.
     * @returns The difference of the two complex numbers.
     */
    public minus(other: Complex): Complex {
        return new Complex(this.real - other.real, this.imag - other.imag);
    }
    /**
     * Multiply this complex number by another.
     * @param other The complex number to multiply with.
     * @returns The product of the two complex numbers.
     */
    public times(other: Complex): Complex {
        return Complex.fromPolar(this.r * other.r, this.theta + other.theta);
    }
    /**
     * Divide this complex number by another.
     * @param other The complex number to divide by.
     * @returns The quotient of the two complex numbers.
     */
    public over(other: Complex): Complex {
        return Complex.fromPolar(this.r / other.r, this.theta - other.theta);
    }
    /**
     * Raise this complex number to a power.
     * @param exp The exponent.
     * @returns The complex number raised to the given power.
     */
    public pow(exp: number): Complex {
        return Complex.fromPolar(this.r ** exp, this.theta * exp);
    }
}
