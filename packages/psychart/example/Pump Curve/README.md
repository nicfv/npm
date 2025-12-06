This example shows how to set up a pump chart with some configuration options. The pump performance curve and system curves are defined by a string function defition using `q` as the flow variable; e.g. `10-q^2` will generate the function \\\(h(q)=10-q^{2}\\\). It uses the `plot()` method to plot a single data point at a time, and `getElement()` to append it onto the HTML page. When hovering over any data point or axis label, a tooltip will be displayed with more information.

See below for the output of this example which plots 100 random data points.
