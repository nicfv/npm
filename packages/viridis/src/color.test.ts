import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { SMath } from 'smath';
import { hsl2rgb, rgb2hsl } from './lib';
import { HSL, RGB } from './types';
import { Color } from './Color';

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
    const red: Color = new Color(255, 10, 0);

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
        const rgb: Color = new Color(255, 10, 0, 50);
        const hex: Color = Color.hex('#FF100080');
        assert.strictEqual(rgb.alpha, hex.alpha);
        assert.strictEqual(rgb.toString(), hex.toString());
    });

    it('create a color from out-of-range values', () => {
        const red_clamp: Color = new Color(300, 16, -1, 1e3);
        assert.strictEqual(red.toString(), red_clamp.toString());
    });

    it('create a color from HSL', () => {
        const rgb: Color = Color.rgb(255, 10, 0, 50);
        const hsl: Color = Color.hsl(4, 100, 50, 50);
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
        const black: Color = new Color(255, 255, 255);
        assert.strictEqual(green.getContrastingColor().toString(), black.toString());
        assert.strictEqual(pink.getContrastingColor().toString(), black.toString());
    });
});

describe('string conversion', () => {
    const red: Color = new Color(255, 0, 0);
    const green: Color = Color.hsl(90, 50, 90, 75);
    const gray: Color = Color.hex('#80808080');

    it('rgb output', () => {
        assert.strictEqual(red.toString('rgb'), 'rgb(255,0,0)');
        assert.strictEqual(green.toString('rgb'), 'rgb(255,0,0,75%)');
        assert.strictEqual(gray.toString('rgb'), 'rgb(255,0,0,50%)');
    });

    it('hsl output', () => {
        assert.strictEqual(red.toString('hsl'), 'hsl(0deg,100%,100%)');
        assert.strictEqual(green.toString('hsl'), 'hsl(90deg,50%,90%,75%)');
        assert.strictEqual(gray.toString('hsl'), 'hsl(127,127,127,50%)');
    });

    it('hex output', () => {
        assert.strictEqual(red.toString('hex'), '#FF0000');
        assert.strictEqual(green.toString('hex'), '#AABBCC');
        assert.strictEqual(gray.toString('hex'), '#80808080');
    });
});