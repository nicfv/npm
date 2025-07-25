import * as SMath from 'smath';

export interface Factors {
    [factor: string]: number;
}

/**
 * Represents a compound number.
 */
export class Compound {
    /**
     * Terms in the numerator
     */
    private readonly num: Factors;
    /**
     * Terms in the denominator
     */
    private readonly den: Factors;
    /**
     * Create a new compound.
     * @param factors Terms and their exponents
     */
    constructor(private readonly factors: Factors) {
        this.num = {};
        this.den = {};
        for (const factor in factors) {
            const exponent: number = this.getExponent(factor);
            if (exponent > 0) {
                this.num[factor] = exponent;
            } else if (exponent < 0) {
                this.den[factor] = -exponent;
            }
        }
    }
    /**
     * Get all nonzero terms in this compound.
     * @returns An array of all terms
     */
    public getTerms(): Array<string> {
        return Object.keys(this.factors);
    }
    /**
     * Determine the exponent on the specified factor.
     * @param factor The factor to search for
     * @returns The exponent on `factor`
     */
    public getExponent(factor: string): number {
        return this.factors[factor] ?? 0;
    }
    /**
     * Multiply this compound by another.
     * @param other Another compound of similar terms
     * @returns The product of two compounds
     */
    public times(other: Compound): Compound {
        const product: Factors = {};
        other.getTerms().forEach((term: string) => {
            product[term] = (product[term] ?? 0) + other.getExponent(term);
        });
        return new Compound(product);
    }
    /**
     * Raise this compound to an exponent.
     * @param exponent The exponent to raise this compound by
     * @returns The power of this compound and exponent
     */
    public pow(exponent: number): Compound {
        const power: Factors = {};
        this.getTerms().forEach((term: string) => {
            power[term] = this.factors[term] * exponent;
        });
        return new Compound(power);
    }
    /**
     * Divide this compound by another.
     * @param dividend The compound to divide by
     * @returns The quotient of two compounds
     */
    public over(dividend: Compound): Compound {
        return this.times(dividend.pow(-1));
    }
    /**
     * Determine if this compound is made up of the same factors as another.
     * @param other Another compound to compare to
     * @returns Whether or not this compound matches another
     */
    public is(other: Compound): boolean {
        const quotient: Compound = this.over(other);
        return quotient.num.size === 0 && quotient.den.size === 0;
    }
    /**
     * Pretty-print this compound as a LaTeX formula.
     * @param toLaTeX The function to convert `C` to a LaTeX string
     * @returns The compound written as a LaTeX formula
     */
    public LaTeX(): string {
        let strNum: string = '',
            strDen: string = '';
        for (const factor in this.num) {
            const exponent: number = this.getExponent(factor);
            if (strNum) {
                strNum += ' \\cdot ';
            }
            strNum += Compound.strFactor(factor, exponent);
        }
        for (const factor in this.den) {
            const exponent: number = this.getExponent(factor);
            if (strDen) {
                strDen += ' \\cdot ';
            }
            strDen += Compound.strFactor(factor, exponent);
        }
        if (strDen) {
            return '\\frac{' + (strNum || '1') + '}{' + strDen + '}';
        }
        return strNum || '1';
    }
    /**
     * Render a single factor in LaTeX markup.
     * @param LaTeX LaTeX symbol to render
     * @param exponent The exponent on this factor
     * @returns A LaTeX representation of a factor
     */
    private static strFactor(LaTeX: string, exponent: number): string {
        const rat = SMath.rat(exponent, 0.01);
        if (rat.num === 1 && rat.den === 1) {
            return LaTeX;
        }
        if (rat.num === 1 && rat.den === 2) {
            return '\\sqrt{' + LaTeX + '}';
        }
        if (rat.den === 1) {
            return LaTeX + '^{' + rat.num + '}';
        }
        return LaTeX + '^\\frac{' + rat.num + '}{' + rat.den + '}';
    }
}
