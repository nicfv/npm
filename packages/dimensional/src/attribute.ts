import { Compound } from './compound';
import { Dimension } from './dimension';
/**
 * Contains all software used for the calculation of attributes.
 */
export namespace Attribute {
    /**
     * Contains definitions for common attribute names.
     */
    export type Name = Dimension.Name
        | 'area' | 'volume'
        | 'velocity' | 'acceleration'
        | 'force' | 'energy' | 'power'
        | 'pressure' | 'flow' | 'viscosity';
    /**
     * Is an object containing keys of attributes and values of nonzero exponents.
     */
    export interface Exponents extends Compound.Exponents<Name> { };
    /**
     * Contains information for an attribute.
     */
    export class Attribute extends Compound.Compound<Name, Attribute> {
        /**
         * Contains the base dimensions for this attribute.
         */
        public readonly dimension: Dimension.Dimension;
        /**
         * Define a new attribute.
         * @param exponents The exponents of the attributes that make up this type
         * @param latex A valid LaTeX equation representing this attributes
         * @param base Determines the base dimension measured by this type (overrides `exponents`)
         */
        constructor(exponents: Exponents, private readonly latex: string = '', base?: Dimension.Name) {
            const dimExpTemp: Dimension.Exponents = base ? { [base]: 1 } : exponents;
            super(dimExpTemp, t => Table[t]().latex);
            if (base) {
                this.dimension = new Dimension.Dimension(dimExpTemp);
            } else {
                this.dimension = Dimension.None;
                for (const m in exponents) {
                    const exponent: number = exponents[m as Name] ?? 0;
                    this.dimension = this.dimension.mult(Table[m as Name]().dimension, exponent);
                }
            }
        }
        public mult(other: Attribute, exponent: number): Attribute {
            return new Attribute(super.combine(other, exponent));
        }
        /**
         * Return the common attribute name for this type, or undefined if none exist.
         * @returns The common attribute name, if one exists
         */
        public getName(): Name | undefined {
            for (const m in Table) {
                if (this.dimension.is(Table[m as Name]().dimension)) {
                    return (m as Name);
                }
            }
            return undefined;
        }
        /**
         * Determine the equivalent attribute type, else return this object.
         * @returns The equivalent attribute type, if one exists
         * @example
         * `mass` * `velocity^2` => `energy`
         * `time` * `time` => `time^2` // no equivalent
         */
        public simplify(): Attribute {
            const name: Name | undefined = this.getName();
            if (name) {
                return new Attribute({ [name]: 1 }, Table[name]().latex);
            } else {
                return this;
            }
        }
        public override toString(): string {
            return (this.latex || super.toString());
        }
    }
    /**
     * The template type for the table of attributes.
     */
    type Attributes = { [index in Name]: () => Attribute };
    /**
     * Contains information for common types of attributes.
     */
    const Table: Attributes = {
        time: () => new Attribute({}, 't', 'time'),
        length: () => new Attribute({}, 'x', 'length'),
        mass: () => new Attribute({}, 'm', 'mass'),
        current: () => new Attribute({}, 'I', 'current'),
        temperature: () => new Attribute({}, 'T', 'temperature'),
        substance: () => new Attribute({}, 'n', 'substance'),
        intensity: () => new Attribute({}, 'I_{V}', 'intensity'),
        area: () => new Attribute({ length: 2 }, 'A'),
        volume: () => new Attribute({ length: 3 }, 'V'),
        velocity: () => new Attribute({ length: 1, time: -1 }, 'v'),
        acceleration: () => new Attribute({ length: 1, time: -2 }, 'a'),
        force: () => new Attribute({ mass: 1, acceleration: 1 }, 'F'),
        energy: () => new Attribute({ force: 1, length: 1 }, 'E'), // Same as mv^2, mgh, ...
        power: () => new Attribute({ energy: 1, time: -1 }, 'P'),
        pressure: () => new Attribute({ force: 1, area: -1 }, 'P'),
        flow: () => new Attribute({ volume: 1, time: -1 }, 'Q'),
        viscosity: () => new Attribute({ pressure: 1, time: -1 }, '\\mu'),
    };
    /**
     * Represents a dimensionless attribute.
     */
    export const None = new Attribute({});
}