This example shows how to set up a pump chart with some configuration options. The pump performance curve and system curves are ideal quadratic curved defined by the parameters provided. It uses the `plot()` method to plot a single data point at a time, and `getElement()` to append it onto the HTML page. When hovering over any data point or axis label, a tooltip will be displayed with more information.

If speed is *not* provided in the state variable, then Pumpchart will estimate the speed of the pump at that state. If power *is* provided in the state variable, then Pumpchart will calculate the output power and efficiency of the pump based on the head gain and flow rate. All units are assumed to be those provided within the options when initializing Pumpchart.

See below for the output of this example which plots 100 random data points.
