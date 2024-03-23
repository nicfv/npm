import { Color } from './Color';
import { X } from 'exray';
import { Gradient } from './Gradient';
import { Palette, PaletteName } from './Palette';

// Test color functionality
const red_RGB: Color = new Color(255, 0, 0),
    red_hex1: Color = Color.from('ff0000'),
    red_hex2: Color = Color.from('#ff0000'),
    red_hex3: Color = Color.from('FF0000'),
    red_hex4: Color = Color.from('#FF0000'),
    red_clamp: Color = new Color(300, -1, -1, 1e3);
X.is(red_hex1.toString(), red_RGB.toString());
X.is(red_hex2.toString(), red_RGB.toString());
X.is(red_hex3.toString(), red_RGB.toString());
X.is(red_hex4.toString(), red_RGB.toString());
X.is(red_RGB.getContrastingColor().toString(), 'rgba(255,255,255,100%)');
X.is(red_clamp.toString(), red_RGB.toString());

// Make sure that an error is caught for an invalid color code
let caught: boolean = false;
try {
    Color.from('#INVALID');
} catch (e) {
    caught = true;
}
X.true(caught);

// Test gradient functionality
const gradient: Gradient = new Gradient([
    new Color(255, 0, 0),
    new Color(0, 255, 0),
    new Color(0, 0, 255),
]);
X.is(gradient.toString(), 'linear-gradient(90deg,rgba(255,0,0,100%),rgba(0,255,0,100%),rgba(0,0,255,100%))');
X.is(gradient.toString(45), 'linear-gradient(45deg,rgba(255,0,0,100%),rgba(0,255,0,100%),rgba(0,0,255,100%))');
X.is(gradient.getColor(-1).toString(), red_RGB.toString());
X.is(gradient.getColor(0, 10, 20).toString(), red_RGB.toString());
X.is(gradient.getColor(0.25).toString(), 'rgba(127.5,127.5,0,100%)');
X.is(gradient.getColor(12.5, 10, 20).toString(), 'rgba(127.5,127.5,0,100%)');
X.is(gradient.getColor(0.5).toString(), 'rgba(0,255,0,100%)');
X.is(gradient.getColor(15, 10, 20).toString(), 'rgba(0,255,0,100%)');
X.is(gradient.getColor(2).toString(), 'rgba(0,0,255,100%)');
X.is(gradient.getColor(30, 10, 20).toString(), 'rgba(0,0,255,100%)');

// Ensure that each palette contains at least 1 color
for (const name in Palette) {
    X.ge(Palette[name as PaletteName].colors.length, 1);
}