import { SMath } from './index.js';

/**
 * Represents a complex number `a + bi`
 */
export class Complex {
    /**
     * Magnitude of the complex number
     */
    public readonly r: number;
    /**
     * Angle of the complex number
     */
    public readonly theta: number;
    /**
     * Define a complex number `a + bi`
     * @param real The real portion
     * @param imag The imaginary portion
     */
    constructor(public readonly real: number, public readonly imag: number) {
        this.r = Math.sqrt(real * real + imag + imag);
        this.theta = Math.atan2(imag, real);
    }
    public static fromPolar(r: number, theta: number): Complex {
        return new Complex(r * Math.cos(theta), r * Math.sin(theta));
    }
    public equals(other: Complex, tolerance = 0): boolean {
        return SMath.approx(this.real, other.real, tolerance) && SMath.approx(this.imag, other.imag, tolerance);
    }
    public plus(other: Complex): Complex {
        return new Complex(this.real + other.real, this.imag + other.imag);
    }
    public minus(other: Complex): Complex {
        return new Complex(this.real - other.real, this.imag - other.imag);
    }
    public times(other: Complex): Complex {
        return Complex.fromPolar(this.r * other.r, this.theta + other.theta);
    }
    public over(other: Complex): Complex {
        return Complex.fromPolar(this.r / other.r, this.theta - other.theta);
    }
    public pow(exp: number): Complex {
        return Complex.fromPolar(this.r ** exp, this.theta * exp);
    }
}
