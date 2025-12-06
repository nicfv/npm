# Psychart

View air conditions on a psychrometric chart.

## What is a psychrometric chart?

Psychrometric charts are charts adopted by [ASHRAE](https://www.ashrae.org/) that plot various thermodynamic properties of air-vapor mixtures. These charts are particularly useful in HVAC applications. The following properties describe what's called a _state_ of air. **Two** properties are needed to fix the state of air, which means that two properties are needed in order to calculate every other property. The following 4 properties are plotted by Psychart by default:

- Dry Bulb
    - The temperature of air using a dry thermometer.
- Wet Bulb
    - Wet bulb temperature can be practically explained by the temperature of a surface where water is evaporating.
- Dew Point
    - Water will condense from the air at or below this temperature.
- Relative Humidity
    - A ratio of vapor pressure in the air to the saturation vapor pressure. 0%rh indicates absolutely dry air, and 100%rh indicates saturated air.

Psychart also has the capability to derive the following state variables, which are optionally displayed using the _Show Advanced State Variables_ switch in [DataOptions](#dataoptions).

- Vapor Pressure
    - The partial pressure of water in the vapor-air mixture.
- Humidity Ratio
    - Weight of water vapor per weight of dry air.
- Enthalpy
    - In thermodynamics, refers to the total heat content of the vapor-air mixture.
- Specific Volume
    - Amount of volume taken up by one unit of mass of the vapor-air mixture.
- Degree of Saturation
    - The ratio of the humidity ratio of moist air to that of saturated moist air.

## Getting started

This section will go over the options to configure Psychart. Psychart is designed to be easy to use for beginners but also highly customizable for experts using the `PsychartOptions` object. The simplest example is as follows:

```js
const psychart = new Psychart(); // Initialize Psychart with default settings.
document.body.append(psychart.getElement()); // Render Psychart onto the document.
psychart.plot({ db: 68, other: 55, measurement: 'dbwb' }); // Plot a data point.
```

### PsychartOptions

These options affect how the chart looks and behaves.

Allows the user to select whether measurements are being reported in US or SI units, the local altitude, graph bounds, flip X & Y, y-axis variable, other styling options such as font and color, and optionally display ASHRAE comfort regions (envelopes). For data center envelopes, these comfort regions follow the 2021 ASHRAE standard and are designed for data centers and IT spaces of various criticality. For human comfort envelopes, these comfort regions follow the ASHRAE-55 guidelines published in 2017. These human comfort envelopes are a function of metabolic rate (`MET`, which is dependent on the indoor activity), clothing level (`CLO`), and air speed. In both cases, the envelopes show the target region for conditioned air supplied into the indoor space.

### DataOptions

These options change the visual appearance of data within the chart.

Psychart is capable of plotting several data series of states per panel. Due to the fact that 2 properties are needed to fix the state, at least two numeric time-dependent fields are required. In this set of options, we can define the point or series name, measurement types, show advanced state variables, change the point radius, optionally draw a line between adjacent points in time, and select a color gradient for the data series. Gradients can be flipped using the `flipGradients` setting in [PsychartOptions](#psychartoptions), which may create a better contrast for light/dark modes.

If no timestamps are provided, Psychart will assume this is not a time-dependent point, and will fall back from using a gradient to a solid color defined by `color` which requires a color hex-code. A series name is required to connect points with a line and show up in the legend. A point name is a unique name given to an individual point, for example "Setpoint." A data point can have both a series name and a point name, and both will be shown in the tooltip.

Different data series are independent from one another - one series may incorporate dry bulb and wet bulb measurements, and another may incorporate dry bulb and dew point measurements, for instance.

## Errors & Troubleshooting

Some errors can arise from plotting data due to the fact that wet bulb and dew point must be less than or equal to the dry bulb temperature and relative humidity must be within the range of 0-1. If relative humidity is a driving measurement, make sure that the measurement type is correct (0-1 or 0%-100%). For other measurements, make sure that they are correct, numerical values. For example, the wet bulb and dew point temperatures must be less than the dry bulb temperature.

Psychart works best both visually and practically when observing a manageable amount of data, e.g. a short timespan of a few days at most. If Psychart is loading very slowly, try clicking on a data series in the legend to disable it, or clearing the plotted data using `Psychart.clearData()` and start fresh. However, this will **wipe all data** from Psychart, so make sure it's saved somewhere!

# Pumpchart

Show pump performance for different operating conditions.

## What is a pump chart?

Pump charts illustrate the relationship between fluid flow rate and head pressure for centrifugal pumps. Pump charts are often used in pump sizing selections and help engineers understand the pump's performance and effiency under various conditions.

Similar to the psychrometric chart described above, a pump chart is a graphical representation of various *states* of a hydraulic system. A *state* consists of a **flow rate** (e.g. gpm or m^3/h) and a **head pressure** (e.g. psi or bar.) The head pressure can also be represented in terms of the height of a fluid column, so it may be represented in units such as feet or meters, but it represents the same property regardless if it is a measurement of pressure or length. Other properties can be present such as pump speed, input power, and efficiency, but only **flow rate** and **head pressure** are needed to fix the state.

It's these two properties (flow and head) that are represented on the axes of the pump chart. Flow rate is represented on the x-axis and head pressure is represented on the y-axis.

> One way to visualize **head** if given in terms of length, is that it would be the maximum possible height that a pump could move the fluid for that flow rate.

## Pump and System Curves

In addition to the axes and plotted data points, Pumpchart renders two additional curves. These are called the **pump performance curve** and the **system curve**. The pump performance curve(s) show the relationship between the pump's flow rate and the pressure added to the fluid. There may be concentric pump performance curves that show this relationship for different operating speeds.

The system curve represents the characteristics of the system, independent from the pump curve. It illustrates the relationship between flow rate and head loss for the entire hydraulic system. Head loss can be due to sharp pipe bends, friction, throttling, or any other restrictions in the system.

For a closed system, the system curve should theoretically pass through the origin, indicating no head loss for no flow. For an open system, the system curve will pass through a point along the y-axis, indicating that there is a head loss even for no flow. This head loss is the elevation difference between the system inlet and outlet, which the pump needs to overcome in order to produce any flow at all.

## Operation Point

Pumps will *always* operate somewhere along the system curve in steady-state operation. Where the pump curve (for the current pump speed) and the system curve meet is called the **operation point**. The operation point can be adjusted by one of two ways:

1. **Adjusting the pump speed** which adjusts the active pump curve. If this is possible (e.g. the pump has multiple speed settings or is powered by a variable frequency drive) then this maintains the efficiency of the pump.
1. **Throttle the system** which adjusts the system curve. This decreases pump efficiency because the same amount of power is inputted into the pump motor but it is outputting a lower flow rate.

## Net Positive Suction Head

**IMPORTANT!** This curve is not (yet) shown on Pumpchart. Net positive suction head required, or NPSHr, is an extremely important property of the pump which dictates at least how much gauge pressure is required on the suction side of the pump. If the suction pressure drops below this amount, then *cavitation* will occur. This causes bubbles to form and collapse in the fluid which causes damage to piping and the pump itself.

## Getting Started

Pumpchart can be initialized with no configuration. After installing `psychart`, you can immediately start using it out-of-box like this.

```js
const pumpchart = new Pumpchart(); // Use default settings
document.body.append(pumpchart.getElement());
pumpchart.plot({ flow: 60, head: 40 });
```

However, Pumpchart is meant to be highly customizable and the following sections will outline some of its features.

## PumpchartOptions

Set axes properties, unit system, define the pump performance and system curves, operating speed, and styling options here.

```js
const pumpchart = new Pumpchart({ /* options here */ });
```

## PumpchartDataOptions

Set options for plotting data, such as providing a point name, timestamp, point radius, and color.

```js
pumpchart.plot({ flow: 60, head: 40 }, { /* options here */ });
```

## Troubleshooting

If you are experiencing errors in creating the pump curve initially, note that the pump curve must must cross the x-axis at a single point; and the pump and system curves must also cross at a single point to determine the operating point. These curves are typically quadratic curves with \\\(p(q) = h_{p} - k_{p}q^{2}\\\) and \\\(s(q) = h_{s} + k_{s}q^{2}\\\) patterns. Also, make sure that these raw strings are functions of the variable `q` and reference no other variables.
