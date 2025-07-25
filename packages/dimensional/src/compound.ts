import * as SMath from 'smath';

/**
 * Represents a mathematical symbol.
 */
export interface MathSymbol {
    /**
     * The LaTeX code for this `MathSymbol`
     */
    readonly LaTeX: string;
}

/**
 * Represents a compound number.
 */
export class Compound<T extends MathSymbol> {
    /**
     * Terms and their exponents
     */
    private readonly factors: Map<T, number>;
    /**
     * Terms in the numerator
     */
    private readonly num: Map<T, number>;
    /**
     * Terms in the denominator
     */
    private readonly den: Map<T, number>;
    /**
     * Create a new compound.
     * @param termsAndExponents An array of terms in this compound and their exponents
     */
    constructor(termsAndExponents: Array<[T, number]>) {
        this.factors = new Map(termsAndExponents);
        this.num = new Map();
        this.den = new Map();
        this.factors.forEach((exponent: number, factor: T) => {
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
    public getTerms(): Array<T> {
        return [...this.factors.keys()];
    }
    /**
     * Determine the exponent on the specified factor.
     * @param factor The factor to search for
     * @returns The exponent on `factor`
     */
    public getExponent(factor: T): number {
        return this.factors.get(factor) ?? 0;
    }
    /**
     * Multiply this compound by another.
     * @param other Another term or compound of similar terms
     * @returns The product of two compounds
     */
    public times(other: T | Compound<T>): Compound<T> {
        if (!(other instanceof Compound)) {
            other = new Compound([[other, 1]]);
        }
        const product: Map<T, number> = new Map(this.factors.entries());
        other.getTerms().forEach((term: T) => {
            product.set(term, (product.get(term) ?? 0) + other.getExponent(term));
        });
        return new Compound<T>([...product.entries()]);
    }
    /**
     * Raise this compound to an exponent.
     * @param exponent The exponent to raise this compound by
     * @returns The power of this compound and exponent
     */
    public pow(exponent: number): Compound<T> {
        const power: Map<T, number> = new Map(this.factors.entries());
        power.forEach((currentExponent: number, factor: T) => {
            power.set(factor, currentExponent * exponent);
        });
        return new Compound<T>([...power.entries()]);
    }
    /**
     * Divide this compound by another.
     * @param dividend The compound to divide by
     * @returns The quotient of two compounds
     */
    public over(dividend: T | Compound<T>): Compound<T> {
        if (!(dividend instanceof Compound)) {
            dividend = new Compound([[dividend, 1]]);
        }
        return this.times(dividend.pow(-1));
    }
    /**
     * Determine if this compound is made up of the same factors as another.
     * @param other Another compound to compare to
     * @returns Whether or not this compound matches another
     */
    public is(other: Compound<T>): boolean {
        const quotient: Compound<T> = this.over(other);
        return quotient.num.size === 0 && quotient.den.size === 0;
    }
    /**
     * Pretty-print this compound as a LaTeX formula.
     * @returns The compound written as a LaTeX formula
     */
    public toString(): string {
        let strNum: string = '',
            strDen: string = '';
        this.num.forEach((exponent: number, factor: T) => {
            if (strNum) {
                strNum += ' \\cdot ';
            }
            strNum += Compound.strFactor(factor.LaTeX, exponent);
        });
        this.den.forEach((exponent: number, factor: T) => {
            if (strDen) {
                strDen += ' \\cdot ';
            }
            strDen += Compound.strFactor(factor.LaTeX, exponent);
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
