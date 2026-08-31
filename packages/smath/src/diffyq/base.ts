import { SMath } from '../index.js';
import { Equation, Step } from './types.js';

/**
 * Represents basic functions for a differential equation.
 */
export class DifferentialEquationBase {
    /**
     * The highest derivative order of this differential equation
     */
    private readonly order: number;
    /**
     * Stores information for this differential equation
     */
    private readonly data: Step[];
    /**
     * Current state vector used to evaluate the derivative equation
     */
    private state: number[];
    /**
     * Create a new differential equation.
     * @param dnx The formula for `d(n)x/dt(n)` where `n` is the highest order
     * @param x0 Initial conditions for all `n-1` derivative orders ordered by `x`, `dx/dt`, `d2x/dt2`, ..., `d(n-1)x/dt(n-1)`
     */
    constructor(private readonly dnx: Equation, ...x0: number[]) {
        this.order = x0.length;
        this.data = [{ time: 0, dx: [...x0] }];
        this.state = [];
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
        if (this.state.length !== this.dnx.length - 1) {
            throw new Error(`Equation should accept ${this.state.length + 1} parameters, but actually accepts ${this.dnx.length}.`);
        }
        // Evaluate `d(n)x/dt(n)` at `t=0`
        if (this.data.length === 1 && typeof this.data[0].dx[this.order] !== 'number') {
            this.data[0].dx[this.order] = this.dnx(0, ...this.state);
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
        this.data[n1].dx[this.order] = this.dnx(this.data[n1].time, ...this.state);
    }
    /**
     * Set the global state vector used by `d(n)x/dt(n)` in the next timestep, such as `x`, `dx/dt`, ..., `d(n-1)x/dt(n-1)`.
     * @param x State values used in `d(n)x/dt(n)`
     */
    public setState(...x: number[]): void {
        this.state = [...x];
    }
    /**
     * Get the current state vector for this equation at time `t`, ordered from lowest derivative to highest order, excluding order `n`.
     * @returns `x`, `dx/dt`, ..., `d(n-1)x/dt(n-1)`
     */
    public getState(): number[] {
        if (!this.dnx || this.data.length < 1) {
            throw new Error('Differential equation and initial conditions have not been set up yet.');
        }
        return this.data[this.data.length - 1].dx.slice(0, this.order);
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
     * Get all data for this differential equation.
     * @returns An array containing each timestamp and all derivatives evaluated at that timestamp
     */
    public getData(): Step[] {
        return structuredClone(this.data);
    }
}
