In this slightly more complicated example, we'll define a 2D planar function to fit 3-dimensional data. The main difference here is that \\\(\bar{x}\\\) is now an array, in both \\\(f(\bar{x})\\\) and the dataset, but everything else is functionally the same!

$$ax + by + cz = d$$

This general plane formula can be rewritten to solve for \\\(z\\\). \\\(c_{x}\\\), \\\(c_{y}\\\), and \\\(c_{z}\\\) are all arbirary constants that we will adjust to fit the plane to the dataset.

$$f(\bar{x}, \bar{c}) = c_{x}x + c_{y}y + c_{z}$$

In the dataset defined in our source code, the `x` property refers to all the *inputs* to the function, and the `y` property refers to the *output*. In this example, `x` is an array of length 2, representing our 2 independent dimensions. We can call those dimensions the x-axis and y-axis, obtained by `x[0]` and `x[1]` respectively. In mathematics, this is simply referred to as the input vector we defined as \\\(\bar{x}\\\). In this example, the `y` property in our dataset is actually our z-axis. It's important to remember that the `x` and `y` properties in the dataset simply refer to the *inputs* and *output* of the function, not necessarily the x-axis and y-axis.

3 points is all that is required to define the equation for a plane. In this example, our data fits to the plane defined by \\\(z = 2x - y + 1\\\).

Let's see if the algorithm can find this out just based on the dataset!

My results were about \\\(c_{x} \approx 2.01, c_{y} \approx -0.99, c_{z} \approx 0.99\\\) meaning that my equation is \\\(z \approx 2.01x - 0.99y + 0.99\\\), which is pretty close to our actual plane equation! If we plot `summary.f([x, y])` where `x` and `y` are a set of inputs from our data set, we should expect the average absolute error to be about 0.005 units from the true plane equation. Try it for yourself and see if you obtain similar results, and try plotting it in an online 3D calculator!