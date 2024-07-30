# Changelog

## 1.4.6

- Update typescript dependency version to 5.5.4
- Rebuild package and documentation in monorepo style
- Replace testing framework dependency

## 1.4.5

- Update dependency versions
- Update donation URL
- Minor readme template updates

## 1.4.4

- Update dependency versions
- Update build scripts

## 1.4.3

- Update dependency versions
- Minor documentation update for `F`
- Use global TypeDoc configuration file
- Compile and build documentation simultaneously
- Remove dependency on typescript (TypeDoc will take care of this)
- Remove declaration types for test on build output
- Output `tsc` version on `npm test`

## 1.4.2

- Update dependency versions
- Minor documentation update for `F`
- Use normal distribution for parameter mutation instead of uniform distribution
- Add additional test cases

## 1.4.1

- Update dependency versions
- Update unit test script
- Update multivariant example

## 1.4.0

- Update `smath` dependency
- Install `exray` dependency
- Write unit tests using `exray` framework
- Update build script to run unit tests automatically
- Update `Summary.f` type to only accept 1 parameter

## 1.3.4

- Fix bug where type declarations were not generated or packaged with the npm package
- Update `smath` dependency

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

- Fix broken link in readme

## 1.3.0

- `maxDeviation` is now a normalized input
- Update single variable example to reflect this
- Update summary variable name for average absolute error

## 1.2.0

- Update `Summary` definition
- Add more keywords to `package.json`
- Update examples for new `Summary` schema
- Bump `smath` dependency to 1.1.8
- Add link to YouTube in readme

## 1.1.1

- Fix `postpack` script
- Fix unknown highlighting for typedoc

## 1.1.0

- Remove several interface types
- Deviation/mutation is now relative
- Remove MathJax HTML tag from npm readme
- Major updates to readme
- Remove config, replace with `fit()` parameters
- Include examples from readme in repo

## 1.0.7

- Update typedoc (0.25.12) and typescript (5.4.2) dev dependency versions

## 1.0.6

- Use readme template (adds new badges, guidelines, and more)
- Add LaTeX (MathJax) equations in readme file

## 1.0.5

- Remove bug tracker (automatically populated by repository field)
- Bump up `smath` dependency to 1.1.2

## 1.0.4

- Clean up `package.json`
- Add bug tracker
- Update contact information

## 1.0.3

- `T extends VariableType` (without this, we can assign any type to `T`)

## 1.0.2

- Change compiler library to `es2015`

## 1.0.1

- Minor readme fixes

## 1.0.0

- Do not require all configuration options for `fit()`
- Add full program examples on readme
- Finish building out readme homepage

## 0.3.0

- Update variable and type names to be more descriptive
- Minor tsdoc updates
- Start working on main readme

## 0.2.0

- Rename `CurveFit.ts` to `lib.ts`
- Remove class, export functions directly
- Add `Parameters` helper type
- Change `Point` to `Datum`
- Add plenty of examples
- Use `SMath` in more places to clean up code

## 0.1.0

- Update code base to use a genetic-style algorithm that randomly mutates the set of function parameters
- Support both single and multi-variable curve fitting
- Add several helpful type definitions

## 0.0.2

- Set up basic single-variable curve-fitting algorithm using a "search range" method. This method is not ideal because it is extremely prone to getting stuck in local minima and has a difficult time zeroing in on the true best fit.

## 0.0.1

- Set up npm package details
- Create empty index file

## 0.0.0

- Initialize empty package
- No longer available on npm