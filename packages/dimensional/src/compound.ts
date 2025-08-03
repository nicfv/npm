import * as SMath from 'smath';

/**
 * Represents a compound number.
 */
export abstract class Compound<T extends Compound<T>> {
    /**
     * The LaTeX representation of this compound
     */
    private readonly LaTeX?: string;
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
     * Either create a new "raw" compound with a variable to the power of one, or initialize a compound from factors and their exponents.
     * @param getChild An internal method for the parent class to obtain the child class. Should return `this`
     * @param data The LaTeX representation of this compound and a method to obtain the child class, or the factors and their exponents that make up this compound
     */
    constructor(private readonly getChild: () => T, data?: string | Map<T, number>) {
        if (typeof data === 'string') {
            if (data.match(/^[a-zA-Z]+$/)) {
                this.LaTeX = '\\text{' + data + '}';
            } else {
                this.LaTeX = data;
            }
            // Factors are empty (this = this^1)
        } else if (data instanceof Map) {
            // Reject "ones" and anything to the power of zero
            const filtered = [...data].filter(([factor, exponent]) => (factor.LaTeX || factor.factors.size > 0) && exponent !== 0);
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
     * Defines a method to initialize a new child of `Compound` solely with a map of factors.
     * @param factors The factors and exponents that make up this compound
     */
    protected abstract fromMap(factors: Map<T, number>): T;
    /**
     * Return a map of factors in this compound.
     * @returns The factors in this compound
     */
    private getFactors(): Map<T, number> {
        if (this.factors.size === 0) {
            return new Map([[this.getChild(), 1]]);
        }
        return new Map(this.factors);
    }
    /**
     * Multiply this compound by another.
     * @param factor Another term or compound of similar terms
     * @returns The product of two compounds
     */
    public times(factor: T): T {
        const product: Map<T, number> = this.getFactors();
        for (const [iFactor, iExponent] of factor.getFactors()) {
            product.set(iFactor, (product.get(iFactor) ?? 0) + iExponent);
        }
        return this.fromMap(product);
    };
    /**
     * Raise this compound to an exponent.
     * @param exponent The exponent to raise this compound by
     * @returns The power of this compound and exponent
     */
    public pow(exponent: number): T {
        const power: Map<T, number> = this.getFactors();
        for (const [iFactor, iExponent] of power) {
            power.set(iFactor, iExponent * exponent);
        }
        return this.fromMap(power);
    };
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
