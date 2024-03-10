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

My results were about `a2 = -1, a1 = 5.3, a0 = -3.5`, which means my best-fit function is `y = -x^2 + 5.3x - 3.5`. Try it for yourself and see if you obtain similar results!

In this example, the x values for our data points are given as 1, 2, 3, and 4. If we interpolate within this range, the model will be very accurate. Extrapolating very far beyond either end of this range will probably not be very accurate!

> Mind the order of your function parameters! `fit()` will output a parameter array that follows the same order as the function parameters, even if it is non-intuitive! For example, if my function signature looks like `f(x, a2, a1, a0)`, then `bestFit.params` would return an array `[a2, a1, a0]`. You would access `a2` with `a[0]`!

### Multivariate

In this slightly more complicated example, we'll define a 2D planar function to fit 3-dimensional data. The main difference here is that `x` is now an array, in both `f(x)` and the dataset, but everything else is functionally the same!

Don't get tricked here with the dataset. The `x` property refers to all the *inputs* to the function, and the `y` property refers to the *output*. In this example, `x` is an array of length 2, representing our 2 independent dimensions. We can call those dimensions the x-axis and y-axis, obtained by `x[0]` and `x[1]` respectively, however, in mathematics, this is simply referred to as the `X` vector. In this example, the `y` property in our dataset could actually be our z-axis. It's important to remember that the `x` and `y` properties in the dataset simply refer to the *inputs* and *output* of the function, not necessarily the x-axis and y-axis.

```js
import { fit } from 'datafit';

// Define a 2D planar function for
// curve fitting with unknowns `c`
// Note that `x` is now an array.
function f(x, cx, cy, c) {
    return cx * x[0] + cy * x[1] + c;
}

// Define the multi-variable dataset
// where `x` is the array of "inputs"
// We can say `x[0]` = dimension-x
// and `x[1]` = dimension-y in 2D space.
const dataset = [
    { x: [0, 0], y: 1 },
    { x: [1, 0], y: 3 },
    { x: [0, 1], y: 4 },
    { x: [1, 1], y: 5 },
];

// Shorthand for immediately capturing the
// parameter array into a constant array `c`
const c = fit(f, dataset).params;

// Interpolate using the best-fit parameters.
const x = 0.75,
    y = 0.25,
    z = f([x, y], c[0], c[1], c[2]);
```

My results were about `cx = 1.5, cy = 2.5, c = 1.2` meaning that my equation is `z = 1.5x + 2.5y + 1.2`. Try it for yourself and see if you obtain similar results!

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

The dimension, or number of free `x` variables per data point, should not have an impact on computation time.

## Best Practices

It's a good idea to start with rough curve fits and use the outputs from that in subsequent `fit` calls to finer-tune the results such as the one in the [single variable example](#single-variable), which will yield more consistent results, despite different paths taken to achieve the result. If possible, it's best to use `fit` during the testing phase, and store your parameters as constants to use in production software. This will ensure consistent results 100% of the time.

## Contribute

`datafit` is an open source software package hosted on a [GitHub repository](https://github.com/nicfv/npm) and is distributed under the [MIT License](https://raw.githubusercontent.com/nicfv/npm/main/LICENSE). Bug reports and feature requests can be submitted in [issues](https://github.com/nicfv/npm/issues). Contributions are also accepted by submitting a [pull request](https://github.com/nicfv/npm/pulls). Please follow the code styling if submitting a pull request. Thank you for your consideration!
