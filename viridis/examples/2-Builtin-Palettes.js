import { Palette } from 'viridis';

const T_cold = 0,
    T_hot = 100,
    T_current = 55;

// Look at the list of builtin palettes!
// The red side of "Spectral" is on the left,
// meaning that is the lower bound. We want
// to map that to the hot temperature.
const background = Palette.Spectral.getColor(T_current, T_hot, T_cold),
    foreground = background.getContrastingColor();

console.log('Background: ' + background);
console.log('Foreground: ' + foreground);