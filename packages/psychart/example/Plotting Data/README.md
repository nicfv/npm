# Plotting Data

In this example, we set up Psychart with the ability to render data series from multiple streams. Two variables are required to fix the state, but data streams can be in many different formats. Psychart supports the following measurement types:

- Dry bulb (db) and wet bulb (wb)
- Dry bulb and dew point (dp)
- Dry bulb and relative humidity (rh)

Each data series need to be assigned a unique numeric ID, which does not have to be organized or 0-indexed, and each series can support totally different styling options.

In this example, we are plotting time-series data from two rooms in a building, **R1** and **R2**. Room **R1** contains dry bulb and wet bulb sensors, and room **R2** contains dry bulb and dew point sensors, all reporting in \\\(^{\circ}\text{F}\\\), but in different time intervals. Psychart can process and render this data using the `plot()` function with appropriate arguments. We can set a unique numeric ID for each data series in order to connect points with a line.

Additionally, as we are using Psychart to monitor human comfort, we can render the [ASHRAE](https://www.ashrae.org/) standard-55 envelopes that come pre-built with Psychart. These are toggled on with the `PsychartOptions` object passed into the initialization of Psychart. Any number of regions can be rendered on Psychart.

We can also render a legend for Psychart. Plotted data needs the `seriesName` property to be considered as a true data series to be rendered in the legend.