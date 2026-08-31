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
     * @param dimensions The number of equations in this system
     * @example
     * const system = new DifferentialSystem(3); // x, y, z
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
     * @param de The differential equation for this dimension, which must accept a global state vector ordered as follows:
     * ```
     * x, dx/dt, ..., d(i-1)x/dt(i-1),
     * y, dy/dt, ..., d(j-1)y/dt(j-1),
     * z, dz/dt, ..., d(k-1)z/dt(k-1),
     * ... (higher dimensions)
     * ```
     * Where `i` is the highest order of `x` (dimension 0), `j` is the highest order of `y` (dimension 1) and `k` is the highest order of `z` (dimension 2)
     * @param ic Initial conditions for this dimension, ordered `x`, `dx/dt`, ..., `d(n-1)x/dt(n-1)`
     * @example
     * const sigma = 1;
     * const rho = 1;
     * const beta = 8 / 3;
     * const dx = (t, x, y, z) => sigma * (y - x);
     * const dy = (t, x, y, z) => x * (rho - z) - y;
     * const dz = (t, x, y, z) => x * y - beta * z;
     * system.setEquationFor(0, dx, 10); // x0 = 10
     * system.setEquationFor(1, dy, 10); // y0 = 10
     * system.setEquationFor(2, dz, 10); // z0 = 10
     */
    public setEquationFor(dimension: number, de: Equation, ...ic: number[]): void {
        if (dimension < 0 || dimension >= this.dimensions || !Number.isInteger(dimension)) {
            throw new Error(`Dimension ${dimension} is outside range [0,${this.dimensions - 1}] or is not an integer.`);
        }
        if (this.equations[dimension] instanceof DifferentialEquationBase) {
            throw new Error(`Equation for dimension ${dimension} has already been set.`);
        }
        this.equations[dimension] = new DifferentialEquationBase(de, ...ic);
    }
    /**
     * Solve this system of differential equations from `t=0` to `t=tf` with timestep `dt`.
     * @param dt The timestep
     * @param tf The final time
     * @returns Square array with the first index being the 0-indexed dimension and second index being the time index, each entry contains the timestamp and all orders of derivatives
     * @example
     * const data = system.solve(1e-3, 4);
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
        if (this.equations[0].getTime() > 0) {
            throw new Error('Solution already computed.');
        }
        // Step through each differential equation
        while (this.equations[0].getTime() < tf) {
            const dth: number = SMath.clamp(dt, 0, tf - this.equations[0].getTime());
            const state: number[] = this.equations.map(eq => eq.getState()).flat();
            this.equations.forEach(de => de.setState(...state));
            this.equations.forEach(de => de.step(dth));
        }
        return this.equations.map(de => de.getData());
    }
}
