## Getting Started

Small math? Simple math? Or supplemental math? Canonically, "SMath" is pronounced "smath" and stands for "small math (library.)" Similar to JavaScript's builtin [`Math`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) object, `SMath` exports one global object with several math-related helper functions. There is no need to instantiate the class, just call functions directly. See the examples below to get started using SMath!

## Executables

SMath is also packaged with an executabe that can be run directly through `npx` in the terminal - even outside of a NodeJS project! In fact, open your terminal now, and type the following to show a list of valid `npx smath` commands!

```shell
npx smath help
```

Commands are all structured like this.

```shell
npx smath [cmd] [args]
```

This example command returns the value 0.4.

```shell
npx smath normalize 4 0 10
```

> Most `SMath` functions are available through `npx`, except for calculus functions which require a functional argument.
