import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { SMath } from 'smath';
import { hsl2rgb, rgb2hsl } from './lib.js';
import { HSL, RGB } from './types.js';
import { Color } from './color.js';

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

describe('color constructors', () => {
    const red: Color = new Color(255, 16, 0);

    it('create a color from hex', () => {
        const hex: Color = Color.hex('ff1000');
        assert.strictEqual(red.toString(), hex.toString());
    });

    it('create a color from hex', () => {
        const hex: Color = Color.hex('#ff1000');
        assert.strictEqual(red.toString(), hex.toString());
    });

    it('create a color from hex', () => {
        const hex: Color = Color.hex('FF1000');
        assert.strictEqual(red.toString(), hex.toString());
    });

    it('create a color from hex', () => {
        const hex: Color = Color.hex('#FF1000');
        assert.strictEqual(red.toString(), hex.toString());
    });

    it('create a color from hex', () => {
        const hex: Color = Color.hex('#FF1000FF');
        assert.strictEqual(red.toString(), hex.toString());
    });

    it('create a color with transparency', () => {
        const rgb: Color = new Color(255, 16, 0, 50);
        const hex: Color = Color.hex('#FF100080');
        assert.strictEqual(rgb.alpha, hex.alpha);
        assert.strictEqual(rgb.toString(), hex.toString());
    });

    it('create a color from out-of-range values', () => {
        const red_clamp: Color = new Color(300, 16, -1, 1e3);
        assert.strictEqual(red.toString(), red_clamp.toString());
    });

    it('create a color from HSL', () => {
        const rgb: Color = Color.rgb(255, 128, 0, 50);
        const hsl: Color = Color.hsl(30, 100, 50, 50);
        assert.strictEqual(rgb.toString(), hsl.toString());
    });

    it('should throw an error for invalid hex', () => {
        assert.throws(() => Color.hex('#INVALID'), /invalid hex/i);
        assert.throws(() => Color.hex('turquoise'), /invalid hex/i);
        assert.throws(() => Color.hex(''), /invalid hex/i);
    });
});

describe('contrasting colors', () => {
    it('should return white', () => {
        const red: Color = new Color(255, 10, 0);
        const blue: Color = Color.hsl(180, 50, 45);
        const white: Color = new Color(255, 255, 255);
        assert.strictEqual(red.getContrastingColor().toString(), white.toString());
        assert.strictEqual(blue.getContrastingColor().toString(), white.toString());
    });

    it('should return black', () => {
        const green: Color = new Color(150, 250, 150);
        const pink: Color = Color.hsl(0, 100, 60);
        const black: Color = new Color(0, 0, 0);
        assert.strictEqual(green.getContrastingColor().toString(), black.toString());
        assert.strictEqual(pink.getContrastingColor().toString(), black.toString());
    });
});

describe('string conversion', () => {
    const blue: Color = new Color(0, 0, 255);
    const red: Color = Color.hsl(0, 90, 40, 25);
    const gray: Color = Color.hex('#808080C0');

    it('rgb output', () => {
        assert.strictEqual(blue.toString('rgb'), 'rgb(0,0,255)');
        assert.strictEqual(red.toString('rgb'), 'rgb(194,10,10,25%)');
        assert.strictEqual(gray.toString('rgb'), 'rgb(128,128,128,75%)');
    });

    it('hsl output', () => {
        assert.strictEqual(blue.toString('hsl'), 'hsl(240deg,100%,50%)');
        assert.strictEqual(red.toString('hsl'), 'hsl(0deg,90%,40%,25%)');
        assert.strictEqual(gray.toString('hsl'), 'hsl(0deg,0%,50%,75%)');
    });

    it('hex output', () => {
        assert.strictEqual(blue.toString('hex'), '#0000FF');
        assert.strictEqual(red.toString('hex'), '#C20A0A40');
        assert.strictEqual(gray.toString('hex'), '#808080BF');
    });
});