import { SMath } from 'smath';
import { Fit, Point, fx } from './types';

export abstract class CurveFit {
    /**
     * Anything beyond this takes several minutes of computation time.
     */
    private static readonly MAX_PARAMS: number = 18;
    /**
     * 
     * @param f The model function for curve fitting.
     * @param data The entire dataset, as an array of points.
     * @param a_initial The initial guess for function parameters,
     * which defaults to an array filled of zeroes.
     * @param distance The distance to vary when checking parameter sets.
     * Each iteration will vary parameters by an offset of `distance` and
     * will save the best fit for that search range, to use for the next
     * iteration. `distance.max` is used for the first iteration, and the
     * distance is halved in succession until `distance.min` is reached. For
     * a wider searching range, increase the starting distance, howevever,
     * this will increase the number of iterations to solution, which will
     * increase compute time and resources.
     * @param iterations Define the number of iterations for this algorithm.
     * @returns The set of parameters for the best fit and sum of squared errors.
     */
    public static fit(f: fx, data: Array<Point>, a_initial: Array<number> = [], searchDistance: number = 10, iterations: number = 1e3): Fit {
        const N_params: number = f.length - 1;
        if (a_initial.length === 0) {
            a_initial.length = N_params;
            a_initial.fill(0);
        }
        if (a_initial.length !== N_params) {
            throw new Error('The initial guess should contain ' + N_params + ' parameters.');
        }
        if (N_params > this.MAX_PARAMS) {
            throw new Error('Your function includes too many unknown parameters.');
        }
        if (searchDistance < 0 || iterations < 0) {
            throw new Error('Invalid search distance or iteration count.');
        }
        let bestFit: Fit = this.fitStep(f, a_initial, data, searchDistance);
        for (let i = 0; i < iterations; i++) {
            bestFit = this.fitStep(f, bestFit.a, data, SMath.translate(i, 0, iterations, searchDistance, 0));
        }
        return bestFit;
    }
    /**
     * Determine the set of parameters that make the best fit
     * for the model function for all combinations of "adjacent"
     * parameter sets. (One distance step in all directions.)
     * @param f The model function for curve fitting.
     * @param a The set of parameters to originate from.
     * @param data The entire dataset, as an array of points.
     * @param distance The distance from `a` to deviate.
     * @returns The best fit for the model up to the distance specified.
     */
    private static fitStep(f: fx, a: Array<number>, data: Array<Point>, distance: number): Fit {
        const d: number = 5,
            n: number = a.length;
        let err_min: number = this.sumSquares(f, a, data),
            a_min: Array<number> = a.slice();
        for (let i: number = 0; i < d ** n; i++) {
            // `str` contains a string of characters in [012]
            // and is guaranteed to include all combinations.
            // 0 = subtract distance from corresponding parameter
            // 1 = no change to corresponding parameter
            // 2 = add distance to corresponding parameter
            const str: string = i.toString(d).padStart(n, '0'),
                a_new: Array<number> = a.slice();
            for (let i: number = 0; i < str.length; i++) {
                const val: number = Number.parseInt(str[i]);
                a_new[i] += SMath.translate(val, 0, d - 1, -distance, distance);
            }
            // Check the sum of squared errors. If the new
            // set of parameters yields a lower error, save
            // those as the new minimum parameters and error.
            const err_new: number = this.sumSquares(f, a_new, data);
            if (err_new < err_min) {
                err_min = err_new;
                a_min = a_new;
            }
        }
        return {
            a: a_min,
            err: err_min,
        };
    }
    /**
     * Calculate the sum of squared errors for a set of function parameters.
     * @param f The model function for curve fitting.
     * @param a The array of parameters to check.
     * @param data The entire dataset, as an array of points.
     * @returns The sum of squared errors.
     */
    private static sumSquares(f: fx, a: Array<number>, data: Array<Point>): number {
        let sum: number = 0;
        data.forEach(point => sum += (point.y - f(point.x, ...a)) ** 2);
        return sum;
    }
}