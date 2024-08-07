# Changelog

## Unpublished (0.4.1)

- Update typescript dependency version to 5.5.4
- Rebuild package and documentation in monorepo style
- Replace testing framework dependency

## 0.4.1

- Update donation URL
- Minor LaTeX fix in main readme page
- Add keywords
- Update dependency versions
- Minor readme template updates

## 0.4.0

- Shorthand for "simple" units, attributes, and dimensions
- Rename `Measure` to `Attribute` (now the **QUAD** acronym works!)
    - Add "QUAD" documentation in base readme
- Minor documentation fix in `Unit`
- Add new shorthand methods for simple values

## 0.3.0

- Update dependency versions
- Export class to represent measurement types and `M()` shorthand
- Add a few common measurement types (base dimensions, geometry, and kinetics/kinematics)
- "Ownership chain" = `Quantity` > `Unit` > `Measure` > `Dimension`
- Fix bug with incorrect temperature scaling factor
- Rename `Fahrenheight/Celsius_rel` to `_delta`
- Add energy/power measurement types, and Joule/Watt units
- Add `isBase` member for dimensions to quickly determine if it is a base dimension
- Add extra documentation in `Unit` class
- Satisfying simplifications in `Unit` class

## 0.2.0

- Update dependency versions
- Remove `docs/` on postpack
- Scope everything using namespaces
- Add unit conversions for several units
- Add `None` types for dimensionless and unitless quantities
- Export helper functions `D()`, `U()`, and `Q()` for shorthand creation of dimensions, units, and quantities
- Create internal methods for metric prefixes and measurement types
- Unit scaling is now computed in the `Unit` class instead of `Quantity`
- Add several unit tests
- Add two basic examples

## 0.1.1

- Use global TypeDoc configuration file
- Compile and build documentation simultaneously
- Remove dependency on typescript (TypeDoc will take care of this)
- Remove declaration types for test on build output
- Output `tsc` version on `npm test`
- For now, export `lib`

## 0.1.0

- Install relevant dependencies
- Add base classes for compounds, dimensions, and units
- Add unit tests for dimensions and units
- Units are associated with base dimensions from a conversion table

## 0.0.0

- Initialize empty package
- No longer available on npm