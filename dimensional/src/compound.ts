import { SMath } from 'smath';
import { NumberDictionary } from './lib';

/**
 * Represents a compound unit or dimension.
 */
export class Compound<T extends string> {
    private readonly num: NumberDictionary<T> = {};
    private readonly den: NumberDictionary<T> = {};
    /**
     * Create a new compound unit or dimension.
     * @param exponents Contains an object of exponent values
     * @param toLaTeX A function to convert the exponent to its representation in LaTeX
     */
    constructor(private readonly exponents: NumberDictionary<T>, private readonly toLaTeX: (exponent: T) => string) {
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
    private combine(other: Compound<T>, factor: 1 | -1): Compound<T> {
        const exponents_combined: NumberDictionary<T> = {};
        for (const t in this.exponents) {
            exponents_combined[t] = this.getExponent(t);
        }
        for (const t in other.exponents) {
            exponents_combined[t] = this.getExponent(t) + factor * other.getExponent(t);
        }
        return new Compound<T>(exponents_combined, this.toLaTeX);
    }
    /**
     * Multiply this compound by another.
     * @param other Another compound
     * @returns The product
     */
    public mult(other: Compound<T>): Compound<T> {
        return this.combine(other, 1);
    }
    /**
     * Divide this compound by another.
     * @param other Another compound
     * @returns The dividend
     */
    public div(other: Compound<T>): Compound<T> {
        return this.combine(other, -1);
    }
    /**
     * Determine whether two compounds contain the same units or dimensions.
     * @param other Another compound
     * @returns A boolean
     */
    public is(other: Compound<T>): boolean {
        const dividend: Compound<T> = this.div(other);
        for (let t in dividend.exponents) {
            const exponent: number = dividend.getExponent(t);
            if (exponent) {
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
     * Generate LaTeX code for a number dictionary.
     * @param dict Any number dictionary
     * @returns Partial LaTeX code
     */
    private prettyPrint(dict: NumberDictionary<T>): string {
        let str: string = '';
        for (const t in dict) {
            const exponent: number = dict[t] ?? 0;
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