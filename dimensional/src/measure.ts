import { Compound } from './compound';
import { Dimension } from './dimension';
/**
 * Contains all software used for the calculation of measurement types.
 */
export namespace Measure {
    /**
     * Contains definitions for common measurement names.
     */
    export type Name = Dimension.Name
        | 'area' | 'volume'
        | 'velocity' | 'acceleration'
        | 'force' | 'energy' | 'power';
    /**
     * Is an object containing keys of measurement types and values of nonzero exponents.
     */
    export interface Exponents extends Compound.Exponents<Name> { };
    /**
     * Contains information for a measurement type.
     */
    export class Measure extends Compound.Compound<Name, Measure> {
        /**
         * Contains the base dimensions for this measurement type.
         */
        public readonly dimension: Dimension.Dimension;
        /**
         * Define a new measurement type.
         * @param exponents The exponents of the measurements that make up this type
         * @param latex A valid LaTeX equation representing this measurement type
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
        public mult(other: Measure, exponent: number): Measure {
            return new Measure(super.combine(other, exponent));
        }
        /**
         * Return the common measurement name for this type, or undefined if none exist.
         * @returns The common measurement name, if one exists
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
         * Determine the equivalent measurement type, else return this object.
         * @returns The equivalent measurement type, if one exists
         * @example
         * `mass` * `velocity^2` => `energy`
         * `time` * `time` => `time^2` // no equivalent
         */
        public simplify(): Measure {
            const name: Name | undefined = this.getName();
            if (name) {
                return Table[name]();
            } else {
                return this;
            }
        }
        public override toString(): string {
            return (this.latex || super.toString());
        }
    }
    /**
     * The template type for the table of measures.
     */
    type Measures = { [index in Name]: () => Measure };
    /**
     * Contains information for common types of measurement types.
     */
    const Table: Measures = {
        time: () => new Measure({}, 't', 'time'),
        length: () => new Measure({}, 'x', 'length'),
        mass: () => new Measure({}, 'm', 'mass'),
        current: () => new Measure({}, 'I', 'current'),
        temperature: () => new Measure({}, 'T', 'temperature'),
        substance: () => new Measure({}, 'n', 'substance'),
        intensity: () => new Measure({}, 'I_{V}', 'intensity'),
        area: () => new Measure({ length: 2 }, 'A'),
        volume: () => new Measure({ length: 3 }, 'V'),
        velocity: () => new Measure({ length: 1, time: -1 }, 'v'),
        acceleration: () => new Measure({ length: 1, time: -2 }, 'a'),
        force: () => new Measure({ mass: 1, acceleration: 1 }, 'F'),
        energy: () => new Measure({ force: 1, length: 1 }, 'E'), // Same as mv^2, mgh, ...
        power: () => new Measure({ energy: 1, time: -1 }, 'P'),
    };
    /**
     * Represents a dimensionless measurement type.
     */
    export const None = new Measure({});
}