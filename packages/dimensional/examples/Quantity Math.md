# Quantity Math

Great, our first example checks out! But like I mentioned, European scales don't actually read out in Newtons, but in kilograms. Remember the relationship between force and mass from your physics class?

$$F=ma$$

$$\text{Force}=\text{mass}\times\text{acceleration}$$

We know the value of force and want to solve for mass. What would the acceleration be? This is the acceleration due to Earth's gravity. A good way to visualize that number is drop something (light weight, be safe!) and watch it fall. Notice how it speeds up as it falls - the "speed up" is the acceleration. We call this value \\\(g\\\). On Earth, \\\(g\approx 9.81 [m/s^{2}]\\\) in SI units.

$$m=\frac{F}{g}$$

We could convert \\\(g\\\) to US units, but there's no need, since `dimensional` will handle all unit conversions internally.

When we divide force by acceleration, the units from force and acceleration will persist. We'll end up with a rather strange unit like this:

$$\frac{lb_{f}}{\frac{m}{s^{2}}}=\frac{lb_{f}s^{2}}{m}$$

What are the dimensions on this unit? We can run a quick dimensional analysis using `Quantity.Unit.Attribute.Dimension.toString()` to get a human-readable representation of our physical base dimensions. Believe it or not, the dimension of that unit is just mass! That means, we can convert quantities with that unit to any unit of mass.

From plugging it into an online calculator, I expect the result to be about \\\(68 [kg]\\\).