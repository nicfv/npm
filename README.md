# npm
nicfv's public NPM packages in one repository

## Developer Notes
- Each package must have the following scripts
    - `test`
    - `docs`
    - `clean`
    - Something to compile on `npm publish`
- Each package must contain `README.md` and `CHANGELOG.md`
- Package descriptions containing ":" will be changed to ";"
- To test package in examples before deployment, follow the steps in [pack](#pack)

## Pack
```shell
cd $package
npm i
npm pack --pack-destination examples/
```