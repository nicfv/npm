# Changelog

## 1.6.0

- Add `lim()`, `differentiate()`, and `integrate()`
- Write tests for standard deviation code
- Rename `n` to `data` for statistics functions
- Add `median()` function to API and `npx` command

## 1.5.1

- Add `stdevp()` and `stdevs()`
- Minor fixes in tsdoc
- Fix bug in `npx` where it would crash with 0 arguments
- Warn for missing arguments in `npx`

## 1.5.0

- Change spread syntax parameters to a single array parameter
- Update `exray` dependency version
- Update tsdoc examples
- Fix bug in `factorial()`
- Write tests for new functions
- Add all missing functions to `npx`

## 1.4.0

- Add `error()` function
- Update `exray` dependency version
- Add documentation on `npx smath` executables

## 1.3.5

- Restructure test files and scripts
- Run unit tests before every compilation

## 1.3.4

- Run tests using the `exray` testing framework

## 1.3.3

- Relative "Home" link does not work well. Changing to absolute link.
- Update contact details.

## 1.3.2

- Automate how examples are written into main readme file
- Write examples as JavaScript modules
- Stricter requirements on example file names
- Will not republish documentation if there was an error publishing to npm
- Add additional instructions for running examples
- Combine `build` and `types` scripts
- "Home" link is now a relative link
- Update dependency versions

## 1.3.1

- Fix internal file structure when published to npm (remove extra `src/`)

## 1.3.0

- Update typescript dependency to 5.4.3
- Install `xpt` exception testing framework 0.2.0
- Consolidate `build` and `types` into one script
- Simplify `build` command, arguments in `tsconfig.json`
- Update paths for `bin`, `main`, and `files`
- Add `test/` directory with all tests using `xpt` framework
- Update test script to automatically build and run all tests

## 1.2.0

- Add `npx` scripts. Run `npx smath` to learn more!
- Add more package examples in readme
- Add package example sources in repository

## 1.1.8

- Update internal packing scripts

## 1.1.7

- Update typedoc (0.25.12) and typescript (5.4.2) dev dependency versions

## 1.1.6

- Add `avg` function

## 1.1.5

- Add `linspace` and `logspace` functions
- Update documentation on getting started
- Add template readme in npm package
- Add link to changelog at the top of the readme

## 1.1.4

- Use readme template (adds new badges, guidelines, and more)

## 1.1.3

- Remove bug tracker (automatically populated by repository field)

## 1.1.2

- Clean up `package.json`
- Add bug tracker
- Update contact information
- Remove `dev` script

## 1.1.1

- Update example in README

## 1.1.0

- Remove `isNumber`, prefer builtin `isFinite()`
- Remove `round`, prefer builtin `toFixed()`
- Move all functions to `SMath` class
- Move class to index file

## 1.0.2

- Add rounding function
- `isNumber` cannot be +/- infinity
- Fix normalization bug when `min = max`

## 1.0.1

- Fix minor documentation in `SMath`
- Update typedoc version
- Show package version in documentation
- Disable links to GitHub and hide generator

## 1.0.0

- Make classes abstract
- Add short package documentation
- Add examples in documentation
- Add installation instructions and example in README

## 0.0.4

- Rename interpolator class
- Add and export `SMath` library
- Minor simplification in `tsconfig.json`
- Add badges in README
- Add keywords in `package.json`
- Add funding in `package.json`

## 0.0.3

- Fix bugs in scripts
- Install dependencies before publishing
- Add type declarations in `package.json`

## 0.0.2

- Add basic interpolation functions:
    - `normalize`
    - `expand`
    - `translate`
- Generate documentation with `typedoc`

## 0.0.1

- Add details in `package.json`

## 0.0.0

- Initialize empty package
- No longer available on npm