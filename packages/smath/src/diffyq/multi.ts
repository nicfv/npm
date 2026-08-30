import { SMath } from '../index.js';
import { DifferentialEquationBase } from './base.js';
import { Equation, Step } from './types.js';

/**
 * Represents a system of differential equations.
 */
export class DifferentialSystem {
    /**
     * Represents the actual differential equations within the system
     */
    private readonly equations: DifferentialEquationBase[];
    /**
     * Initialize a new system of differential equations.
     * @param equations The differential equations that make up this system
     */
    constructor(private readonly dimensions: number) {
        if (dimensions < 1 || !Number.isInteger(dimensions)) {
            throw new Error(`Dimension (${dimensions}) should be a positive integer.`);
        }
        this.equations = [];
    }
    /**
     * Set a differential equation for a specific dimension. All differential equations must be set before solving.
     * @param dimension The 0-indexed dimension number to set the equation for
     * @param equation The differential equation to use for this dimension
     */
    public setEquationFor(dimension: number, dnx: Equation, ...x0: number[]): void {
        if (dimension < 0 || dimension >= this.dimensions || !Number.isInteger(dimension)) {
            throw new Error(`Dimension ${dimension} is outside range [0,${this.dimensions - 1}] or is not an integer.`);
        }
        if (this.equations[dimension] instanceof DifferentialEquationBase) {
            throw new Error(`Equation for dimension ${dimension} has already been set.`);
        }
        this.equations[dimension] = new DifferentialEquationBase(dnx, ...x0);
    }
    /**
     * Solve this system of differential equations from `t=0` to `t=tf` with timestep `dt`.
     * @param dt The timestep
     * @param tf The final time
     * @returns Square array with the first index being the 0-indexed dimension and second index being the time index, each entry contains the timestamp and all orders of derivatives
     */
    public solve(dt: number, tf: number): Step[][] {
        // Validate inputs
        if (!Number.isFinite(dt) || dt <= 0) {
            throw new Error('Timestep must be positive.');
        }
        if (!Number.isFinite(tf) || tf < 0) {
            throw new Error('Final time must be non-negative.');
        }
        // Make sure that all equations have been set
        for (let dim = 0; dim < this.dimensions; dim++) {
            if (!(this.equations[dim] instanceof DifferentialEquationBase)) {
                throw new Error(`Dimension ${dim} has not been assigned a differential equation.`);
            }
        }
        // Step through each differential equation
        while (this.equations[0].getTime() < tf) {
            const dth: number = SMath.clamp(dt, 0, tf - this.equations[0].getTime());
            const params: number[] = this.equations.map(eq => eq.getParams()).flat();
            this.equations.forEach(de => de.setParams(...params));
            this.equations.forEach(de => de.step(dth));
        }
        return this.equations.map(de => de.getData());
    }
}
