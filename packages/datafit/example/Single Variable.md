In this example written in TypeScript, we will fit a generic 2nd degree polynomial defined to a given set of \\\((x,y)\\\) points. We'll create this dataset based on a known formula for a 2nd degree polynomial, and add some random high-frequency noise. The initial guess for our constants will all be zero, given by \\\(a_{2} = a_{1} = a_{0} = 0\\\). Then, we'll determine the true value and best-fit value of \\\(f(3)\\\) using the parameter set found by the `fit()` function. We're able to use the best-fit curve given by our summary to extrapolate for any \\\(x\\\) value.

Here is the function used to generate the dataset.

$$f(x) = -0.2x^{2} + x + 1.3$$

Here is the model function used for curve fitting.

$$f(x, \bar{a}) = a_{2}x^{2} + a_{1}x + a_{0}$$

In the **output**, the line with `params:` contains the set of best-fit parameters **in the order** of the model function parameters. That means, my outputs are in the order of \\\(a_{0}, a_{1}, a_{2}\\\). How close is it to our original function? Try it for yourself and see if you obtain similar results!

The other lines in the summary tell us other information from the computation. See [summary](https://npm.nicfv.com/datafit/interfaces/Summary.html) for more details.

- `f` is the best-fit function we used to extrapolating from our dataset.
- `params` contains the set of best-fit parameters.
- `error` is the **total** residual squared error (for all data points.) This is the value that the algorithm is minimizing.
- `errorAvgAbs` is the average absolute error we would get from the model function with `params` compared to the actual dataset values. Lower numbers are better here. This only compares the best-fit with values from the dataset. By extrapolating beyond our dataset, our average error may increase. See below for an explanation.

In this example, the x values for our data points are given as `[-2, -1, 0, 1, 2]`. If we interpolate within this range, the model will be about as accurate as what is shown in the summary. Extrapolating very far beyond either end of this range (e.g. \\\(f(100)\\\)) will probably not be very accurate!

> Mind the order of your parameters! `fit()` will output a parameter array that follows the same order as the model function parameters, even if it is non-intuitive! For example, if my function signature looks like `f(x, a2, a1, a0)`, then `summary.params` would return an array `[a2, a1, a0]`. You would access `a2` with `a[0]`!