# Changelog

## 0.4.3

- **Hotfix:** Allow `relHumType` parameter in `drawLine()` to opt between `float` (0.0-1.0) and `percent` (0-100%)
    - **Note:** `drawLine()` will be integrated into `plot()` in a future update and use the same data options (`plot()` will have the ability to draw arbitrary lines)

## 0.4.2

- Expose a `drawLine()` function to draw a line between 2 arbitary points on Psychart

## 0.4.1

- Change legend `placement` to `margin`, as legend will now auto-place itself depending on whether or not `flipXY` is toggled on/off
- Remove extraneous `pointName` and `seriesName` properties and add a single `name` property
- Added new `legend` boolean property which can be used to optionally hide or show point in the legend
- Various documentation updates for clarity

## 0.4.0

- Add Psychart options for legend `placement` and `size`
- Add degree of saturation in data tooltips, when advanced variables are toggled on
- The legend is now included in `Psychart.getElement()` but can effectively be removed by setting dimensions to zero
    - The member function to obtain just the legend has been removed
- Psychart axes are always labeled for the min/max values, and will leave necessary spacing between major axes
- Tooltip internal padding is now dynamic, as a function of font size (larger fonts will now be totally within the tooltips)
- Add legend title
- Adjust element positioning in the legend for a better appearance
- Various updates in documentation and code organization improvements
- Update examples to reflect changes
- Update main README file

## 0.3.3

- The elements in the legend are now clickable, which toggles their visibility on Psychart
- Update plotting data example to show a point not part of a data series
- Remove `enabled` data options property, since you can hide data by clicking on the legend
- Fixed bug where clearing data would not clear the legend

## 0.3.2

- Add a dynamically growing, display-only legend, obtained with `Psychart.getLegend()`
- Add new `lineHeight` option for spacing within legend
- Change parameter `legend` to `seriesName`
- Change parameter `name` to `pointName`
- Points can now show timestamps even if they are not part of a time-dependent series
- Updates in `PsychartOptions`
    - Remove themes (not really necessary, since you can only select one during initialization)
    - Remove references to `Color`, instead, use hex-codes
    - Add new `flipGradients` boolean option to flip all gradients, good for dark themes

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
