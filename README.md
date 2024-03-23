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
    - Examples must depend on the current version of the package
    - Example directory must have its own `clean` script
- Package descriptions containing ":" will be changed to ";"
- To test package in examples before deployment, follow the steps in [pack](#pack)

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
Note: make sure that `examples/package.json` has an up-to-date dependency where the version number matches that of the main `package.json` file.