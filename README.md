# npm [![Publish](https://github.com/nicfv/npm/actions/workflows/publish.yml/badge.svg)](https://github.com/nicfv/npm/actions/workflows/publish.yml)
nicfv's public NPM packages in one repository

## Developer Notes
- Each package must have the following scripts
    - `test`
    - `docs`
    - `clean`
    - Something to compile on `npm publish`
- Each package must contain `README.md` and `CHANGELOG.md`
- Each package must contain examples in `examples/`
    - Examples must be written in JavaScript
    - File name pattern must follow `123-Example-Name.ext`
    - File extensions can be `js`, `mjs`, or `cjs`
    - Each example must have a corresponding `123-Example-Name.md` documentation file that is shown above the example.
    - Follow the steps in [pack](#pack) to test the latest package updates before publishing to npm. This is required by the CI workflow.
    - Example directory must have its own `clean` script
- Packages *should* contain a series of unit tests in `src/test.ts` which is executed on each build
- Package descriptions containing ":" will be changed to ";"

## Pack
```shell
cd $package
npm i
npm pack --pack-destination examples/
# .tgz file created in examples/
cd examples
npm i
node $example
```
> Make sure that `examples/package.json` has an up-to-date dependency where the version number matches that of the main `package.json` file.