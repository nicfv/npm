This example shows how to set up a pump chart with some configuration options. It renders the ideal pump performance curve and system curves. The equations for the pump and system curves are quadratic equations defined by the parameters provided in the options; where:

- \\\(H_{\text{max}} =\\\) Maximum pump head at no flow
- \\\(Q_{\text{max}} =\\\) Maximum pump flow at no head
- \\\(H_{\text{static}} =\\\) Static head loss in the system
- \\\(k_{\text{fric}} =\\\) Coefficient of friction in the system

$$P(q) = H_{\text{max}} \times \left[ 1 - \left( \frac{q}{Q_{\text{max}}} \right)^{2} \right]$$

$$S(q) = H_{\text{static}} + k_{\text{fric}}q^{2}$$

Pumpchart uses the `plot()` method to plot a single data point at a time, and `getElement()` to append it onto the HTML page. When hovering over any data point or axis label, a tooltip will be displayed with more information.

If speed is *not* provided in the state variable, then Pumpchart will estimate the speed of the pump at that state. If power *is* provided in the state variable, then Pumpchart will calculate the output power and efficiency of the pump based on the head gain and flow rate. All units are assumed to be those provided within the options when initializing Pumpchart.

See below for the output of this example which plots 100 random data points.
