import { prefixes } from '.';
import { Compound } from './compound';
import { Dimension } from './dimension';
import { Prefix } from './prefix';

/**
 * Represents a measurable unit.
 */
export class Unit extends Compound<Unit> {
    /**
     * The scale factor of this unit relative to the base unit of this dimension.
     */
    private readonly scale: number = 1;
    /**
     * The base dimensions of this unit.
     */
    public readonly dimensions: Dimension = new Dimension();
    /**
     * Define a new named unit.
     * @param LaTeXsymbol The LaTeX code for this unit
     * @param base The base dimension or makeup of unit(s)
     * @param scale The scale factor of this unit relative to the units in `base`
     * @param allowPrefix Whether or not this unit can have a prefix applied
     * @param prefix The prefix of this unit, used for magnitude scaling
     */
    constructor(LaTeXsymbol?: string | Map<Unit, number>, base?: Dimension | Unit, scale = 1, private readonly allowPrefix = true, private readonly prefix?: Prefix) {
        super(() => this, LaTeXsymbol);
        if (typeof LaTeXsymbol === 'string') {
            if (base instanceof Dimension) {
                // Initialize from base dimension(s)
                this.dimensions = new Dimension().times(base);
            } else if (base instanceof Unit) {
                // Initialize based on other unit(s)
                this.scale = base.scale * (base.prefix?.scale ?? 1) * scale;
                this.dimensions = new Dimension().times(base.dimensions);
            }
        } else if (LaTeXsymbol instanceof Map) {
            // Create a resultant unit based on other unit(s)
            for (const [factor, exponent] of LaTeXsymbol) {
                this.dimensions = this.dimensions.times(factor.dimensions.pow(exponent));
                this.scale *= ((factor.scale * (factor.prefix?.scale ?? 1)) ** exponent);
            }
        }
    }
    /**
     * Scale this unit by applying a prefix.
     * @param prefix The prefix to apply
     * @returns A properly scaled unit
     */
    public pre(prefix: Prefix = prefixes.one): Unit {
        if (typeof this.LaTeX !== 'string') {
            throw new Error('Can only add a prefix to named units.');
        }
        if (!this.allowPrefix) {
            throw new Error('This unit cannot have a prefix.');
        }
        if (this.prefix) {
            throw new Error('This unit already has a prefix.');
        }
        return new Unit(new Map([[this, 1]]), undefined, undefined, true, prefix);
        // return new Unit(this.LaTeX, this.dimensions, this.scale, true, prefix);
    }
    /**
     * Calculate the conversion factor between this unit and another unit.
     * @param other Another unit to convert to
     * @returns The conversion factor between this unit and another
     */
    public to(other: Unit): number {
        if (this.dimensions.is(other.dimensions)) {
            return this.scale * (this.prefix?.scale ?? 1) / (other.scale * (other.prefix?.scale ?? 1));
        } else {
            throw new Error('Dimensions on ' + this.toString() + ' does not match dimensions on ' + other.toString() + '!');
        }
    }
    protected fromMap(factors: Map<Unit, number>): Unit {
        return new Unit(factors);
    }
    public override is(other: Unit): boolean {
        return this.prefix === other.prefix && super.is(other);
    }
    /**
     * Generate LaTeX code for rendering this unit.
     * @returns A string representation of this unit
     */
    public override toString(): string {
        if (this.prefix) {
            return '{' + this.prefix.LaTeX + super.toString() + '}';
        } else {
            return super.toString();
        }
    }
}