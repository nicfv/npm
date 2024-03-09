import { SMath } from 'smath';
import { Config, Dataset, Fit, Params, VariableType, fx } from './types';

/**
 * Defines the default configuration options for `fit`
 */
const defaultConfig: Config = {
    generations: 100,
    population: 100,
    survivors: 10,
    initialDeviation: 10,
    finalDeviation: 1,
};

/**
 * Minimize the sum of squared errors to fit a set of data
 * points to a curve with a set of unknown parameters.
 * @param f The model function for curve fitting.
 * @param data The entire dataset, as an array of points.
 * @param params_initial The initial guess for function parameters,
 * which defaults to an array filled with zeroes.
 * @param config Configuration options for curve fitting.
 * @returns The set of parameters and error for the best fit.
 * @example
 * ```ts
 * const bestFit: Fit = fit(f, dataset),
 *     params: Params = bestFit.params,
 *     err: number = bestFit.err;
 * ```
 * @default
 * Configuration settings
 * ```js
 * const defaultConfig: Config = {
 *     generations: 100,
 *     population: 100,
 *     survivors: 10,
 *     initialDeviation: 10,
 *     finalDeviation: 1,
 * };
 * ```
 */
export function fit<T = VariableType>(f: fx<T>, data: Dataset<T>, params_initial: Params = [], config: Config = defaultConfig): Fit {
    const N_params: number = f.length - 1;
    if (params_initial.length === 0) {
        params_initial.length = N_params;
        params_initial.fill(0);
    }
    if (params_initial.length !== N_params) {
        throw new Error('The initial guess should contain ' + N_params + ' parameters.');
    }
    // Clean up a potentially incomplete config object by filling it in with default options
    const conf: Config = {
        generations: config.generations ?? defaultConfig.generations,
        population: config.population ?? defaultConfig.population,
        survivors: config.survivors ?? defaultConfig.survivors,
        initialDeviation: config.initialDeviation ?? defaultConfig.initialDeviation,
        finalDeviation: config.finalDeviation ?? defaultConfig.finalDeviation,
    };
    const census: Array<Fit> = [];
    for (let generation = 0; generation < conf.generations; generation++) {
        for (let i = 0; i < conf.population; i++) {
            // Mutate a random parent from the prior generation of survivors
            const params: Params = mutate(
                census[randInt(0, conf.survivors)]?.params ?? params_initial,
                SMath.translate(generation, 0, conf.generations, conf.initialDeviation, conf.finalDeviation)
            );
            census.push({ params: params, err: err(f, params, data) });
        }
        // Sort by increasing error and only keep the survivors
        census.sort((x, y) => x.err - y.err);
        census.splice(conf.survivors);
    }
    return census[0];
}
/**
 * Calculate the sum of squared errors for a set of function parameters.
 * @param f The model function for curve fitting.
 * @param params The array of parameters to check.
 * @param data The entire dataset, as an array of points.
 * @returns The sum of squared errors.
 */
function err<T = VariableType>(f: fx<T>, params: Params, data: Dataset<T>): number {
    let sum: number = 0;
    data.forEach(point => sum += (point.y - f(point.x, ...params)) ** 2);
    return sum;
}
/**
 * Randomly mutate the set of function parameters by some maximum deviation.
 * @param params The set of function parameters to mutate.
 * @param deviation The maximum amount to deviate in any direction.
 * @returns A mutated set of parameters.
 */
function mutate(params: Params, deviation: number): Params {
    return params.map(c => c += SMath.expand(Math.random(), -deviation, deviation));
}
/**
 * Generate a random integer between `min, max`
 * @param min Minimum value
 * @param max Maximum value
 * @returns A random integer
 */
function randInt(min: number, max: number): number {
    return Math.floor(SMath.expand(Math.random(), min, max));
}