# Changelog

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