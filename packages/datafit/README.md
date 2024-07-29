## Getting Started

`datafit` exports only 1 function, `fit()` which is used for curve fitting. All other exports are purely for information and defining types used within this package. `fit()` uses a genetic-style algorithm to fit a curve to. How it works is that it generates many sets of parameters to test, and keeps ones with smaller error than the previous iteration. Parameter sets with larger errors are discarded. Each subsequent iteration uses the sets of parameters with the least error and "mutates" them randomly.

> Because of these random mutations, running the same code multiple times may yield slightly different results. See [best practices](#best-practices) for mitigation tactics.

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

1. Avoid overfitting your data. That means, you should never have more function unknowns than the number of data points. `fit()` allows this for the rare chance that it is needed. Typically, having more, accurate data, is better for curve fitting.
1. Reject outliers. `fit()` does not do this. Any outliers existing in the dataset will be treated like normal data points and could negatively impact the best fit.

There are also some great arguments and use cases for this function, namely...

1. Data analysis and visualization.
1. Quickly iterating on different model functions for determining which best fits the data.
1. Curve fitting for multivariate or nonlinear models.
1. The ease of use of it all! It's just one function call with as little as 2 inputs!
