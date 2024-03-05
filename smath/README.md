Small math function library

![NPM Version](https://img.shields.io/npm/v/smath)
![NPM Downloads](https://img.shields.io/npm/dt/smath)

## Installation

`smath` can be installed from the official [npm package repository](https://www.npmjs.com/package/smath). It is highly recommended to install the latest version.

```shell
npm i smath@latest
```

## Getting Started

**Example:** A temperature conversion tool.

```js
import { SMath, Polate } from 'smath';

// Define some constants to
// define the number ranges
const C_Freeze = 0,
    C_Boil = 100,
    F_Freeze = 32,
    F_Boil = 212;

// Use the `Polate` class to
// translate the temperature in the
// C number range to a temperature
// in the F number range
const C = 20,
    F_expected = 68,
    F_actual = Polate.translate(C, C_Freeze, C_Boil, F_Freeze, F_Boil);

// Use the `SMath` class to
// determine whether the number
// translation is valid
const valid = SMath.approx(F_expected, F_actual);
if (!valid) {
    throw 'Invalid result.';
}
```

Visit the [official documentation](https://npm.nicfv.com/smath/) to learn more!