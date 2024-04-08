import { SMath } from 'smath';
import { NumberDictionary } from './lib';

/**
 * Represents a compound unit or dimension.
 */
export abstract class Compound {
    public static combine<T extends string>(u: NumberDictionary<T>, v: NumberDictionary<T>, factor: number): NumberDictionary<T> {
        const combined: NumberDictionary<T> = {};
        for (const t in u) {
            combined[t] = u[t] ?? 0;
        }
        for (const t in v) {
            combined[t] = (v[t] ?? 0) + factor * (u[t] ?? 0);
        }
        return combined;
    }
    public static is<T extends string>(u: NumberDictionary<T>, v: NumberDictionary<T>): boolean {
        const dividend: NumberDictionary<T> = Compound.combine(u, v, -1);
        for (const t in dividend) {
            const exponent: number = dividend[t] ?? 0;
            if (SMath.approx(exponent, 0)) {
                return false;
            }
        }
        return true;
    }
    private static split<T extends string>(u: NumberDictionary<T>): { num: NumberDictionary<T>, den: NumberDictionary<T> } {
        let num: NumberDictionary<T> = {},
            den: NumberDictionary<T> = {};
        for (const t in u) {
            const exponent: number = u[t] ?? 0;
            if (exponent > 0) {
                num[t] = exponent;
            } else if (exponent < 0) {
                den[t] = -exponent;
            }
        }
        return {
            num: num,
            den: den,
        };
    }
    /**
     * Generate LaTeX code for a number dictionary.
     * @param dict Any number dictionary
     * @returns Partial LaTeX code
     */
    private static prettyPrint<T extends string>(dict: NumberDictionary<T>, toLaTeX: (exponent: T) => string): string {
        let str: string = '';
        for (const t in dict) {
            if (str.length) {
                str += ' \\cdot ';
            }
            const exponent: number = dict[t] ?? 0;
            if (SMath.approx(exponent, 1)) {
                str += toLaTeX(t);
            } else if (SMath.approx(exponent, 0.5)) {
                str += '\\sqrt{' + toLaTeX(t) + '}';
            } else {
                str += toLaTeX(t) + '^{' + exponent.toString() + '}';
            }
        }
        return str;
    }
    public static toString<T extends string>(u: NumberDictionary<T>, toLaTeX: (exponent: T) => string): string {
        let str: string = '';
        const frac = this.split(u);
        const hasNum: boolean = Object.keys(frac.num).length > 0,
            hasDen: boolean = Object.keys(frac.den).length > 0;
        if (hasDen) {
            str += '\\frac{';
        }
        if (hasNum) {
            str += this.prettyPrint(frac.num, toLaTeX);
        } else {
            str += '1';
        }
        if (hasDen) {
            str += '}{' + this.prettyPrint(frac.den, toLaTeX) + '}';
        }
        return str;
    }
}