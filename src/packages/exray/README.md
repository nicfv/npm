## Install for Development

If exray is only used during the testing phase of development, it can be installed as a `devDependency` instead of a `dependency`. The difference here is that when you pack up your package, or when other people install your package, it will contain all dependencies, but no devDependencies. To install exray as a devDependency, use the following command in your project directory.

```shell
npm i -D exray
```

## Getting Started

exray contains a simple, lightweight assertion testing framework for JavaScript and TypeScript projects. If any one of the exray tests fail, it will throw an exception and halt program execution. Exceptions can be caught using the standard `try ... catch` block.

exray exports one namespace, `X`, that includes several different test types, all of which can be simply derived from `X.isTrue(...)`. Each test type throws a unique exception message if failed. Custom exception messages are optional, but always recommended for clarity to explain why a test may have failed.
