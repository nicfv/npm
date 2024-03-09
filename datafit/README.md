Simple curve-fitting algorithm using a genetic-style algorithm for single-variable or multivariate problems.

![NPM Version](https://img.shields.io/npm/v/datafit)
![NPM Downloads](https://img.shields.io/npm/dt/datafit)

## Installation

`datafit` can be installed from the official [npm package repository](https://www.npmjs.com/package/datafit). It is highly recommended to install the latest version, which is installed by default with the following command.

```shell
npm i datafit
```

## Getting Started

`datafit` exports only 1 function, [`fit`](https://npm.nicfv.com/datafit/functions/fit-1.html) which is used for curve fitting. All other exports are purely for information and defining types used within this package. `fit` uses a genetic-style algorithm to fit a curve to. How it works is that it generates many sets of parameters to test, and selects a few with the smallest error to move onto the next iteration. Each subsequent iteration uses the sets of parameters with the least error and "mutates" them randomly.

> Because of these random mutations, running the same code multiple times may yield slightly different results. See [best practices](#best-practices) for mitigation tactics.

## Example

### Single Variable

In this example written in JavaScript, we will fit a 2nd degree polynomial to a set of (x,y) points. We'll start out with a rough curve fit with the starting guess of `a2 = a1 = a0 = 0`. Then, we'll use the parameters given found by the rough fit as the initial guess for our best fit. Finally, we'll feed the output from the best fit back into our function `f(x)` and interpolate or extrapolate for any `x` value.

> In this example, the x values for our data points are given as 1, 2, 3, and 4. If we extrapolate very far beyond either end of this range, our curve fit will be less accurate.

```js
import { fit } from 'datafit';

// Define the model function to fit to
// This is a second degree polynomial
// with all constants unknown.
function f(x, a0, a1, a2) {
    return a2 * x ** 2 + a1 * x + a0;
}

// Define the single-variable dataset
// as an array of (x,y) points
const dataset = [
    { x: 1, y: 1 },
    { x: 2, y: 3 },
    { x: 3, y: 4 },
    { x: 4, y: 2 },
];

// Let's start with a rough fit
// leaving the initial guess and
// configuration options to their
// default settings. The initial
// guess will automatically be
// set to an array of zeroes.
const roughFit = fit(f, dataset);

// Let's now use the parameters
// from the rough fit as our
// initial guess for our best fit.
// Let's also fine tune some of
// the configuration options.
const bestFit = fit(f, dataset,
    roughFit.params,
    {
        generations: 50,
        population: 50,
        survivors: 5,
        initialDeviation: 1,
        finalDeviation: 0.01,
    }
);

// Try extrapolating using the array
// of parameters from the best fit. 
const a = bestFit.params,
    x = 5,
    y = f(x, a[0], a[1], a[2]);
```

## Complexity

The folling factors affect computation time and resources:

- Number of generations
- Population per generation
- Number of free function parameters
- Number of data points

Each one alone has a linear effect on performance, but combined has an incremental effect.

```js
time = generations * population * ( parameters + dataset )
```

## Best Practices

It's a good idea to start with rough curve fits and use the outputs from that in subsequent `fit` calls to finer-tune the results such as the one in the [single variable example](#single-variable), which will yield more consistent results, despite different paths taken to achieve the result. If possible, it's best to use `fit` during the testing phase, and store your parameters as constants to use in production software. This will ensure consistent results 100% of the time.