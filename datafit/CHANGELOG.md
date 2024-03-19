# Changelog

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