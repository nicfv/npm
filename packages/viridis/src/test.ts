import * as T6 from 't6';
import * as SMath from 'smath';
import { Color } from './Color';
import { Gradient } from './Gradient';
import { Palette, PaletteName } from './Palette';
import { HSL, RGB } from './types';
import { hsl2rgb, rgb2hsl } from './lib';

// Test conversion functions
for (let red = 0; red < 256; red += 5) {
    for (let green = 0; green < 256; green += 7) {
        for (let blue = 0; blue < 256; blue += 11) {
            const rgb: RGB = { red: red, green: green, blue: blue };
            const hsl: HSL = rgb2hsl(rgb);
            const rgb2: RGB = hsl2rgb(hsl);
            T6.isTrue(SMath.approx(rgb.red, rgb2.red), 'red != red');
            T6.isTrue(SMath.approx(rgb.green, rgb2.green), 'green != green');
            T6.isTrue(SMath.approx(rgb.blue, rgb2.blue), 'blue != blue');
        }
    }
}

// Test color functionality
const red_RGB: Color = new Color(255, 16, 0),
    red_hex1: Color = Color.hex('ff1000'),
    red_hex2: Color = Color.hex('#ff1000'),
    red_hex3: Color = Color.hex('FF1000'),
    red_hex4: Color = Color.hex('#FF1000'),
    red_hex5: Color = Color.hex('#FF1000FF'),
    red_hex6: Color = Color.hex('#FF100080'),
    red_rgb7: Color = Color.rgb(255, 16, 0, 50),
    red_hsl8: Color = Color.hsl(4, 100, 50, 50),
    red_clamp: Color = new Color(300, 16, -1, 1e3);
T6.is(red_hex1.toString(), red_RGB.toString());
T6.is(red_hex2.toString(), red_RGB.toString());
T6.is(red_hex3.toString(), red_RGB.toString());
T6.is(red_hex4.toString(), red_RGB.toString());
T6.is(red_RGB.getContrastingColor().toString(), '#FFFFFF');
T6.is(red_clamp.toString(), red_RGB.toString());
T6.eq(red_hex5.alpha, 100);
T6.eq(red_hex6.alpha, 50);
T6.is(red_hex6.toString(), red_rgb7.toString());
T6.is(red_hex6.toString(), red_hsl8.toString());

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
T6.is(gradient.toString(), 'linear-gradient(90deg,#FF0000,#00FF00,#0000FF)');
T6.is(gradient.toString(45), 'linear-gradient(45deg,#FF0000,#00FF00,#0000FF)');
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