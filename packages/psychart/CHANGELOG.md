# Changelog

## 0.3.0

- Remove function to generate default Psychart options, replace with a constant
- Major updates to how options are configured
    - Psychart only takes 1 optional parameter, with all properties optional
    - Add property to configure font family
    - Configuration, layout, and styling options are combined
- Region gradients are specific to themes
- Remove some legacy Grafana options
- Throw error if data series ID is invalid
- Always show graph bounds, even if they don't perfectly align with major axes

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
