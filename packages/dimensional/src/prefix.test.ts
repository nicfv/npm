import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { config, Prefix } from './index.js';

describe('prefix constructor', () => {
    it('generate LaTeX', () => {
        const kibi: Prefix = new Prefix('Ki', 1024);
        assert.strictEqual(kibi.LaTeX, '\\text{Ki}');
        assert.strictEqual(kibi.scale, 1024);
    });

    it('not generate LaTeX', () => {
        const alph: Prefix = new Prefix('a_{0}', 1e-2);
        assert.strictEqual(alph.LaTeX, '{a_{0}}');
        assert.strictEqual(alph.scale, 0.01);
    });

    it('not generate LaTeX', () => {
        config.convertToText = false;
        const mebi: Prefix = new Prefix('Mi', 1024 ** 2);
        assert.strictEqual(mebi.LaTeX, '{Mi}');
        assert.strictEqual(mebi.scale, 1048576);
    });
});
