import { SMath } from '../index.js';
import { DifferentialEquationBase } from './base.js';
import { InvalidFinalTimeError, InvalidTimestepError } from './errors.js';
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
     * @example
     * // y = e^x can be represented by dx/dt = x, at time t=0, x=1
     * const exp = new DifferentialEquation((t, x) => x, 1);
     */
    constructor(dnx: Equation, ...x0: number[]) {
        this.DE = new DifferentialEquationBase(dnx, ...x0);
    }
    /**
     * Solve this differential equation from `t=0` to `t=tf` with timestep `dt`.
     * @param dt The timestep
     * @param tf The final time
     * @returns An array containing each timestep and all orders of derivatives
     * @example
     * const data = exp.solve(1e-3, 4);
     */
    public solve(dt: number, tf: number): Step[] {
        // Validate inputs
        if (!Number.isFinite(dt) || dt <= 0) {
            throw new InvalidTimestepError();
        }
        if (!Number.isFinite(tf) || tf <= this.DE.getTime()) {
            throw new InvalidFinalTimeError();
        }
        // For a single equation, the state vector is the local state of the equation
        while (this.DE.getTime() < tf) {
            const dth: number = SMath.clamp(dt, 0, tf - this.DE.getTime());
            this.DE.setState(...this.DE.getState());
            this.DE.step(dth);
        }
        return this.DE.getData();
    }
}
