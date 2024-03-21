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