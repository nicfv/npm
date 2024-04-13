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
        | 'force' | 'power';
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
        public readonly dimensions: Dimension.Dimension;
        /**
         * Define a new measurement type.
         * @param latex A valid LaTeX equation representing this measurement type
         * @param exponents The exponents of the measurements that make up this type
         * @param base Determines the base dimension measured by this type (overrides `exponents`)
         */
        constructor(private readonly latex: string, exponents: Exponents, base?: Dimension.Name) {
            const dimExpTemp: Dimension.Exponents = base ? { [base]: 1 } : exponents;
            super(dimExpTemp, t => Table[t]().latex);
            if (base) {
                this.dimensions = new Dimension.Dimension(dimExpTemp);
            } else {
                this.dimensions = Dimension.None;
                for (const m in exponents) {
                    const exponent: number = exponents[m as Name] ?? 0;
                    this.dimensions = this.dimensions.mult(Table[m as Name]().dimensions, exponent);
                }
            }
        }
        public mult(other: Measure, exponent: number): Measure {
            return new Measure('', super.combine(other, exponent));
        }
        public override toString(): string {
            return this.latex ?? super.toString();
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
        time: () => new Measure('t', {}, 'time'),
        length: () => new Measure('x', {}, 'length'),
        mass: () => new Measure('m', {}, 'mass'),
        current: () => new Measure('I', {}, 'current'),
        temperature: () => new Measure('T', {}, 'temperature'),
        substance: () => new Measure('n', {}, 'substance'),
        intensity: () => new Measure('I_{V}', {}, 'intensity'),
        area: () => new Measure('A', { length: 2 }),
        volume: () => new Measure('V', { length: 3 }),
        velocity: () => new Measure('v', { length: 1, time: -1 }),
        acceleration: () => new Measure('a', { length: 1, time: -2 }),
        force: () => new Measure('F', { mass: 1, acceleration: 1 }),
        power: () => new Measure('P', { force: 1, length: 1 }),
    };
    /**
     * Get the corresponding measure data for the type name.
     * @param measure The measure name
     * @returns The measure object
     */
    export function get(measure: Name): Measure {
        return Table[measure]();
    }
    /**
     * Return the common measurement name for this type, or undefined if none exist.
     * @param measure_or_dimension The measure or dimension object
     * @returns The common measurement name, if one exists
     */
    export function is(measure_or_dimension: Measure | Dimension.Dimension): Name | undefined {
        const dimension: Dimension.Dimension = (measure_or_dimension instanceof Measure) ? measure_or_dimension.dimensions : measure_or_dimension;
        for (const m in Table) {
            if (dimension.is(Table[m as Name]().dimensions)) {
                return (m as Name);
            }
        }
        return undefined;
    }
    /**
     * Represents a dimensionless measurement type.
     */
    export const None = new Measure('1', {});
}