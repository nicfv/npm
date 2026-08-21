import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { SMath } from 'smath';
import { hsl2rgb, rgb2hsl } from './lib';
import { HSL, RGB } from './types';

describe('conversion functions', () => {
    it('should not change the color RGB values', () => {
        for (let red = 0; red < 256; red += 5) {
            for (let green = 0; green < 256; green += 7) {
                for (let blue = 0; blue < 256; blue += 11) {
                    const rgb: RGB = { red: red, green: green, blue: blue };
                    const hsl: HSL = rgb2hsl(rgb);
                    const rgb2: RGB = hsl2rgb(hsl);
                    assert.ok(SMath.approx(rgb.red, rgb2.red), 'red != red');
                    assert.ok(SMath.approx(rgb.green, rgb2.green), 'green != green');
                    assert.ok(SMath.approx(rgb.blue, rgb2.blue), 'blue != blue');
                }
            }
        }
    });
});