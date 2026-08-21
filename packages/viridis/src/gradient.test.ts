import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Gradient } from './gradient.js';
import { Color } from './color.js';

describe('gradient constructor', () => {
    it('should pass with >0 colors', () => {
        const gradient: Gradient = new Gradient([new Color(255, 0, 0)]);
        assert.strictEqual(gradient.colors.length, 1);
    });

    it('should fail with 0 colors', () => {
        assert.throws(() => new Gradient([]), /at least 1 color/i);
    });
});

describe('string conversion', () => {
    it('should return valid CSS', () => {
        const gradient: Gradient = new Gradient([
            new Color(255, 0, 0),
            new Color(0, 255, 0),
            new Color(0, 0, 255),
        ]);
        assert.strictEqual(gradient.toString(), 'linear-gradient(#FF0000,#00FF00,#0000FF)');
        assert.strictEqual(gradient.toString('linear'), 'linear-gradient(#FF0000,#00FF00,#0000FF)');
        assert.strictEqual(gradient.toString('linear', 1), 'linear-gradient(#FF0000,#00FF00,#0000FF)');
        assert.strictEqual(gradient.toString('linear', 1, '90deg'), 'linear-gradient(90deg,#FF0000,#00FF00,#0000FF)');
        assert.strictEqual(gradient.toString('linear', 2), 'repeating-linear-gradient(#FF0000,#00FF00,#0000FF 50%)');
        assert.strictEqual(gradient.toString('linear', 2, '90deg'), 'repeating-linear-gradient(90deg,#FF0000,#00FF00,#0000FF 50%)');
        assert.strictEqual(gradient.toString('radial'), 'radial-gradient(#FF0000,#00FF00,#0000FF)');
        assert.strictEqual(gradient.toString('conic'), 'conic-gradient(#FF0000,#00FF00,#0000FF)');
        assert.strictEqual(gradient.toString('radial', 1, 'ellipse', 'white'), 'radial-gradient(ellipse,white,#FF0000,#00FF00,#0000FF)');
    });
});

describe('getColor', () => {
    it('should return intermediate color', () => {
        const gradient: Gradient = new Gradient([
            new Color(255, 0, 0),
            new Color(0, 255, 0),
            new Color(0, 0, 255),
        ]);
        assert.strictEqual(gradient.getColor(-1).toString(), '#FF0000');
        assert.strictEqual(gradient.getColor(0, 10, 20).toString(), '#FF0000');
        assert.strictEqual(gradient.getColor(0.25).toString(), '#808000');
        assert.strictEqual(gradient.getColor(12.5, 10, 20).toString(), '#808000');
        assert.strictEqual(gradient.getColor(0.5).toString(), '#00FF00');
        assert.strictEqual(gradient.getColor(15, 10, 20).toString(), '#00FF00');
        assert.strictEqual(gradient.getColor(2).toString(), '#0000FF');
        assert.strictEqual(gradient.getColor(30, 10, 20).toString(), '#0000FF');
    });
});
