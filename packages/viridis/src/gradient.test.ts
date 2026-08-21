import assert from 'node:assert/strict';
import test, { describe, it } from 'node:test';
import { Gradient } from './gradient';
import { Color } from './color';

describe('gradient constructor', () => {
    it('should pass with >0 colors', () => {
        const gradient: Gradient = new Gradient([new Color(255, 0, 0)]);
        assert.strictEqual(gradient.colors.length, 2);
    });

    it('should fail with <1 colors', () => {
        assert.throws(() => new Gradient([]), /at least 1 color/i);
    });
});
