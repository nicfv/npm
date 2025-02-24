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

Psychart also has the capability to derive the following state variables, which are optionally displayed using the _Show Advanced State Variables_ switch in [Display options](#display-options).

- Vapor Pressure
    - The partial pressure of water in the vapor-air mixture.
- Humidity Ratio
    - Weight of water vapor per weight of dry air.
- Enthalpy
    - In thermodynamics, refers to the total heat content of the vapor-air mixture.
- Specific Volume
    - Amount of volume taken up by one unit of mass of the vapor-air mixture.

## Getting started

This section will go over the options to configure Psychart.

### Layout

Determines the size and padding of Psychart.

### PsyOptions

These options affect how the chart itself is displayed.

Allows the user to select whether measurements are being reported in US or SI units, the local altitude, graph bounds, flip X & Y, y-axis variable, and optionally display ASHRAE comfort regions (envelopes). For data center envelopes, these comfort regions follow the 2021 ASHRAE standard and are designed for data centers and IT spaces of various criticality. For human comfort envelopes, these comfort regions follow the ASHRAE-55 guidelines published in 2017. These human comfort envelopes are a function of metabolic rate (`MET`, which is dependent on the indoor activity), clothing level (`CLO`), and air speed. In both cases, the envelopes show the target region for conditioned air supplied into the indoor space.

In here we also define how data series are displayed using the `series` property.

### DataOptions

These options help process the incoming data and change the visual appearance of data within the chart.

Psychart is capable of plotting several data series of states per panel. Due to the fact that 2 properties are needed to fix the state, at least two numeric time-dependent fields are required. In this set of options, we can define the legend, measurement types, series name (for internal use), show advanced state variables, change the point radius, optionally draw a line between adjacent points in time, and select a color gradient for the data series. Gradients always use the more saturated/contrasting colors for the more recent data points, regardless of which theme (light/dark) is preferred.

Different data series are independent from one another - one series may incorporate dry bulb and wet bulb measurements, and another may incorporate dry bulb and dew point measurements, for instance.

### StyleOptions

We can set styling options for Psychart manually, or use the default with `Psychart.getDefaultStyleOptions(false/true)` depending on whether dark theme is preferred.

If done manually, we can set the theme, font size and color, axis color, interval, and resolution, and default timespan.

## Errors & Troubleshooting

Some errors can arise from the [data options](#dataoptions) section due to the fact that wet bulb and dew point must be less than or equal to the dry bulb temperature and relative humidity must be within the range of 0-1. If relative humidity is a driving measurement, make sure that the measurement type is correct (0-1 or 0%-100%). For other measurements, make sure that they are correct, numerical values.

Psychart works best both visually and practically when observing a manageable amount of data, e.g. a short timespan of a few days at most. If Psychart is loading very slowly, try disabling a data series, or clearing the plotted data using `Psychart.clearData()` and start fresh. However, this will **wipe all data** from Psychart, so make sure it's saved somewhere!