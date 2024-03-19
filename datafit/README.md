## Getting Started

`datafit` exports only 1 function, [`fit()`](https://npm.nicfv.com/datafit/functions/fit-1.html) which is used for curve fitting. All other exports are purely for information and defining types used within this package. `fit()` uses a genetic-style algorithm to fit a curve to. How it works is that it generates many sets of parameters to test, and selects a few with the smallest error to move onto the next iteration. Each subsequent iteration uses the sets of parameters with the least error and "mutates" them randomly.

> Because of these random mutations, running the same code multiple times may yield slightly different results. See [best practices](#best-practices) for mitigation tactics.

## Example

### Single Variable

In this example written in TypeScript, we will fit a generic 2nd degree polynomial defined to a given set of \\\((x,y)\\\) points. We'll create this dataset based on a known formula for a 2nd degree polynomial. The initial guess for our constants will all be zero, given by \\\(a_{2} = a_{1} = a_{0} = 0\\\). Then, we'll determine the true value and best-fit value of \\\(f(3)\\\) using the parameters found by the `fit()` function. We're able to feed this set of best-fit parameters into our model function to extrapolate for any \\\(x\\\) value.

#### Function used to generate the dataset

$$f(x) = -0.2x^{2} + x + 1.3$$

#### Model function for curve fitting

$$f(x, \bar{a}) = a_{2}x^{2} + a_{1}x + a_{0}$$

#### TypeScript Code

```ts
import { Datum, Summary, fit } from 'datafit';

// Define a model function for curve fitting.
// Let's use a generic 2nd degree polynomial
// with all constants unknown.
function f(x: number, a0: number = 1.3, a1: number = 1, a2: number = -0.2): number {
    return a2 * x ** 2 + a1 * x + a0;
}

// Define a function to add noise to the dataset
function noise(A: number): number {
    return A * (2 * Math.random() - 1)
}

// Define the dataset from our noisy signal
const data: Datum<number>[] = [-2, -1, 0, 1, 2].map(x => ({ x: x, y: f(x) + noise(0.1) }));
console.log('Dataset', data);

// Compute the best-fit set of parameters
// starting with an initial guess of [x^2 + x + 1]
// with 10,000 iterations, and each parameter
// can vary up to 50% on the first iteration
const summary: Summary = fit(f, data, [1, 1, 1], 10000, 50);
console.log('Summary', summary);

// Compute the actual value and
// best-fit value of f(3) to compare
const f3_act: number = f(3);
const f3_fit: number = f(3, ...summary.params);
console.log('f(3)', f3_act, f3_fit);

// Compute the relative error
const rel_error: number = (f3_fit - f3_act) / f3_act * 100;
console.log('Error: ' + rel_error.toFixed(2) + '%');
```

#### Program Output

```txt
Dataset [
  { x: -2, y: -1.4852644866602869 },
  { x: -1, y: 0.1447823296293199 },
  { x: 0, y: 1.2620050285779445 },
  { x: 1, y: 2.091786897503802 },
  { x: 2, y: 2.4954386055499445 }
]
Summary {
  params: [ 1.2927502895155665, 0.990899897637257, -0.19559853637900115 ],
  error: 0.002645611963567026,
  Ndata: 5,
  avgAbsErr: 0.023002660557279134
}
f(3) 2.5 2.505063155016327
Error: 0.20%
```

The line with `params:` contains the set of best-fit parameters **in the order** of the model function parameters. That means that the results I got are about \\\(a_{0} \approx 1.29, a_{1} \approx 1, a_{2} \approx -0.2\\\) which is very close to our [original function](#function-used-to-generate-the-dataset)! Also, \\\(f(3) = 2.5\\\) where my model got me \\\(f(3) \approx 2.51\\\), again very close to the true result! Try it for yourself and see if you obtain similar results!

In this example, the x values for our data points are given as `[-2, -1, 0, 1, 2]`. If we interpolate within this range, the model will be very accurate. Extrapolating very far beyond either end of this range will probably not be very accurate!

> Mind the order of your parameters! `fit()` will output a parameter array that follows the same order as the model function parameters, even if it is non-intuitive! For example, if my function signature looks like `f(x, a2, a1, a0)`, then `summary.params` would return an array `[a2, a1, a0]`. You would access `a2` with `a[0]`!

### Multivariate

In this slightly more complicated example, we'll define a 2D planar function to fit 3-dimensional data. The main difference here is that \\\(\bar{x}\\\) is now an array, in both \\\(f(\bar{x})\\\) and the dataset, but everything else is functionally the same!

$$ax + by + cz = d$$

This general plane formula can be rewritten to solve for \\\(z\\\). \\\(c_{x}\\\), \\\(c_{y}\\\), and \\\(c_{z}\\\) are all arbirary constants that we will adjust to fit the plane to the dataset.

$$f(\bar{x}, \bar{c}) = c_{x}x + c_{y}y + c_{z}$$

Don't get tricked here with the dataset. The `x` property refers to all the *inputs* to the function, and the `y` property refers to the *output*. In this example, `x` is an array of length 2, representing our 2 independent dimensions. We can call those dimensions the x-axis and y-axis, obtained by `x[0]` and `x[1]` respectively. In mathematics, this is simply referred to as the input vector we defined as \\\(\bar{x}\\\). In this example, the `y` property in our dataset is actually our z-axis. It's important to remember that the `x` and `y` properties in the dataset simply refer to the *inputs* and *output* of the function, not necessarily the x-axis and y-axis.

```js
import { fit } from 'datafit';

// Define a 2D planar function for
// curve fitting with unknowns `c`
// Note that `x` is now an array.
function f(x, cx, cy, cz) {
    return cx * x[0] + cy * x[1] + cz;
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

My results were about \\\(c_{x} = 1.5, c_{y} = 2.5, c_{z} = 1.2\\\) meaning that my equation is \\\(z = 1.5x + 2.5y + 1.2\\\). Try it for yourself and see if you obtain similar results, and try plotting it in an online 3D calculator!

## Complexity

The folling factors affect computation time and resources:

- Number of generations
- Population per generation
- Number of free function parameters
- Number of data points

Each one alone has a linear effect on performance, but combined has an incremental effect.

$$time = generations \times population \times ( parameters + dataset )$$

The dimension, or number of free `x` variables per data point, should not have an impact on computation time.

## Best Practices

It's a good idea to start with rough curve fits and use the outputs from that in subsequent `fit` calls to finer-tune the results such as the one in the [single variable example](#single-variable), which will yield more consistent results, despite different paths taken to achieve the result. If possible, it's best to use `fit` during the testing phase, and store your parameters as constants to use in production software. This will ensure consistent results 100% of the time.
