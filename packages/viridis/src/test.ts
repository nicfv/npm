import { Color } from './Color';
import { T6 } from 't6';
import { Gradient } from './Gradient';
import { Palette, PaletteName } from './Palette';

// Test color functionality
const red_RGB: Color = new Color(255, 16, 0),
    red_hex1: Color = Color.from('ff1000'),
    red_hex2: Color = Color.from('#ff1000'),
    red_hex3: Color = Color.from('FF1000'),
    red_hex4: Color = Color.from('#FF1000'),
    red_hex5: Color = Color.from('#FF1000FF'),
    red_hex6: Color = Color.from('#FF100080'),
    red_clamp: Color = new Color(300, 16, -1, 1e3);
T6.is(red_hex1.toString(), red_RGB.toString());
T6.is(red_hex2.toString(), red_RGB.toString());
T6.is(red_hex3.toString(), red_RGB.toString());
T6.is(red_hex4.toString(), red_RGB.toString());
T6.is(red_RGB.getContrastingColor().toString(), 'rgba(255,255,255,100%)');
T6.is(red_clamp.toString(), red_RGB.toString());
T6.eq(red_hex5.alpha, 100);
T6.eq(red_hex6.alpha, 50);

// Make sure all the string representations work
T6.is(red_hex6.toString('rgb'), 'rgb(255,16,0)');
T6.is(red_hex6.toString('rgba'), 'rgba(255,16,0,50%)');
T6.is(red_hex6.toString('hex'), '#FF1000');
T6.is(red_hex6.toString('hex-transparency'), '#FF100080');

// Make sure that an error is caught for an invalid color code
let caught: boolean = false;
try {
    Color.from('#INVALID');
} catch (e) {
    caught = true;
}
T6.isTrue(caught);

// Test gradient functionality
const gradient: Gradient = new Gradient([
    new Color(255, 0, 0),
    new Color(0, 255, 0),
    new Color(0, 0, 255),
]);
T6.is(gradient.toString(), 'linear-gradient(90deg,rgba(255,0,0,100%),rgba(0,255,0,100%),rgba(0,0,255,100%))');
T6.is(gradient.toString(45), 'linear-gradient(45deg,rgba(255,0,0,100%),rgba(0,255,0,100%),rgba(0,0,255,100%))');
T6.is(gradient.getColor(-1).toString(), 'rgba(255,0,0,100%)');
T6.is(gradient.getColor(0, 10, 20).toString(), 'rgba(255,0,0,100%)');
T6.is(gradient.getColor(0.25).toString(), 'rgba(127,127,0,100%)');
T6.is(gradient.getColor(12.5, 10, 20).toString(), 'rgba(127,127,0,100%)');
T6.is(gradient.getColor(0.5).toString(), 'rgba(0,255,0,100%)');
T6.is(gradient.getColor(15, 10, 20).toString(), 'rgba(0,255,0,100%)');
T6.is(gradient.getColor(2).toString(), 'rgba(0,0,255,100%)');
T6.is(gradient.getColor(30, 10, 20).toString(), 'rgba(0,0,255,100%)');

// Ensure that each palette contains at least 1 color
for (const name in Palette) {
    T6.ge(Palette[name as PaletteName].colors.length, 1);
}