## Getting Started

`datafit` exports only 1 function, [`fit()`](https://npm.nicfv.com/datafit/functions/fit-1.html) which is used for curve fitting. All other exports are purely for information and defining types used within this package. `fit()` uses a genetic-style algorithm to fit a curve to. How it works is that it generates many sets of parameters to test, and keeps ones with smaller error than the previous iteration. Parameter sets with larger errors are discarded. Each subsequent iteration uses the sets of parameters with the least error and "mutates" them randomly.

> Because of these random mutations, running the same code multiple times may yield slightly different results. See [best practices](#best-practices) for mitigation tactics.

## Example

Here are some usage examples of `datafit`. It's very easy to get started!

### Simple

This example demonstrates a simple usage of `fit()` to fit 3 data points to the line \\\(y=mx+b\\\). This is all you need to get started!

$$dataset=(1,-1), (2,1), (3,2)$$

```ts
import { Datum, Summary, fit } from 'datafit';

// Define our model function: y=mx+b
function f(x: number, m: number, b: number): number {
    return m * x + b;
}

// Define our dataset
const data: Datum<number>[] = [
    { x: 1, y: -1 },
    { x: 2, y: 1 },
    { x: 3, y: 2 },
];

// Compute the best fit parameters to
// get `m` and `b`, and print result.
const summary: Summary = fit(f, data);
const m_fit: number = summary.params[0];
const b_fit: number = summary.params[1];
console.log('The best-fit line is y = ' + m_fit.toFixed(2) + 'x + ' + b_fit.toFixed(2));
```

Running this program gives me an output of \\\(y=1.5x-2.33\\). Try plotting that in an online graphing calculator!

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

```text
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

#### Explanation

The line with `params:` contains the set of best-fit parameters **in the order** of the model function parameters. The results I got are about \\\(a_{0} \approx 1.29, a_{1} \approx 0.99, a_{2} \approx -0.196\\\) which is very close to our [original function](#function-used-to-generate-the-dataset)! Also, \\\(f(3) = 2.5\\\) where my model got me \\\(f(3) \approx 2.505\\\), again very close to the true result! Try it for yourself and see if you obtain similar results!

The other lines in the summary tell us other information from the computation.

- `error` is the **total** residual squared error (for all data points.) This is the value that the algorithm is minimizing.
- `Ndata` is the number of data points given to the algorithm. Typically, more data points (with fewer outliers) will produce a better model for curve fitting.
- `avgAbsErr` is the average absolute error we would get from the model function with `params` compared to the actual dataset values. Lower numbers are better here. This only compares the best-fit with values from the dataset. By extrapolating beyond our dataset, our average error may increase. See below for an explanation.

In this example, the x values for our data points are given as `[-2, -1, 0, 1, 2]`. If we interpolate within this range, the model will be about as accurate as what is shown in the summary. Extrapolating very far beyond either end of this range (e.g. \\\(f(100)\\\)) will probably not be very accurate!

> Mind the order of your parameters! `fit()` will output a parameter array that follows the same order as the model function parameters, even if it is non-intuitive! For example, if my function signature looks like `f(x, a2, a1, a0)`, then `summary.params` would return an array `[a2, a1, a0]`. You would access `a2` with `a[0]`!

### Multivariate

In this slightly more complicated example, we'll define a 2D planar function to fit 3-dimensional data. The main difference here is that \\\(\bar{x}\\\) is now an array, in both \\\(f(\bar{x})\\\) and the dataset, but everything else is functionally the same!

$$ax + by + cz = d$$

This general plane formula can be rewritten to solve for \\\(z\\\). \\\(c_{x}\\\), \\\(c_{y}\\\), and \\\(c_{z}\\\) are all arbirary constants that we will adjust to fit the plane to the dataset.

$$f(\bar{x}, \bar{c}) = c_{x}x + c_{y}y + c_{z}$$

In the dataset in our [code](#typescript-code-1), the `x` property refers to all the *inputs* to the function, and the `y` property refers to the *output*. In this example, `x` is an array of length 2, representing our 2 independent dimensions. We can call those dimensions the x-axis and y-axis, obtained by `x[0]` and `x[1]` respectively. In mathematics, this is simply referred to as the input vector we defined as \\\(\bar{x}\\\). In this example, the `y` property in our dataset is actually our z-axis. It's important to remember that the `x` and `y` properties in the dataset simply refer to the *inputs* and *output* of the function, not necessarily the x-axis and y-axis.

3 points is all that is required to define the equation for a plane. In this example, our data fits to the plane defined by \\\(z = 2x - y + 1\\\).

Let's see if the algorithm can find this out just based on the dataset!

#### TypeScript Code

```ts
import { Datum, fit } from 'datafit';

// Define a general 3D plane function
// x[0] represents the x-axis
// x[1] represents the y-axis
// The z-axis is represented by f([x, y], ...)
function f(x: number[], cx: number, cy: number, cz: number): number {
    return cx * x[0] + cy * x[1] + cz;
}

// These 3 points make up the plane
// z = 2x - y + 1
const data: Datum<number[]>[] = [
    { x: [0, 0], y: 1 },
    { x: [1, 0], y: 3 },
    { x: [0, 1], y: 0 },
];

// Run the curve fitting algorithm
const summary = fit(f, data);
console.log(summary);
```

#### Program Output

```text
{
  params: [ 2.010807805144429, -0.9965373369374049, 0.9949551401129608 ],
  error: 0.00006116549611081122,
  Ndata: 3,
  avgAbsErr: 0.004515362521836285
}
```

#### Explanation

My results were about \\\(c_{x} = 2.01, c_{y} = -0.997, c_{z} = 0.995\\\) meaning that my equation is \\\(z = 2.01x - 0.997y + 0.995\\\), which is pretty darn close to our actual plane equation! Try it for yourself and see if you obtain similar results, and try plotting it in an online 3D calculator!

## Complexity

The folling factors affect computation time and resources:

- Number of iterations
- Number of independent/unknown function parameters
- Number of data points

Each one alone has a linear effect on performance, but combined has an incremental effect.

$$time = iterations \times ( parameters + dataset )$$

The dimensionality, or number of free `x` variables per data point, should not have an impact on computation time.

## Best Practices

For production software that relies on a best curve fit for data, it's best to avoid critical operations using `fit()` for a few reasons.

1. `fit()` uses an algorithm that generates random mutations in a set of parameters, which could yield slightly different results, even if run on the same dataset.
1. If the number of iterations is very high (in the millions or higher), it could have a significant effect on software performance.

To circumvent some of these issues, the following is recommended.

1. Use `datafit` during the testing phase of application development, and use the best-fit parameters as constants in the final application.
1. If that is not possible, `datafit` may be helpful for determining an initial guess of curve fit constants, which can be input to `fit()` during production. The number of iterations could be reduced if the initial guess is reasonably close to the desired result.
1. Using `datafit` primarily for data visualization or rough estimation.
1. For operations that *need* `datafit`, a suggestion would be to run multiple iterations of `fit()` itself, and using each output as the subsequent call's input. This will converge to a result more effectively but could take longer.

And here are some general good practices.

1. Avoid overfitting your data. That means, you should never have more function unknowns than the number of data points. `fit()` allows this for the rare chance that it is needed.
1. Reject outliers. `fit()` does not do this. Any outliers existing in the dataset will be treated like normal data points and could negatively impact the best fit.

There are also some great arguments and use cases for this function, namely...

1. Data analysis and visualization.
1. Quickly iterating on different model functions for determining which best fits the data.
1. Curve fitting for multivariate or nonlinear models.
1. The ease of use of it all! It's just one function call with as little as 2 inputs!
