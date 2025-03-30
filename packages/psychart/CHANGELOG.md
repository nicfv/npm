# Changelog

## 0.3.2

- Add a dynamically growing, display-only legend, obtained with `Psychart.getLegend()`
- Add new `lineHeight` option for spacing within legend
- Change parameter `legend` to `seriesName`
- Change parameter `name` to `pointName`
- Points can now show timestamps even if they are not part of a time-dependent series

## 0.3.1

- Change SI enthalpy units to `kJ/kg`
- Replace numeric series ID with string name used for future legend
- Update dependency versions
- Time-independent data color codes must be input as a hex string

## 0.3.0

- Remove function to generate default Psychart options, replace with a constant
- Major updates to how options are configured
    - Psychart only takes 1 optional parameter, with all properties optional
    - Add property to configure font family
    - Configuration, layout, and styling options are combined
    - Plotting data takes 2 parameters, one for the state, and another with all properties optional
- Region gradients are specific to themes
- Remove some legacy Grafana options
- Throw error if data series ID is invalid
- Always show graph bounds, even if they don't perfectly align with major axes
- Allow new data series types!
    - Solid-color data series
    - Time-independent data series (does not show timestamp)
    - A mix of time-dependent and time-independent data series!
    - **Note:** To connect two data points with a line, they must have the same (non-empty) ID number
- Points on the same data series can have unique labels
- Improve source code documentation

## 0.2.2

- Add option of where to show units (in the tooltip only, axis only, or both)

## 0.2.1

- Major axis intervals are independent for axes of different unit types
- Show units in major axis tooltips

## 0.2.0

- Depend on npm package `psychrolib` instead of including its source code directly
- Scale up humidity ratio by x1,000 and adjust units appropriately
- Allow y-axis to be set to either dew point or humidity ratio (still allows flipping X and Y axes)
- Update examples, show how to render a Mollier diagram with an example
- Update base README file

## 0.1.1

- Add defaults and incorporate into the example

## 0.1.0

- Install required dependencies, and copy files from original repository
- Fix related bugs from directly copy/pasting files
- Add last update badge to all package documentation
- Embed *psychrolib* into this package

## 0.0.1

- Set up project structure as per contribution guidelines
- No longer available on npm

## 0.0.0

- Initialize empty package
- No longer available on npm
