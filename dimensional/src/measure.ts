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
     * Contains information for a measurement type.
     */
    interface Measure {
        /**
         * The LaTeX representation of this measurement type.
         */
        readonly latex: string;
        /**
         * The base dimensions for this measurement.
         */
        readonly dim: Dimension.Exponents;
    }
    /**
     * Contains information for common types of measurement types.
     */
    export const Table: { [index in Name]: Measure } = {
        time: { latex: 't', dim: { time: 1 } },
        length: { latex: '\\Delta x', dim: { length: 1 } },
        mass: { latex: 'm', dim: { mass: 1 } },
        current: { latex: 'I', dim: { current: 1 } },
        temperature: { latex: 'T', dim: { temperature: 1 } },
        substance: { latex: 'n', dim: { substance: 1 } },
        intensity: { latex: 'I_{V}', dim: { intensity: 1 } },
        area: { latex: 'A', dim: { length: 2 } },
        volume: { latex: 'V', dim: { length: 3 } },
        velocity: { latex: 'v', dim: { length: 1, time: -1 } },
        acceleration: { latex: 'a', dim: { length: 1, time: -2 } },
        force: { latex: 'F', dim: { mass: 1, length: 1, time: -2 } },
        power: { latex: 'P', dim: { mass: 1, length: 2, time: -2 } },
    };
}