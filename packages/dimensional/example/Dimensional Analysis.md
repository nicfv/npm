> [**BACK**](./Unit%20Conversions.md) | **2** | [**NEXT**](./Package%20Quirks.md) | Up next: Learn about some of the quirks of `Dimensional`, helpful for troubleshooting.

My fictitious vehicle's fuel consumption rate is dependent on several factors:
- The current **acceleration** (how far I've pushed the gas pedal)
- The **speed** (due to increased wind resistance)
- The **weight** of my vehicle and it's contents (increased tire/road friction)
- A constant term representing my engine idling

From these terms, we can conclude that the fuel consumption (\\\(Q\\\)) is directly proportional to acceleration (\\\(a\\\)) and speed (\\\(v\\\)), and inversely proportional to weight (\\\(f\\\)), plus a constant term (\\\(C\\\)). We want to know two things:

1. What are the dimensions on the constant term? \\\(\dim(C)\\\)
1. What are the dimensions on the proportionaly constant? \\\(\dim(x)\\\)

Let's set up our equation and substitute in our variables:

$$\text{Fuel consumption} = x \times \left[ \frac{\text{Acceleration} \times \text{Speed}}{\text{Weight}} + \text{C} \right]$$

$$Q = x \times \left[ \frac{a \times v}{f} + C \right]$$

From our dimensional analysis or physics class that we paid attention in, we know that we can only add terms of like dimensions, so that means that:

$$\dim\left(C\right) = \dim\left(\frac{a \times v}{f}\right)$$

We can also isolate \\\(x\\\) to determine its dimensionality as well:

$$\dim\left(x\right) = \dim\left(\frac{\frac{a \times v}{f} + C}{Q}\right) = \dim\left(\frac{\text{C}}{\text{Q}}\right)$$

Use `Dimensional` to define each one of the known dimensions and calculate the unknown dimensions for \\\(C\\\) and \\\(x\\\).