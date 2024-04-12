import { SMath } from 'smath';

/**
 * Represents a type where every object value is a number representing exponents.
 */
export type Exponents<T extends string> = { [index in T]?: number };
/**
 * Represents a compound unit or dimension.
 */
export abstract class Compound<T extends string, C extends Compound<T, C>> {
    private readonly num: Exponents<T> = {};
    private readonly den: Exponents<T> = {};
    /**
     * Create a new compound unit or dimension.
     * @param exponents Contains an object of exponent values
     * @param toLaTeX A function to convert the exponent to its representation in LaTeX
     */
    constructor(private readonly exponents: Exponents<T>, private readonly toLaTeX: (exponent: T) => string) {
        for (const t in exponents) {
            const exponent: number = this.getExponent(t);
            if (exponent > 0) {
                this.num[t] = exponent;
            } else if (exponent < 0) {
                this.den[t] = -exponent;
            }
        }
    }
    /**
     * Combine two compounds by applying a factor on the second compound.
     * @param other Another compount
     * @param factor The factor to use on the other compound
     * @returns The combination of the two compounds
     */
    protected combine(other: C, factor: number): Exponents<T> {
        const exponents_combined: Exponents<T> = {};
        for (const t in this.exponents) {
            exponents_combined[t] = this.getExponent(t);
        }
        for (const t in other.exponents) {
            exponents_combined[t] = this.getExponent(t) + factor * other.getExponent(t);
        }
        return exponents_combined;
    }
    /**
     * Multiply this compound by another after applying an exponent on the second compound.
     * @param other Another compound fraction
     * @param exponent The exponent to apply on the other compound
     * @returns The product of the two compounds
     */
    public abstract mult(other: C, exponent: number): C;
    /**
     * Determine whether two compounds contain the same units or dimensions.
     * @param other Another compound
     * @returns A boolean
     */
    public is(other: C): boolean {
        const dividend: Exponents<T> = this.combine(other, -1);
        for (let t in dividend) {
            if (!SMath.approx(dividend[t] ?? 0, 0)) {
                return false;
            }
        }
        return true;
    }
    /**
     * Determine the exponent on the specified unit or dimension.
     * @param exponent The unit or dimension to retrieve the exponent from
     * @returns The exponent
     */
    public getExponent(exponent: T): number {
        return this.exponents[exponent] ?? 0;
    }
    /**
     * Generate an array of nonzero exponent units or dimensions.
     * @returns An array of nonzero exponent units or dimensions
     */
    public getNonzeroExponents(): Array<T> {
        const nonzeroExponents: Array<T> = [];
        for (const t in this.exponents) {
            if (this.getExponent(t)) {
                nonzeroExponents.push(t);
            }
        }
        return nonzeroExponents;
    }
    /**
     * Generate LaTeX code for an exponents object.
     * @param expo Any exponents object
     * @returns Partial LaTeX code
     */
    private prettyPrint(expo: Exponents<T>): string {
        let str: string = '';
        for (const t in expo) {
            if (str.length) {
                str += ' \\cdot ';
            }
            const exponent: number = expo[t] ?? 0;
            if (SMath.approx(exponent, 1)) {
                str += this.toLaTeX(t);
            } else if (SMath.approx(exponent, 0.5)) {
                str += '\\sqrt{' + this.toLaTeX(t) + '}';
            } else {
                str += this.toLaTeX(t) + '^{' + exponent.toString() + '}';
            }
        }
        return str;
    }
    /**
     * Generate valid LaTeX code representing this compound.
     * @returns A valid LaTeX equation
     */
    public toString(): string {
        let str: string = '';
        const hasNum: boolean = Object.keys(this.num).length > 0,
            hasDen: boolean = Object.keys(this.den).length > 0;
        if (hasDen) {
            str += '\\frac{';
        }
        if (hasNum) {
            str += this.prettyPrint(this.num);
        } else {
            str += '1';
        }
        if (hasDen) {
            str += '}{' + this.prettyPrint(this.den) + '}';
        }
        return str;
    }
}