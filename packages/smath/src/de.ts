import { SMath } from './index.js';

/**
 * Represents a one dimensional time-dependent differential equation.
 */
export class DifferentialEquation {
    private readonly time: number[];
    private readonly data: number[][];
    /**
     * Create a new differential equation.
     * @param dnx For one-dimensional DEs, define the equation for `d(n)x/dt(n)` as a function of `t`, `x`, `dx/dt`, `d2x/dt2`, ... `d(n-1)x/dt(n-1)` where `n` is the order.
     * @param x0 An array of `n` initial conditions for all derivatives starting with `x`, `dx/dt`, `d2x/dt2`, ..., `d(n-1)x/dt(n-1)` where `n` is the order.
     */
    constructor(private readonly dnx: (t: number, ...x: number[]) => number, ...x0: number[]) {
        if (x0.length < 1) {
            throw new Error('This differential equation should be at least first order.');
        }
        // Calculate d(n)x/dt(n)|0
        const dnx0: number = dnx(0, ...x0);
        // Set initial time and derivative array
        this.time = [0];
        this.data = [...x0.map(xi => [xi]), [dnx0]];
    }
    /**
     * Return the order of this differential equation.
     * @returns The highest derivative order
     */
    private getOrder(): number {
        return this.data.length - 1;
    }
    /**
     * Calculate `x` and all its derivatives after a timestep `dt`
     * @param dt The timestep
     * @param params Leave this empty (overrides parameters for differential equation.)
     */
    public step(dt: number, params: number[] = this.getCurrentValues()): void {
        const order: number = this.getOrder();
        const n1: number = this.time.length; // current array index
        const n0: number = n1 - 1; // last array index
        this.time[n1] = this.time[n0] + dt;
        // Compute Taylor expansions for all "i" derivatives
        // x(t0+dt) = x(t0) + dt*x'(t0) + 1/2*dt^2*x"(t0) + ... 1/n!*dt^n^x(n)(t0)
        for (let i = 0; i < order; i++) {
            this.data[i][n1] = this.data[i][n0];
            for (let j = i + 1; j <= order; j++) {
                const d: number = j - i;
                this.data[i][n1] += (dt ** d) * this.data[j][n0] / SMath.factorial(d);
            }
        }
        const fParamCount: number = this.dnx.length,
            numParams: number = params.length + 1;
        if (fParamCount !== numParams) {
            throw new Error('Differential equation (order ' + order + ') should accept ' + numParams + ' parameters but accepts ' + fParamCount + ' parameters.');
        }
        this.data[order][n1] = this.dnx(this.time[n1], ...params);
    }
    /**
     * Solve this differential equation from `t=0` to `t=tf` with timestep `dt`
     * @param dt The timestep
     * @param tf The final time
     */
    public solve(dt: number, tf: number): void {
        for (let t = 0; t < tf; t += dt) {
            this.step(dt);
        }
    }
    /**
     * Return an array of all values for time derivative `n` after solving this equation.
     * @param n The order number
     * @returns Values across time for derivative `n` of this equation.
     */
    public getNthDerivative(n: number): number[] {
        if (n < 0 || n > this.getOrder()) {
            throw new Error('Order number is out of bounds.');
        }
        return this.data[n];
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
        return this.time;
    }
}

/**
 * Represents a system of differential equations.
 */
export class DifferentialSystem {
    /**
     * Initialize a new system of differential equations.
     * @param equations The differential equations that make up this system
     */
    constructor(private readonly equations: DifferentialEquation[]) { }
    /**
     * Set a differential equation for a specific dimension. All differential equations must be set before solving.
     * @param dimension The 0-indexed dimension number to initialize the equation for
     * @param f The differential equation as a function of time and every derivative of every dimension, ordered by:
     * ```
     * x, dx/dt, ..., d(i)x/dt(i),
     * y, dy/dt, ..., d(j)y/dt(j),
     * z, dz/dt, ..., d(k)z/dt(k),
     * ... (higher dimensions)
     * ```
     * Where `i` is the highest order of `x` (dimension 0), `j` is the highest order of `y` (dimension 1) and `k` is the highest order of `z` (dimension 2)
     * @param x0 The initial conditions for this dimension
     */
    public setEquationFor(dimension: number, f: (t: number, ...x: number[]) => number, ...x0: number[]): void {
        if (this.equations[dimension] instanceof DifferentialEquation) {
            throw new Error('Already set equation for dimension ' + dimension);
        }
        this.equations[dimension] = new DifferentialEquation(f, ...x0);
    }
    /**
     * Solve this system of differential equations from `t=0` to `t=tf` with timestep `dt`
     * @param dt The timestep
     * @param tf The final time
     */
    public solve(dt: number, tf: number): void {
        for (let dim = 0; dim < this.getDimensions(); dim++) {
            if (!(this.equations[dim] instanceof DifferentialEquation)) {
                throw new Error('Missing differential equation for dimension ' + dim);
            }
        }
        for (let t = 0; t < tf; t += dt) {
            this.equations.forEach(de => de.step(dt, this.getParameters()));
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
    /**
     * Returns a formatted array of equation parameters.
     * @returns `[x, dx/dt, ... y, dy/dt, ... z, dz/dt, ...]`
     */
    private getParameters(): number[] {
        return this.equations.map(de => de.getCurrentValues()).flat();
    }
    /**
     * Determine the number of equations in this system.
     * @returns The number of equations
     */
    private getDimensions(): number {
        return this.equations.length;
    }
}
