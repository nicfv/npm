My fictitious vehicle's fuel consumption rate is dependent on several factors:
- The current **acceleration** (how far I've pushed the gas pedal)
- The **speed** (due to increased wind resistance)
- The **mass** of my vehicle and it's contents (increased tire/road friction)
- A constant term representing my engine idling

From these terms, we can conclude that the fuel consumption (\\\(\text{Q}\\\)) is directly proportional to acceleration (\\\(\text{a}\\\)) and speed (\\\(\text{v}\\\)), and inversely proportional to mass (\\\(\text{m}\\\)), plus a constant term (\\\(\text{C}\\\)). I want to know two things:

1. What are the dimensions on my constant term? (\\\(\text{C}\\\))
1. What are the dimensions on my proportionaly constant? (\\\(x\\\))

Let's set up our equation and substitute in our variables:

$$\text{Fuel consumption} = x \times \left[ \frac{\text{Acceleration} \times \text{Speed}}{\text{Mass}} + \text{C} \right]$$

$$\text{Q} = x \times \left[ \frac{\text{a} \times \text{v}}{\text{m}} + \text{C} \right]$$

From our dimensional analysis or physics class, we know that we can only add terms of like dimensions, so that means that:

$$\dim\left(\text{C}\right) = \dim\left(\frac{\text{a} \times \text{v}}{\text{m}}\right)$$

We can also isolate \\\(x\\\) to determine its dimensionality as well:

$$\dim\left(x\right) = \dim\left(\frac{\frac{\text{a} \times \text{v}}{\text{m}} + \text{C}}{\text{Q}}\right) = \dim\left(\frac{\text{C}}{\text{Q}}\right)$$