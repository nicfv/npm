import { SMath } from '../index.js';
import { Equation, Step } from './types.js';

/**
 * Represents basic functions for a differential equation.
 */
export class DifferentialEquationBase {
    /**
     * Stores information for this differential equation
     */
    private readonly data: Step[];
    /**
     * Represents the actual time-dependent differential equation
     */
    private dnx?: Equation;
    /**
     * Arbitrary array of parameters used for the `d(n)x/dt(n)` equation
     */
    private params: number[];
    /**
     * Create a new differential equation.
     * @param order The highest derivative order of this differential equation
     */
    constructor(private readonly order: number) {
        if (order < 1) {
            throw new Error('This differential equation should be at least first order.');
        }
        this.data = [];
        this.params = [];
    }
    /**
     * Set the differential equation as a function of time and arbitrary parameters and the initial conditions at time `t=0`.
     * @param dnx The formula for `d(n)x/dt(n)` where `n` is the highest order
     * @param x0 Initial conditions for all `n-1` derivative orders ordered by `x`, `dx/dt`, `d2x/dt2`, ..., `d(n-1)x/dt(n-1)`
     */
    public set(dnx: Equation, ...x0: number[]): void {
        if (this.dnx) {
            throw new Error(`Equation for d${this.order}x/dt${this.order} is already defined.`);
        }
        if (x0.length !== this.order) {
            throw new Error(`Expected ${this.order} initial conditions, found ${x0.length}.`);
        }
        this.dnx = dnx;
        this.data.push({ time: 0, dx: [...x0] });
    }
    /**
     * Calculate `x` and all its derivatives after a timestep `dt`.
     * @param dt The timestep
     */
    public step(dt: number): void {
        // Check for invalid inputs
        if (!this.dnx || this.data.length < 1) {
            throw new Error('Differential equation and initial conditions have not been set up yet.');
        }
        if (!Number.isFinite(dt) || dt <= 0) {
            throw new Error('Timestep must be positive.');
        }
        if (this.params.length !== this.dnx.length - 1) {
            throw new Error(`Equation should accept ${this.params.length + 1} parameters, but actually accepts ${this.dnx.length}.`);
        }
        // Evaluate `d(n)x/dt(n)` at `t=0`
        if (this.data.length === 1 && typeof this.data[0].dx[this.order] !== 'number') {
            this.data[0].dx[this.order] = this.dnx(0, ...this.params);
        }
        // Determine next and current array indices
        const n1: number = this.data.length;
        const n0: number = n1 - 1;
        // Determine current timestamp & copy dx array
        this.data[n1] = {
            time: this.data[n0].time + dt,
            dx: [...this.data[n0].dx],
        };
        // Compute Taylor expansions for all lower-order derivatives.
        // x(t0 + dt) = x(t0) + dt*x'(t0) + 1/2*dt^2*x"(t0) + ... + 1/n!*dt^n*x^(n)(t0)
        for (let i = 0; i < this.order; i++) {
            for (let j = i + 1; j <= this.order; j++) {
                const d: number = j - i;
                this.data[n1].dx[i] += (dt ** d) * this.data[n0].dx[j] / SMath.factorial(d);
            }
        }
        this.data[n1].dx[this.order] = this.dnx(this.data[n1].time, ...this.params);
    }
    /**
     * Set the parameters for the next timestep of this differential equation.
     * @param x Parameters used in `d(n)x/dt(n)`, such as `x`, `dx` ... `d(n-1)x/dt(n-1)`
     */
    public setParams(...x: number[]): void {
        this.params = [...x];
    }
    /**
     * Get all the derivatives for this equation at time `t` in order from lowest to highest order.
     * @returns `x`, `dx` ... `d(n-1)x/dt(n-1)`
     */
    public getParams(): number[] {
        if (!this.dnx || this.data.length < 1) {
            throw new Error('Differential equation and initial conditions have not been set up yet.');
        }
        return this.data[this.data.length - 1].dx.slice(0, -1);
    }
    /**
     * Get the current time of the solution.
     * @returns The current time `t`
     */
    public getTime(): number {
        if (!this.dnx || this.data.length < 1) {
            throw new Error('Differential equation and initial conditions have not been set up yet.');
        }
        return this.data[this.data.length - 1].time;
    }
    /**
     * Get the solution data for this differential equation.
     * @returns An array containing the timestamp and all derivatives evaluated at that timestamp
     */
    public getData(): Step[] {
        return structuredClone(this.data);
    }
}
