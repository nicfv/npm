# Changelog

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