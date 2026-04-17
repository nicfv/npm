import * as SMath from 'smath';
import { Datum, F, Summary, VariableType } from './types';

/**
 * Minimize the sum of squared errors to fit a set of data
 * points to a curve with a set of unknown parameters.
 * @param f The model function for curve fitting.
 * @param data The entire dataset, as an array of points.
 * @param params_initial The initial guess for function
 * parameters, which defaults to an array filled with zeroes.
 * @param iterations The number of parameter sets to generate.
 * @param maxDeviation The relative standard parameter deviation.
 * This is a number [0.0-1.0] and affects the standard deviation
 * on the first iteration. Every subsequent iteration has a
 * decayed standard deviation until the final iteration.
 * @returns The set of parameters and error for the best fit.
 * @example
 * // Define model function
 * function f(x: number, a2: number = -0.5, a1: number = 3.9, a0: number = -1.2): number {
 *     return a2 * x ** 2 + a1 * x + a0;
 * }
 * // Construct a data set
 * const data: Datum<number>[] = [0, 2, 4].map(x => ({ x: x, y: f(x) }));
 * // Compute best-fit summary
 * const summary = fit(f, data);
 */
export function fit<T extends VariableType>(f: F<T>, data: Datum<T>[], params_initial: number[] = [], iterations = 1e3, maxDeviation = 1): Summary<T> {
    const N_params: number = f.length - 1;
    if (params_initial.length === 0) {
        params_initial.length = N_params;
        params_initial.fill(0);
    }
    if (params_initial.length !== N_params) {
        throw new Error('The initial guess should contain ' + N_params + ' parameters.');
    }
    if (maxDeviation <= 0) {
        throw new Error('Standard deviation should be a positive value.');
    }
    let params: number[] = params_initial,
        error: number = err(f, params, data);
    for (let i = 0; i < iterations; i++) {
        const params_i: number[] = mutate(params, SMath.translate(i, 0, iterations, maxDeviation, 0)),
            error_i: number = err(f, params_i, data);
        if (error_i < error) {
            params = params_i;
            error = error_i;
        }
    }
    return {
        f: (x: T) => f(x, ...params),
        params: params,
        error: error,
        errorAvgAbs: Math.sqrt(error / data.length),
    };
}
/**
 * Calculate the sum of squared errors for a set of function parameters.
 * @param f The model function for curve fitting.
 * @param params The array of parameters to check.
 * @param data The entire dataset, as an array of points.
 * @returns The sum of squared errors.
 */
function err<T extends VariableType>(f: F<T>, params: number[], data: Datum<T>[]): number {
    let sum = 0;
    data.forEach(point => sum += (point.y - f(point.x, ...params)) ** 2);
    return sum;
}
/**
 * Randomly mutate the set of function parameters by some standard deviation.
 * @param params The set of function parameters to mutate.
 * @param deviation The standard relative amount to deviate in any direction.
 * @returns A mutated set of parameters.
 */
function mutate(params: number[], deviation: number): number[] {
    return params.map(c => SMath.rnorm(c, deviation * Math.max(1, Math.abs(c))));
}