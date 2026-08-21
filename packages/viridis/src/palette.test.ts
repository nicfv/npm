import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Palette, PaletteName } from './palette.js';

describe('palettes', () => {
    it('all palettes contain colors', () => {
        for (const name in Palette) {
            assert.ok(Palette[name as PaletteName].colors.length > 1);
        }
    });
});
