import { SMath } from 'smath';
import { Config, Dataset, Fit, Parameters, X, fx } from './types';

/**
 * Minimize the sum of squared errors to fit a set of data
 * points to a curve with a set of unknown parameters.
 * @param f The model function for curve fitting.
 * @param data The entire dataset, as an array of points.
 * @param a_initial The initial guess for function parameters,
 * which defaults to an array filled with zeroes.
 * @param config Configuration options for curve fitting.
 * @returns The set of parameters and error for the best fit.
 */
export function fit<T = X>(f: fx<T>, data: Dataset<T>, a_initial: Parameters = [], config: Config = { generations: 100, population: 100, survivors: 10, initialDeviation: 10, finalDeviation: 1 }): Fit {
    const N_params: number = f.length - 1;
    if (a_initial.length === 0) {
        a_initial.length = N_params;
        a_initial.fill(0);
    }
    if (a_initial.length !== N_params) {
        throw new Error('The initial guess should contain ' + N_params + ' parameters.');
    }
    const census: Array<Fit> = [];
    for (let generation = 0; generation < config.generations; generation++) {
        for (let i = 0; i < config.population; i++) {
            // Mutate a random parent from the prior generation of survivors
            const a: Parameters = mutate(
                census[randInt(0, config.survivors)]?.a ?? a_initial,
                SMath.translate(generation, 0, config.generations, config.initialDeviation, config.finalDeviation)
            );
            census.push({ a: a, err: err(f, a, data) });
        }
        // Sort by increasing error and only keep the survivors
        census.sort((x, y) => x.err - y.err);
        census.splice(config.survivors);
    }
    return census[0];
}
/**
 * Calculate the sum of squared errors for a set of function parameters.
 * @param f The model function for curve fitting.
 * @param a The array of parameters to check.
 * @param data The entire dataset, as an array of points.
 * @returns The sum of squared errors.
 */
function err<T = X>(f: fx<T>, a: Parameters, data: Dataset<T>): number {
    let sum: number = 0;
    data.forEach(point => sum += (point.y - f(point.x, ...a)) ** 2);
    return sum;
}
/**
 * Randomly mutate the set of function parameters by some maximum deviation.
 * @param a The set of function parameters to mutate.
 * @param deviation The maximum amount to deviate in any direction.
 * @returns A mutated set of parameters.
 */
function mutate(a: Parameters, deviation: number): Parameters {
    return a.map(c => c += (Math.random() - 0.5) * deviation);
}
/**
 * Generate a random integer between `min, max`
 * @param min Minimum value
 * @param max Maximum value
 * @returns A random integer
 */
function randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}