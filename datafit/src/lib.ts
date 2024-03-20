import { SMath } from 'smath';
import { Datum, F, Summary, VariableType } from './types';

/**
 * Minimize the sum of squared errors to fit a set of data
 * points to a curve with a set of unknown parameters.
 * @param f The model function for curve fitting.
 * @param data The entire dataset, as an array of points.
 * @param params_initial The initial guess for function
 * parameters, which defaults to an array filled with zeroes.
 * @param iterations The number of parameter sets to generate.
 * @param maxDeviation The relative maximum parameter deviation.
 * This is a number [0-100%] and affects the maximum deviation
 * on the first iteration. Every subsequent iteration has a
 * decayed maximum deviation until the final iteration.
 * @returns The set of parameters and error for the best fit.
 * @example
 * ```ts
 * // Define model function
 * function f(x: number, a2: number = -0.5, a1: number = 3.9, a0: number = -1.2): number {
 *     return a2 * x ** 2 + a1 * x + a0;
 * }
 * // Construct a data set
 * const data: Datum<number>[] = [-4, -2, 0, 2, 4].map(x => { return { x: x, y: f(x) } });
 * // Compute best fit parameters
 * const summary: Summary = fit(f, data);
 * ```
 */
export function fit<T extends VariableType>(f: F<T>, data: Array<Datum<T>>, params_initial: Array<number> = [], iterations: number = 1e3, maxDeviation: number = 100): Summary {
    const N_params: number = f.length - 1;
    if (params_initial.length === 0) {
        params_initial.length = N_params;
        params_initial.fill(0);
    }
    if (params_initial.length !== N_params) {
        throw new Error('The initial guess should contain ' + N_params + ' parameters.');
    }
    if (maxDeviation <= 0) {
        throw new Error('Maximum deviation should be a positive value.');
    }
    let params: Array<number> = params_initial,
        error: number = err(f, params, data);
    for (let i = 0; i < iterations; i++) {
        const params_i: Array<number> = mutate(params, SMath.translate(i, 0, iterations, maxDeviation, 0)),
            error_i: number = err(f, params_i, data);
        if (error_i < error) {
            params = params_i;
            error = error_i;
        }
    }
    return {
        params: params,
        error: error,
        Ndata: data.length,
        avgAbsErr: Math.sqrt(error / data.length),
    };
}
/**
 * Calculate the sum of squared errors for a set of function parameters.
 * @param f The model function for curve fitting.
 * @param params The array of parameters to check.
 * @param data The entire dataset, as an array of points.
 * @returns The sum of squared errors.
 */
function err<T extends VariableType>(f: F<T>, params: Array<number>, data: Array<Datum<T>>): number {
    let sum: number = 0;
    data.forEach(point => sum += (point.y - f(point.x, ...params)) ** 2);
    return sum;
}
/**
 * Randomly mutate the set of function parameters by some maximum deviation.
 * @param params The set of function parameters to mutate.
 * @param deviation The maximum relative amount to deviate in any direction.
 * @returns A mutated set of parameters.
 */
function mutate(params: Array<number>, deviation: number): Array<number> {
    return params.map(c => c += SMath.expand(Math.random(), -deviation, deviation) * Math.max(1, c) / 100);
}