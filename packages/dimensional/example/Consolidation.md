> [**BACK**](./Quirks.md) | **4** | [**NEXT**](./Custom.md) | Up next: Learn how to create an entirely new dimension and unit system from scratch, without using any defaults.

You can use `Dimensional` to determine if a complex dimension matches a default dimension and return the name of that dimension.

Using the builtin JavaScript function [`Object.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) on the default `dimensions` object, we can iterate through the result until it matches with the argument.

By passing in \\\(\textbf{L}\\\), the function will return `Length`, which isn't terribly groundbreaking. But we can use this for more complex cases. For example, is there a name for this dimension, once simplified?

$$\frac{{\textbf{M}}}{{\textbf{L}} \times {\textbf{L}}^{2}}$$

The same thing can be done for units on the default `units` object, with a caveat. Dimensions are always stored as a compound of their fundamental base dimensions, but not all units are "made up" of other units, and some units are scales of other units; so we can't give a compound of units and expect to reliably get a result. This is probably best explained in an example.

By passing in \\\(\text{J}\\\), the function will return `Joule`, a unit of energy, which makes sense so far. Let's assume we have a torque measured in Newton-meters \\\([\text{N} \cdot \text{m}]\\\), a valid unit of torque *and* energy, while Joules are typically a measure of energy, *not* torque. Additionally, one Joule is equivalent to one Newton-meter! By passing in that into our function, what should we expect it to return? How would it know the context of our measurement?

These are a few reasons why it works differently with units versus dimensions. However, we can still get some useful information by asking instead for all default units matching that unit's *dimension*! Then we can pick and choose which unit best matches our measurement, and easily convert to and from our desired unit.