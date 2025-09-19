> [**BACK**](../README.md) | **1** | [**NEXT**](./Analysis.md) | Up next: Learn how to use `Dimensional` for dimensional analysis!

Let's start with a simple example, to calculate BMI where all the inputs are US customary units. BMI is your mass in kilograms divided by your height in meters, squared.

$$\text{BMI} = \frac{m_{kg}}{h_{m}^{2}}$$

Let's assume you are 5'9" and weigh 140 lb 8 oz.

We'll first need to convert height from from feet and inches to SI units, or meters. Use `Dimensional` to define quantities of feet and inches, add them together, and convert them to meters. Then, we'll do the same for weight; from pounds (mass) and ounces to kilograms. We'll finally use these quantities to calculate BMI. Be sure to copy and paste the output into an online LaTeX editor to view the a cleaner version of the result!