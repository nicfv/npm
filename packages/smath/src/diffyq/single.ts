import { DifferentialEquationBase } from './base.js';
import { Equation } from './types';

/**
 * Represents a one dimensional time-dependent differential equation.
 */
export class DifferentialEquation {
    private readonly DE: DifferentialEquationBase;
    constructor(dnx: Equation, ...x0: number[]) {
        this.DE = new DifferentialEquationBase(x0.length - 1);
        this.DE.set(dnx, ...x0);
    }
    /**
     * Solve this differential equation from `t=0` to `t=tf` with timestep `dt`.
     * @param dt The timestep.
     * @param tf The final time.
     */
    public solve(dt: number, tf: number): void {
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
            this.DE.setParams();
            this.DE.step(dt);
        }
    }
}
