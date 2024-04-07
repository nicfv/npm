import { SMath } from 'smath';
import { Dictionary, NumberDictionary } from './lib';

export class Compound<T extends string> {
    private readonly num: NumberDictionary<T> = {};
    private readonly den: NumberDictionary<T> = {};
    constructor(private readonly exponents: NumberDictionary<T>, private readonly dictionary: Dictionary<T>) {
        for (const t in exponents) {
            const exponent: number = exponents[t] ?? 0;
            if (exponent > 0) {
                this.num[t] = exponent;
            } else if (exponent < 0) {
                this.den[t] = -exponent;
            }
        }
    }
    private combine(other: Compound<T>, factor: 1 | -1): Compound<T> {
        const exponents_combined: NumberDictionary<T> = {};
        for (const t in this.exponents) {
            exponents_combined[t] = (this.exponents[t] ?? 0);
        }
        for (const t in other.exponents) {
            exponents_combined[t] = (exponents_combined[t] ?? 0) + factor * (other.exponents[t] ?? 0);
        }
        return new Compound<T>(exponents_combined, this.dictionary);
    }
    public mult(other: Compound<T>): Compound<T> {
        return this.combine(other, 1);
    }
    public div(other: Compound<T>): Compound<T> {
        return this.combine(other, -1);
    }
    public is(other: Compound<T>): boolean {
        const dividend: Compound<T> = this.div(other);
        for (let t in dividend.exponents) {
            const exponent: number = dividend.exponents[t] ?? 0;
            if (exponent) {
                return false;
            }
        }
        return true;
    }
    private prettyPrint(dict: NumberDictionary<T>): string {
        let str: string = '';
        for (const t in dict) {
            const exponent: number = dict[t] ?? 0;
            if (SMath.approx(exponent, 1)) {
                str += this.dictionary[t];
            } else if (SMath.approx(exponent, 0.5)) {
                str += '\\sqrt{' + this.dictionary[t] + '}';
            } else {
                str += this.dictionary[t] + '^{' + exponent.toString() + '}';
            }
        }
        return str;
    }
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