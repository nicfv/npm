Simple curve-fitting algorithm using a genetic-style algorithm for single-variable or multivariate problems.

![NPM Version](https://img.shields.io/npm/v/datafit)
![NPM Downloads](https://img.shields.io/npm/dt/datafit)

## Installation

`datafit` can be installed from the official [npm package repository](https://www.npmjs.com/package/datafit). It is highly recommended to install the latest version, which is installed by default with the following command.

```shell
npm i datafit
```

## Getting Started

`datafit` exports only 1 function, [`fit`](https://npm.nicfv.com/datafit/functions/fit-1.html) which is used for curve fitting. All other exports are purely for information and defining types used within this package.

## Example

### Single Variable

In this example written in JavaScript, we will fit a 2nd degree polynomial to a set of (x,y) points.

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