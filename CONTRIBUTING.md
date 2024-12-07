# npm [![Publish](https://github.com/nicfv/npm/actions/workflows/publish.yml/badge.svg)](https://github.com/nicfv/npm/actions/workflows/publish.yml)
nicfv's public NPM packages in one repository

## Requirements
### Package
- Exists within `./packages/<name>/`
- Generally, `package.json` should follow the existing design pattern
    - Must support an `npm start` script which executes `.github/workflows/scripts`
- Must contain a `README.md` and `CHANGELOG.md`
- Source code must be written in `./packages/<name>/src/` and in the latest supported version of TypeScript
    - Includes `index.ts` as the entry point file
    - Includes `test.ts` for unit/integration testing
- Must contain examples in `examples/`

### Examples
- Must depend on the latest version of the package
    - Cannot have dependencies other than the ones in this repository (keep it simple)
- Must be written in modular JavaScript with the `.mjs` extension
- Each example must have a corresponding `<Example Name>.md` documentation file
    - This is shown above the example code in the generated documentation
    - This file supports LaTeX (uses MathJax for rendering)

### Versioning
- Packages begin development at version `0.0.0`
- Anything under `1.0.0` indicates unstable alpha or beta development
- Increase the patch counter for minor bug fixes, documentation updates, or other updates that impact functionality to a minimum
- Increase the minor counter for feature additions or minor behavioral changes, that are backwards compatible
- Increase the major counter for major changes that break backwards compatibility
- `CHANGELOG.md` should read in reverse chronological order, with the latest version at the top
    - The latest version in the changelog should match that of the package version
