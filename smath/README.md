## Getting Started

Similar to JavaScript's builtin [`Math`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) object, `SMath` exports one global object with several math-related helper functions. There is no need to instantiate the class, just call functions directly. See the examples below to get started using SMath!

## Example

Here are a few examples written in JavaScript for a quick start into `SMath`.

### JavaScript Math Oddities

```js
import { SMath } from 'smath';

// Determine the value of 0.1 + 0.2 using vanilla JavaScript and SMath
console.log('0.1 + 0.2 == 0.3 is ' + (0.1 + 0.2 == 0.3));
console.log('SMath.approx(0.1 + 0.2, 0.3) is ' + SMath.approx(0.1 + 0.2, 0.3));
```

```text
0.1 + 0.2 == 0.3 is false
SMath.approx(0.1 + 0.2, 0.3) is true
```

### Temperature Conversion

A temperature conversion tool using [`SMath.translate`](https://npm.nicfv.com/smath/classes/SMath.html#translate) to convert units. The translation uses freezing and boiling points for 2 unit systems to linearly interpolate between them.

```js
import { SMath } from 'smath';

// Water always freezes at the
// same temperature, but the
// units might be different.
// Define some constants to
// create two number ranges.
const C_Freeze = 0,
    C_Boil = 100,
    F_Freeze = 32,
    F_Boil = 212;

// Use the `SMath` class to
// generate an array of five
// linearly spaced temperature
// values from 0 to 20.
const C = SMath.linspace(0, 20, 5);

// Use the `SMath` class to linearly
// interpolate the temperature in the
// C number range to a temperature
// in the F number range.
const F = C.map(c => SMath.translate(c, C_Freeze, C_Boil, F_Freeze, F_Boil));

// Print out each temperature
// in both units of C and F.
for (let i = 0; i < C.length; i++) {
    console.log(C[i].toFixed() + 'C is ' + F[i].toFixed() + 'F')
}
```

```text
0C is 32F
5C is 41F
10C is 50F
15C is 59F
20C is 68F
```