The differential equation for a system containing a mass, spring, and damper is:

$$m\ddot{x} + b\dot{x} + kx = F(t)$$

To use the `DiffyQ` library, we have to solve for the highest order derivative, which in this case is \\\(\dot{x}\\\).

$$\ddot{x} = \frac{1}{m} \left[ F(t) - b\dot{x} - kx \right]$$

Since this is a 1-dimensional differential equation, we can create the simple `DifferentialEquation` class. It requires an equation and initial conditions.

Since the highest order derivative is \\\(\ddot{x}\\\), that means this is a 2nd-order differential equation. Our initial conditions must contain \\\(x_{0}\\\) and \\\(\dot{x}_{0}\\\). \\\(\ddot{x}_{0}\\\) is not required because it will be calculated using the equation that we just solved for!

In this example, we solve the differential equation for the first 10 seconds with a timestep of 0.01 seconds and print out some of the results.
