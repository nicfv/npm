import * as T6 from 't6';
import { Color } from './Color.js';
import { Gradient } from './Gradient.js';
import { Palette, PaletteName } from './Palette.js';

// Make sure all the string representations work
T6.is(red_hex6.toString('rgb'), 'rgb(255,16,0,50%)');
T6.is(red_hex6.toString('hsl'), 'hsl(3deg,100%,50%,50%)');
T6.is(red_hex6.toString('hex'), '#FF10007F');

// Make sure that an error is caught for an invalid color code
let caught = false;
try {
    Color.hex('#INVALID');
} catch {
    caught = true;
}
T6.isTrue(caught);

// Test gradient functionality
const gradient: Gradient = new Gradient([
    new Color(255, 0, 0),
    new Color(0, 255, 0),
    new Color(0, 0, 255),
]);
T6.is(gradient.toString(), 'linear-gradient(#FF0000,#00FF00,#0000FF)');
T6.is(gradient.toString('linear'), 'linear-gradient(#FF0000,#00FF00,#0000FF)');
T6.is(gradient.toString('linear', 1), 'linear-gradient(#FF0000,#00FF00,#0000FF)');
T6.is(gradient.toString('linear', 1, '90deg'), 'linear-gradient(90deg,#FF0000,#00FF00,#0000FF)');
T6.is(gradient.toString('linear', 2), 'repeating-linear-gradient(#FF0000,#00FF00,#0000FF 50%)');
T6.is(gradient.toString('linear', 2, '90deg'), 'repeating-linear-gradient(90deg,#FF0000,#00FF00,#0000FF 50%)');
T6.is(gradient.toString('radial'), 'radial-gradient(#FF0000,#00FF00,#0000FF)');
T6.is(gradient.toString('conic'), 'conic-gradient(#FF0000,#00FF00,#0000FF)');
T6.is(gradient.toString('radial', 1, 'ellipse', 'white'), 'radial-gradient(ellipse,white,#FF0000,#00FF00,#0000FF)');
T6.is(gradient.getColor(-1).toString(), '#FF0000');
T6.is(gradient.getColor(0, 10, 20).toString(), '#FF0000');
T6.is(gradient.getColor(0.25).toString(), '#7F7F00');
T6.is(gradient.getColor(12.5, 10, 20).toString(), '#7F7F00');
T6.is(gradient.getColor(0.5).toString(), '#00FF00');
T6.is(gradient.getColor(15, 10, 20).toString(), '#00FF00');
T6.is(gradient.getColor(2).toString(), '#0000FF');
T6.is(gradient.getColor(30, 10, 20).toString(), '#0000FF');

// Ensure that each palette contains at least 1 color
for (const name in Palette) {
    T6.ge(Palette[name as PaletteName].colors.length, 1);
}