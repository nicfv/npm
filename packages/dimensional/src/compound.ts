import * as SMath from 'smath';

/**
 * Represents a compound number.
 */
export class Compound<C extends object> {
    /**
     * Terms and their exponents
     */
    private readonly factors: Map<C, number>;
    /**
     * Terms in the numerator
     */
    private readonly num: Map<C, number>;
    /**
     * Terms in the denominator
     */
    private readonly den: Map<C, number>;
    /**
     * Create a new compound.
     * @param termsAndExponents An array of terms in this compound and their exponents
     */
    constructor(termsAndExponents: Array<[C, number]>) {
        this.factors = new Map(termsAndExponents);
        this.num = new Map();
        this.den = new Map();
        this.factors.forEach((exponent: number, factor: C) => {
            if (exponent > 0) {
                this.num.set(factor, exponent);
            } else if (exponent < 0) {
                this.den.set(factor, -exponent);
            }
        });
    }
    /**
     * Get all nonzero terms in this compound.
     * @returns An array of all terms
     */
    public getTerms(): Array<C> {
        return [...this.factors.keys()];
    }
    /**
     * Determine the exponent on the specified factor.
     * @param factor The factor to search for
     * @returns The exponent on `factor`
     */
    public getExponent(factor: C): number {
        return this.factors.get(factor) ?? 0;
    }
    /**
     * Multiply this compound by another.
     * @param other Another compound of similar terms
     * @returns The product of two compounds
     */
    public times(other: Compound<C>): Compound<C> {
        const product: Map<C, number> = new Map(this.factors.entries());
        other.getTerms().forEach((term: C) => {
            product.set(term, (product.get(term) ?? 0) + other.getExponent(term));
        });
        return new Compound<C>([...product.entries()]);
    }
    /**
     * Raise this compound to an exponent.
     * @param exponent The exponent to raise this compound by
     * @returns The power of this compound and exponent
     */
    public pow(exponent: number): Compound<C> {
        const power: Map<C, number> = new Map(this.factors.entries());
        power.forEach((currentExponent: number, factor: C) => {
            power.set(factor, currentExponent * exponent);
        });
        return new Compound<C>([...power.entries()]);
    }
    /**
     * Divide this compound by another.
     * @param dividend The compound to divide by
     * @returns The quotient of two compounds
     */
    public over(dividend: Compound<C>): Compound<C> {
        return this.times(dividend.pow(-1));
    }
    /**
     * Determine if this compound is made up of the same factors as another.
     * @param other Another compound to compare to
     * @returns Whether or not this compound matches another
     */
    public is(other: Compound<C>): boolean {
        const quotient: Compound<C> = this.over(other);
        return quotient.num.size === 0 && quotient.den.size === 0;
    }
    /**
     * Pretty-print this compound as a LaTeX formula.
     * @param toLaTeX The function to convert `C` to a LaTeX string
     * @returns The compound written as a LaTeX formula
     */
    public LaTeX(toLaTeX: (factor: C) => string): string {
        let strNum: string = '',
            strDen: string = '';
        this.num.forEach((exponent: number, factor: C) => {
            if (strNum) {
                strNum += ' \\cdot ';
            }
            strNum += Compound.strFactor(toLaTeX(factor), exponent);
        });
        this.den.forEach((exponent: number, factor: C) => {
            if (strDen) {
                strDen += ' \\cdot ';
            }
            strDen += Compound.strFactor(toLaTeX(factor), exponent);
        });
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
