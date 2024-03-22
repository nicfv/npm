# npm
nicfv's public NPM packages in one repository

## Developer Notes
- Each package must have the following scripts
    - `test`
    - `docs`
    - `clean`
    - Something to compile on `npm publish`
- Each package must contain `README.md` and `CHANGELOG.md`
- Each package must contain examples in `examples/`
    - Examples must be written in JavaScript and have the `.js` extension
    - Examples must depend on the current version of the package
    - Example directory must have its own `clean` script
- Package descriptions containing ":" will be changed to ";"
- To test package in examples before deployment, follow the steps in [pack](#pack)

## Pack
```shell
cd $package
npm i
npm pack --pack-destination examples/
```