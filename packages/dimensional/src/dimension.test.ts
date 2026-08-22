import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { dimensions, Dimension } from './index.js';
import { AmountOfSubstance } from './defaults/dimensions.js';

describe('Dimension', () => {
    it('string conversion', () => {
        assert.strictEqual(dimensions.Dimensionless.toString(), '1');
        assert.strictEqual(dimensions.Mass.toString(), '{\\textbf{M}}');
        assert.strictEqual(dimensions.acceleration.toString(), '\\frac{{\\textbf{L}}}{{\\textbf{T}}}^{2}');
        assert.strictEqual(dimensions.Temperature.toString(), '{\\boldsymbol{\\Theta}}');
    });

    it('custom dimension', () => {
        const customDimension = new Dimension('x').times(dimensions.AmountOfSubstance).pow(2);
        assert.strictEqual(customDimension.toString(), '\\text{x}^{2} \\cdot {\\textbf{N}}^{2}');
    });

    it('is', () => {
        assert.ok(dimensions.Dimensionless.is(new Dimension()));
        assert.ok(dimensions.velocity.is(dimensions.Length.over(dimensions.Time)));
        assert.ok(dimensions.force.is(dimensions.Dimensionless.times(dimensions.force)));
        assert.ok(new Dimension(new Map([[dimensions.AmountOfSubstance, 1]])).is(AmountOfSubstance));
        assert.ok(dimensions.Dimensionless.over(dimensions.Length).is(dimensions.Length.pow(-1)));
        assert.ok(dimensions.charge.times(dimensions.area).is(dimensions.area.times(dimensions.charge)));
    });

    it('is not', () => {
        const customDimension = new Dimension('x').times(dimensions.AmountOfSubstance).pow(2);
        assert.ok(!customDimension.is(dimensions.LuminousIntensity.pow(-2)));
        assert.ok(!dimensions.acceleration.is(dimensions.Length.over(dimensions.Time)));
        assert.ok(!new Dimension('x').is(new Dimension('x'))); // These should be considered different dimensions
    });
});
