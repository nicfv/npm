import { SMath } from '../index.js';

/**
 * Represents basic functions for a differential equation.
 */
class DifferentialEquationBase {
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
     * @param dnx For a one-dimensional DE of order `n`, define `d(n)x/dt(n)` as a function of `t`, `x`, `dx/dt`, `d2x/dt2`, ..., `d(n-1)x/dt(n-1)`.
     * @param x0 An array of the first `n` initial conditions for `x`, `dx/dt`, `d2x/dt2`, ..., `d(n-1)x/dt(n-1)`.
     */
    constructor(private readonly order: number) {
        if (order < 1) {
            throw new Error('This differential equation should be at least first order.');
        }
        this.data = [];
        this.params = [];
    }
    /**
     * Set the differential equation as a function of `d(i)x` where `i` is the derivative order from `[0,n-1]` and the initial conditions at time `t=0`.
     * Parameters for `dnx` should be ordered by `x`, `dx/dt`, `d2x/dt2`, ..., `d(n-1)x/dt(n-1)`
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
     * Set the parameters for the next step of the differential equation
     * @param x Parameters used in `d(n)x/dt(n)`, such as `x`, `dx` ... `d(n-1)x/dt(n-1)`
     */
    public setParams(...x: number[] = this.getParams()): void {
        this.params = [...x];
    }
    /**
     * Get all the derivatives for this equation at time `t`
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
     * Get a timeseries array for the `i`th derivative
     * @param i The derivative order (default = 0)
     * @returns An array containing the timestamp and `d(i)x/dt(i)` evaluated at that timestamp
     */
    public getTimeseries(i = 0): Timeseries<number>[] {
        if (i < 0 || i > this.order || !Number.isInteger(i)) {
            throw new Error(`Derivative order ${i} is out of range [0,${this.order}] or is not an integer.`);
        }
        // Format the time series data
        const timeseries: Timeseries<number>[] = [];
        this.data.forEach(step => timeseries.push({ time: step.time, data: step.dx[i] }));
        return timeseries;
    }
}

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

/**
 * Represents a system of differential equations.
 */
export class DifferentialSystem {
    /**
     * Represents the actual differential equations within the system.
     */
    private readonly equations: DifferentialEquationBase[];
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
        if (this.equations[dimension] instanceof DifferentialEquationBase) {
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
        this.equations.forEach(de => de.)
        // Step through each differential equation
        for (let t = 0; t < tf; t += dt) {
            this.equations.forEach(de => de.step(dt));
        }
    }
    /**
     * Get a timeseries array of values for the `i`th derivative across all dimensions
     * @param i The derivative order (default = 0)
     * @returns An array containing the timestamp and all dimensions of `d(i)x/dt(i)` evaluated at that timestamp
     */
    public getTimeseries(i = 0): Timeseries<number[]>[] {
        const data: Timeseries<number>[][] = this.equations.map(eqn => eqn.getTimeseries(i));
        const timeseries: Timeseries<number[]>[] = [];
        for (const value of data[0]) {
            timeseries.push({ time: value.time, data: [value.data] });
            for (let dim = 1; dim < this.dimensions; dim++) {
                timeseries[timeseries.length - 1].data.push(data[dim][timeseries.length - 1].data);
            }
        }
        return timeseries;
    }
}
