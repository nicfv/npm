import { DifferentialEquationBase } from './base.js';
import { Equation, Step } from './types';

/**
 * Represents a one dimensional time-dependent differential equation.
 */
export class DifferentialEquation {
    /**
     * Contains methods and data for the actual differential equation
     */
    private readonly DE: DifferentialEquationBase;
    /**
     * Initialize a new one-dimensional differential equation.
     * @param dnx Equation for `d(n)x/dt(n)` as a function of `t`, `x`, `dx/dt`, ..., `d(n-1)x/dt(n-1)`
     * @param x0 Initial conditions ordered by `x`, `dx/dt`, ..., `d(n-1)x/dt(n-1)`
     */
    constructor(dnx: Equation, ...x0: number[]) {
        this.DE = new DifferentialEquationBase(dnx, ...x0);
    }
    /**
     * Solve this differential equation from `t=0` to `t=tf` with timestep `dt`.
     * @param dt The timestep
     * @param tf The final time
     * @returns An array containing each timestep and all orders of derivatives
     */
    public solve(dt: number, tf: number): Step[] {
        // Validate inputs
        if (!Number.isFinite(dt) || dt <= 0) {
            throw new Error('Timestep must be positive.');
        }
        if (!Number.isFinite(tf) || tf < 0) {
            throw new Error('Final time must be non-negative.');
        }
        if (this.DE.getTime() > 0) {
            throw new Error('Solution already computed.');
        }
        // Actually solve the equation
        while (this.DE.getTime() < tf) {
            this.DE.setParams(...this.DE.getParams());
            this.DE.step(dt);
        }
        return this.DE.getData();
    }
}
