# Changelog

## 1.0.10

- Automate how examples are written into main readme file
- Write examples as JavaScript modules
- Stricter requirements on example file names
- Will not republish documentation if there was an error publishing to npm
- Add additional instructions for running examples
- Combine `build` and `types` scripts
- "Home" link is now a relative link

## 1.0.9

- Update internal packing scripts
- Update `smath` dependency to 1.1.7

## 1.0.8

- Readme fixes (move builtin palettes to the top)
- Update `smath` dependency to 1.1.6
- Update typedoc (0.25.12) and typescript (5.4.2) dev dependency versions

## 1.0.7

- Use readme template (adds new badges, guidelines, and more)

## 1.0.6

- Remove bug tracker (automatically populated by repository field)
- Bump up `smath` dependency to 1.1.2

## 1.0.5

- Clean up `package.json`
- Add bug tracker
- Update contact information

## 1.0.4

- Update documentation for `Color.getContrastingColor()`
- Update examples on readme
- Update how `Gradient.getColor()` works
    - Instead of requiring a normalized value, it can now accept a number and range, and will automatically normalize it

## 1.0.3

- Update documentation for `new Gradient`
- Add documentation under builtin palettes

## 1.0.2

- Add package keywords
- Add npm badges to readme
- Make gradient colors public

## 1.0.1

- Export palette name type

## 1.0.0

- Add color palettes on readme
- Remove packageDocumentation in Palette
- Add credits in Palette documentation
- Remove Palette type
- Add examples in `Color` and `Gradient`
- Add program examples in readme
- First full release

## 0.0.4

- Export palette
- Update tagline description

## 0.0.3

- Add default color gradient palettes
- Generate CSS from color gradient
- Define colors from hexadecimal strings

## 0.0.2

- Add and export class to compute linear, uniform gradients based on an array of colors

## 0.0.1

- Set up package details in `package.json`
- Install developer dependencies (`typescript`, `typedoc`)
- Install `smath@1.1.1` as dependency
- Add and export color class
- Add package documentation

## 0.0.0

- Initialize empty package
- No longer available on npm