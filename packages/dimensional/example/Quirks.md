> [**BACK**](./Analysis.md) | **3** | [**NEXT**](./Name%20and%20Collect.md) | Up next: Learn how to determine default dimension and unit names.

This example shows some of the quirks and miscellaneous things to know about `Dimensional` and the consequenses of each.

- Create dimensions, instead of using the builtin ones
    - Custom dimensions are not identical to builtin dimensions
- Create the same dimension independently
    - Dimensions initialized independently are also not identical to each other
- Multiplying or dividing dimensions or units by *dimensionless* or *unitless*
    - This yields the original dimension or unit
- Creating units with the same prefix independently
    - These units are also not identical to each other, but will have a conversion rate of 1