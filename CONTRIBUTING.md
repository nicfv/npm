# Contribution Guidelines
Thank you for your interest in contributing! This project is a collection of open source software packages maintained by Nicolas Ventura ([@nicfv](https://github.com/nicfv)) for users like you! You are allowed to fork the repository as permitted by the [MIT License](https://raw.githubusercontent.com/nicfv/npm/main/LICENSE) terms. Contributions are welcome by submitting a [pull request](https://github.com/nicfv/npm/pulls). Please follow the existing code styling if submitting a pull request, and please be respectful and constructive in your interactions with other contributors. Once again, thank you for your consideration!

## Requirements
Below is a list of requirements that must be followed when contributing to this project.

### Package
- Exists within `./packages/<name>/`
- Generally, `package.json` should follow the existing design pattern
    - Must support an `npm start` script which executes `.github/workflows/scripts`
- Must contain a `README.md` and `CHANGELOG.md`
- Source code must be written in `./packages/<name>/src/` and in the latest supported version of TypeScript
    - Includes `index.ts` as the entry point file
    - Includes `test.ts` for unit/integration testing
- Must contain examples in `example/`

### Examples
- Must depend on the latest version of the package
    - Cannot have dependencies other than the ones in this repository (keep it simple)
- Must be written in modular JavaScript with the `.mjs` extension
- Each example must have a corresponding `<Example Name>.md` documentation file
    - This is shown above the example code in the generated documentation
    - This file supports LaTeX (uses MathJax for rendering)
- UI examples must be contained in their own subfolder within the examples folder
    - Must depend on `webpack-cli` in addition to the above requirements
    - Allowed files: `index.html`, `src/index.js` (for webpack's no-config setup, this isn't a webpack tutorial!)
    - Must include a descriptive `README.md` file in subfolder

### Versioning
- Packages begin development at version `0.0.0`
- Anything under `1.0.0` indicates unstable alpha or beta development
- Increase the patch counter for minor bug fixes, documentation updates, or other updates that impact functionality to a minimum
- Increase the minor counter for feature additions or minor behavioral changes, that are backwards compatible
- Increase the major counter for major changes that break backwards compatibility
- `CHANGELOG.md` should read in reverse chronological order, with the latest version at the top
    - The latest version in the changelog should match that of the package version
