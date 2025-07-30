import * as SMath from 'smath';

/**
 * Represents a compound number.
 */
export abstract class Compound<T extends Compound<T>> {
    /**
     * The LaTeX representation of this compound
     */
    private readonly LaTeX: string | undefined;
    /**
     * Terms and their exponents
     */
    private readonly factors: Map<T, number> = new Map();
    /**
     * Terms in the numerator
     */
    private readonly num: Map<T, number> = new Map();
    /**
     * Terms in the denominator
     */
    private readonly den: Map<T, number> = new Map();
    /**
     * Either create a new "raw" compound given a LaTeX symbol, or a compound made up of factors and their exponents.
     * @param LaTeX_or_terms The LaTeX representation of this compount, or the makeup of factors and their exponents
     */
    constructor(LaTeX_or_terms: string | Array<[T, number]>) {
        if (typeof LaTeX_or_terms === 'string') {
            this.LaTeX = LaTeX_or_terms;
            // Factors are empty (this = this^1)
        } else if (Array.isArray(LaTeX_or_terms)) {
            // Reject anything to the power of zero
            const filtered = LaTeX_or_terms.filter(([, exponent]) => exponent !== 0);
            this.factors = new Map(filtered);
            // Split factors into a numerator and denominator
            this.factors.forEach((exponent: number, factor: T) => {
                if (exponent > 0) {
                    this.num.set(factor, exponent);
                } else if (exponent < 0) {
                    this.den.set(factor, -exponent);
                }
            });
        }
    }
    /**
     * Get the map of factors and their exponents for a specified compound.
     * @param compound The compound to get factors for
     * @returns The factors for this compound
     */
    private static getFactors<T extends Compound<T>>(compound: T): Map<T, number> {
        if (compound.factors.size) {
            // compound = a^A * b^B * ... * z^Z
            return new Map(compound.factors);
        } else {
            // compound = a^1
            return new Map([[compound, 1]]);
        }
    }
    /**
     * Multiply this compound by another and return the map of factors.
     * @param me This compound
     * @param other Another compound
     * @returns The map of factors of the product of this compound and another
     */
    protected multiplyFactors(me: T, other: T): Map<T, number> {
        const product: Map<T, number> = Compound.getFactors(me);
        [...Compound.getFactors(other)].forEach(([factor, exponent]) => {
            product.set(factor, (product.get(factor) ?? 0) + exponent);
        });
        return product;
    }
    /**
     * Raise this compound by an exponent and return the map of factors.
     * @param me This compound
     * @param exponent Another compound
     * @returns The map of factors of the power of this compound to an exponent
     */
    protected raiseFactors(me: T, exponent: number): Map<T, number> {
        const power: Map<T, number> = new Map();
        [...Compound.getFactors(me)].forEach(([factor, currentExponent]) => {
            power.set(factor, currentExponent * exponent);
        });
        return power;
    }
    /**
     * Multiply this compound by another.
     * @param factor Another term or compound of similar terms
     * @returns The product of two compounds
     */
    public abstract times(factor: T): T;
    /**
     * Raise this compound to an exponent.
     * @param exponent The exponent to raise this compound by
     * @returns The power of this compound and exponent
     */
    public abstract pow(exponent: number): T;
    /**
     * Divide this compound by another.
     * @param dividend The compound to divide by
     * @returns The quotient of two compounds
     */
    public over(dividend: T): T {
        return this.times(dividend.pow(-1));
    }
    /**
     * Determine if this compound is made up of the same factors as another.
     * @param other Another compound to compare to
     * @returns Whether or not this compound matches another
     */
    public is(other: T): boolean {
        return this.over(other).factors.size === 0;
    }
    /**
     * Pretty-print this compound as a LaTeX formula.
     * @returns The compound written as a LaTeX formula
     */
    public toString(): string {
        if (this.LaTeX) {
            return this.LaTeX;
        }
        let strNum: string = '',
            strDen: string = '';
        this.num.forEach((exponent: number, factor: T) => {
            if (strNum) {
                strNum += ' \\cdot ';
            }
            strNum += this.factorToString(factor, exponent);
        });
        this.den.forEach((exponent: number, factor: T) => {
            if (strDen) {
                strDen += ' \\cdot ';
            }
            strDen += this.factorToString(factor, exponent);
        });
        if (strDen) {
            return '\\frac{' + (strNum || '1') + '}{' + strDen + '}';
        }
        return strNum || '1';
    }
    /**
     * Render a single factor in LaTeX markup.
     * @param factor The factor to render
     * @param exponent The exponent on this factor
     * @returns A LaTeX representation of a factor
     */
    private factorToString(factor: T, exponent: number): string {
        const rat = SMath.rat(exponent, 0.01),
            facString: string = '{' + (factor.LaTeX ?? factor.toString()) + '}';
        if (rat.num === 1 && rat.den === 1) {
            return facString;
        }
        if (rat.num === 1 && rat.den === 2) {
            return '\\sqrt{' + facString + '}';
        }
        if (rat.den === 1) {
            return facString + '^{' + rat.num + '}';
        }
        return facString + '^\\frac{' + rat.num + '}{' + rat.den + '}';
    }
}
