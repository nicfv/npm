import { SMath } from './index.js';

/**
 * Represents a time-dependent equation.
 */
export type Equation = (t: number) => number;

/**
 * Contains data for a single point in time
 */
interface Step {
    /**
     * The timestamp for this step
     */
    readonly time: number;
    /**
     * The array of all derivative orders by `x`, `dx/dt`, `d2x/dt2`, ..., `dnx/dtn`
     */
    readonly dx: number[];
}

/**
 * Represents a one dimensional time-dependent differential equation.
 */
export class DifferentialEquation {
    /**
     * Stores information for this differential equation
     */
    private readonly data: Step[];
    /**
     * Represents the actual time-dependent differential equation
     */
    private dnx?: Equation;
    /**
     * Create a new differential equation.
     * @param dnx For a one-dimensional DE of order `n`, define `d(n)x/dt(n)` as a function of `t`, `x`, `dx/dt`, `d2x/dt2`, ..., `d(n-1)x/dt(n-1)`.
     * @param x0 An array of the first `n` initial conditions for `x`, `dx/dt`, `d2x/dt2`, ..., `d(n-1)x/dt(n-1)`.
     */
    constructor(private readonly order: number) {
        if (order < 1) {
            throw new Error('This differential equation should be at least first order.');
        }
        this.data = [];
    }
    /**
     * Set the differential equation as a function of `d(i)x` where `i` is the derivative order from `[0,n-1]` and the initial conditions at time `t=0`
     * @param dnx The formula for `d(n)x/dt(n)` where `n` is the highest order
     * @param x0 Initial conditions for all `n-1` derivative orders ordered by `x`, `dx/dt`, `d2x/dt2`, ..., `d(n-1)x/dt(n-1)`
     */
    public set(dnx: Equation, ...x0: number[]): void {
        if (this.dnx) {
            throw new Error(`Equation for d${this.order}x/dt${this.order} is already defined.`);
        }
        if (x0.length !== this.order - 1) {
            throw new Error(`Expected ${this.order - 1} initial conditions, found ${x0.length}.`);
        }
        this.dnx = dnx;
        this.data.push({ time: 0, dx: [...x0] });
    }
    /**
     * Get the current value for the `i`th derivative
     * @param i The derivative order
     * @returns `d(i)x/dt(i)` evaluated at the current time
     */
    public d(i: number): number {
        if (i < 0 || i > this.order || !Number.isInteger(i)) {
            throw new Error(`Derivative order ${i} is out of range [0,${this.order}] or is not an integer.`);
        }
        return this.data[this.data.length - 1].dx[i];
    }
    /**
     * Calculate `x` and all its derivatives after a timestep `dt`.
     * @param dt The timestep.
     */
    public step(dt: number): void {
        // Check for invalid inputs
        if (!this.dnx || this.data.length < 1) {
            throw new Error('Differential equation and initial conditions have not been set up yet.');
        }
        if (!Number.isFinite(dt) || dt <= 0) {
            throw new Error('Timestep must be positive.');
        }
        // Determine next and current array indices
        const n1: number = this.data.length;
        const n0: number = n1 - 1;
        // Evaluate `d(n)x/dt(n)` at time `t=0`
        if (typeof this.data[0].dx[this.order] !== 'number') {
            this.data[0].dx[this.order] = this.dnx(0);
        }
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
        this.data[n1].dx[this.order] = this.dnx(this.data[n1].time);
    }
    /**
     * Solve this differential equation from `t=0` to `t=tf` with timestep `dt`.
     * @param dt The timestep.
     * @param tf The final time.
     */
    public solve(dt: number, tf: number): void {
        if (!Number.isFinite(dt) || dt <= 0) {
            throw new Error('Timestep must be positive.');
        }
        if (!Number.isFinite(tf) || tf < 0) {
            throw new Error('Final time must be non-negative.');
        }
        for (let t = 0; t < tf; t += dt) {
            this.step(dt);
        }
    }
    /**
     * Return an array of all values for time derivative `n` after solving this equation.
     * @param n The order number.
     * @returns Values across time for derivative `n` of this equation.
     */
    public getNthDerivative(n: number): number[] {
        if (n < 0 || n > this.getOrder()) {
            throw new Error('Order number is out of bounds.');
        }
        return [...this.data[n]];
    }
    /**
     * Build and return an array containing `x` and all its derivative values for the current time.
     * @returns `[x, dx/dt, ... d(n)x/dt(n)]`
     */
    public getCurrentValues(): number[] {
        return this.data.map(deriv => deriv[deriv.length - 1]);
    }
    /**
     * Return the array of timesteps after solving the differential equation.
     * @returns The time array
     */
    public getTimeArray(): number[] {
        return [...this.time];
    }
}

/**
 * Represents a system of differential equations.
 */
export class DifferentialSystem {
    /**
     * Represents the actual differential equations within the system.
     */
    private readonly equations: DifferentialEquation[];
    /**
     * Initialize a new system of differential equations.
     * @param equations The differential equations that make up this system
     */
    constructor(private readonly dimensions: number) {
        this.equations = [];
    }
    /**
     * Set a differential equation for a specific dimension. All differential equations must be set before solving.
     * @param dimension The 0-indexed dimension number to set the equation for
     * @param equation The differential equation to use for this dimension
     */
    public setEquationFor(dimension: number, equation: DifferentialEquation): void {
        if (dimension < 0 || dimension >= this.dimensions || !Number.isInteger(dimension)) {
            throw new Error(`Dimension ${dimension} is outside range [0,${this.dimensions - 1}] or is not an integer.`);
        }
        if (this.equations[dimension] instanceof DifferentialEquation) {
            throw new Error(`Equation for dimension ${dimension} has already been set.`);
        }
        this.equations[dimension] = equation;
    }
    /**
     * Solve this system of differential equations from `t=0` to `t=tf` with timestep `dt`
     * @param dt The timestep
     * @param tf The final time
     */
    public solve(dt: number, tf: number): void {
        // Validate inputs
        if (!Number.isFinite(dt) || dt <= 0) {
            throw new Error('Timestep must be positive.');
        }
        if (!Number.isFinite(tf) || tf < 0) {
            throw new Error('Final time must be non-negative.');
        }
        // Make sure that all equations have been set
        for (let dim = 0; dim < this.dimensions; dim++) {
            if (!(this.equations[dim] instanceof DifferentialEquation)) {
                throw new Error(`Dimension ${dim} has not been assigned a differential equation.`);
            }
        }
        // Step through each differential equation
        for (let t = 0; t < tf; t += dt) {
            this.equations.forEach(de => de.step(dt));
        }
    }
    /**
     * Return a single time-series array of values from the solution of this differential system.
     * @param dimension The dimension
     * @param order The order number
     * @returns A time series array of data
     */
    public getData(dimension: number, order: number): number[] {
        return this.equations[dimension].getNthDerivative(order);
    }
}
