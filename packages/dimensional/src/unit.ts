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
     */
    constructor(LaTeXsymbol?: string | Map<Unit, number>, base?: Dimension | Unit, scale: number = 1, private readonly allowPrefix: boolean = false) {
        super(() => this, LaTeXsymbol);
        if (typeof LaTeXsymbol === 'string') {
            if (base instanceof Dimension) {
                // Initialize from base dimension(s)
                this.dimensions = new Dimension().times(base);
            } else if (base instanceof Unit) {
                // Initialize based on other unit(s)
                this.scale = base.scale * scale;
                this.dimensions = new Dimension().times(base.dimensions);
            }
        } else if (LaTeXsymbol instanceof Map) {
            // Create a resultant unit based on other unit(s)
            for (const [factor, exponent] of LaTeXsymbol) {
                this.dimensions = this.dimensions.times(factor.dimensions.pow(exponent));
                this.scale *= (factor.scale ** exponent);
            }
        }
    }
    /**
     * Scale this unit by applying a prefix.
     * @param prefix The prefix to apply
     * @returns A properly scaled unit
     */
    public prefix(prefix: Prefix): Unit {
        if (typeof this.LaTeX === 'string' && !this.allowPrefix) {
            return new Unit(prefix.LaTeX + this.LaTeX, this, this.scale * prefix.scale, true);
        } else {
            throw new Error('Can only add a prefix to named base units.');
        }
    }
    /**
     * Calculate the conversion factor between this unit and another unit.
     * @param other Another unit to convert to
     * @returns The conversion factor between this unit and another
     */
    public to(other: Unit): number {
        if (this.dimensions.is(other.dimensions)) {
            return this.scale / other.scale;
        } else {
            throw new Error('Dimensions on ' + this.toString() + ' does not match dimensions on ' + other.toString() + '!');
        }
    }
    protected fromMap(factors: Map<Unit, number>): Unit {
        return new Unit(factors);
    }
}