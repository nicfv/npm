## Install for Development

If exray is only used during the testing phase of development, it can be installed as a `devDependency` instead of a `dependency`. The difference here is that when you pack up your package, or when other people install your package, it will contain all dependencies, but no devDependencies. To install exray as a devDependency, use the following command in your project directory.

```shell
npm i -D exray
```

## Getting Started

exray contains a simple, lightweight assertion testing framework for JavaScript and TypeScript projects. If any one of the exray tests fail, it will throw an exception and halt program execution. Exceptions can be caught using the standard `try ... catch` block.

exray exports one class, `X`, that includes several different test types, however all of them can be simply derived from `X.true(...)`. Custom exception messages are always optional, but recommended for clarity in case a test fails.
