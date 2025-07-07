# Changelog

## 1.2.0

- Rearrange code as per `eslint` standards. The import statement has changed.

## 1.1.9

- Add a helper `getTestNumber()` function for debugging purposes.

## 1.1.8

- This version is functionally identical to the previous, and is published as another test of the updated workflow system

## 1.1.7

- This version is functionally identical to the previous, but is published as a test of the updated workflow, with a cleaned up `package.json` file

## 1.1.6

- Update typescript dependency version to 5.7.2
- Publish with provenance
- Update dependency versions

## 1.1.5

- Fix typos in documentation

## 1.1.4

- Fix typos in documentation
- Fix issue where documentation was not getting published

## 1.1.3

- Rename package to `t6`
- Update typescript dependency version to 5.5.4
- Rebuild package and documentation in monorepo style

## 1.1.2

- Minor readme template updates

## 1.1.1

- Update donation URL

## 1.1.0

- Change `X` from a class to a namespace
- **Breaking change**: `X.true()` and `X.false()` are now `X.isTrue()` and `X.isFalse()` (since `true` and `false` are reserved keywords)
- Add a few more test cases
- Minor changes in the main readme documentation

## 1.0.5

- Update build scripts

## 1.0.4

- Use global TypeDoc configuration file
- Compile and build documentation simultaneously
- Remove dependency on typescript (TypeDoc will take care of this)
- Remove declaration types for test on build output
- Minor output change for test #1
- Output `tsc` version on `npm test`

## 1.0.3

- Update typescript dependency version to 5.4.4

## 1.0.2

- Make note of using `devDependency`

## 1.0.1

- Restructure test files and scripts
- Run unit tests before every compilation

## 1.0.0

- Show which test failed, as a unique number
- Improve on some of the default exception messages

## 0.0.3

- Fix bug where type declarations were not generated or packaged with the npm package

## 0.0.2

- Relative "Home" link does not work well. Changing to absolute link.
- Update contact details.

## 0.0.1

- Automate how examples are written into main readme file
- Write examples as JavaScript modules
- Stricter requirements on example file names
- Will not republish documentation if there was an error publishing to npm
- Add additional instructions for running examples
- Combine `build` and `types` scripts
- "Home" link is now a relative link
- Update dependency versions

## 0.0.0

- Initialize new package that exports `X` with several test cases