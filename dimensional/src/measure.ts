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
    interface Exponents extends Compound.Exponents<Name> { };
    /**
     * Contains information for a measurement type.
     */
    class Measure extends Compound.Compound<Name, Measure> {
        public readonly dimensions: Dimension.Dimension;
        constructor(private readonly latex: string, exponents: Exponents, private readonly isBase: boolean = false) {
            super(exponents, t => latex ?? Table[t]().latex);
            if (isBase) {
                this.dimensions = new Dimension.Dimension(exponents);
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
        public static base(latex: string, dimension: Dimension.Name): Measure {
            return new Measure(latex, { [dimension]: 1 }, true);
        }
    }
    type Measures = { [index in Name]: () => Measure };
    /**
     * Contains information for common types of measurement types.
     */
    export const Table: Measures = {
        time: () => Measure.base('t', 'time'),
        length: () => Measure.base('x', 'length'),
        mass: () => Measure.base('m', 'mass'),
        current: () => Measure.base('I', 'current'),
        temperature: () => Measure.base('T', 'temperature'),
        substance: () => Measure.base('n', 'substance'),
        intensity: () => Measure.base('I_{V}', 'intensity'),
        area: () => new Measure('A', { length: 2 }),
        volume: () => new Measure('V', { length: 3 }),
        velocity: () => new Measure('v', { length: 1, time: -1 }),
        acceleration: () => new Measure('a', { length: 1, time: -2 }),
        force: () => new Measure('F', { mass: 1, acceleration: 1 }),
        power: () => new Measure('P', { force: 1, length: 1 }),
    };
}