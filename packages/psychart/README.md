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