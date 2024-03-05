Small math function library

![NPM Version](https://img.shields.io/npm/v/smath)
![NPM Downloads](https://img.shields.io/npm/dt/smath)

## Installation

`smath` can be installed from the official [npm package repository](https://www.npmjs.com/package/smath). It is highly recommended to install the latest version.

```shell
npm i smath@latest
```

## Getting Started

**Example:** A temperature conversion tool using [`SMath.translate`](https://npm.nicfv.com/smath/classes/SMath.html#translate) to convert units and [`SMath.approx`](https://npm.nicfv.com/smath/classes/SMath.html#approx) to validate the result. The translation uses freezing and boiling points for 2 unit systems to linearly interpolate between them.

```js
import { SMath } from 'smath';

// Define some constants to
// define the number ranges
const C_Freeze = 0,
    C_Boil = 100,
    F_Freeze = 32,
    F_Boil = 212;

// Use the `SMath` class to
// translate the temperature in the
// C number range to a temperature
// in the F number range
const C = 20,
    F_expected = 68,
    F_actual = SMath.translate(C, C_Freeze, C_Boil, F_Freeze, F_Boil);

// Determine whether the
// temperature conversion
// is valid using `approx`
const valid = SMath.approx(F_expected, F_actual);
if (!valid) {
    throw new Error('Invalid result.');
}
```

Visit the [official documentation](https://npm.nicfv.com/smath/) to learn more!

## Contribute

`smath` is an open source software package hosted on a [GitHub repository](https://github.com/nicfv/npm). Bug reports and feature requests can be submitted in [issues](https://github.com/nicfv/npm/issues). Contributions are also accepted by submitting a [pull request](https://github.com/nicfv/npm/pulls). Please follow the code styling if submitting a pull request.