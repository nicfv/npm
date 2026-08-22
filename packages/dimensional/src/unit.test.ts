import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { SMath } from 'smath';
import { Dimension, dimensions, Prefix, prefixes, Unit, units } from './index.js';

describe('units', () => {
    it('toString', () => {
        assert.strictEqual(units.kelvin.toString(), '\\text{K}');
        assert.strictEqual(units.mile.toString(), '\\text{mi}');
        assert.strictEqual(units.Rankine.toString(), '{^{\\circ}\\text{R}}');
        assert.strictEqual(units.kilometer.toString(), '{\\text{k}\\text{m}}');
        assert.strictEqual(units.fluidOunce.toString(), '{\\text{fl}_\\text{oz}}');
        assert.strictEqual(units.ohm.toString(), units.ohm.over(new Unit()).toString());
    });

    it('dimensions', () => {
        assert.ok(units.kelvin.dimensions.is(dimensions.Temperature));
        assert.ok(units.Newton.dimensions.is(dimensions.force));
        assert.ok(units.Newton.dimensions.is(dimensions.Mass.times(dimensions.acceleration)));
        assert.ok(new Unit().dimensions.is(dimensions.Dimensionless));
        assert.ok(new Unit().is(units.Unitless));
        assert.ok(new Unit('x').dimensions.is(dimensions.Dimensionless)); // Unassigned base dimensions/units
        assert.ok(!units.poundForce.dimensions.is(units.poundMass.dimensions));
    });

    it('prefix', () => {
        const customKm = units.meter.prefix(prefixes.kilo);
        assert.strictEqual(customKm.toString(), units.kilometer.toString());
        assert.ok(customKm.dimensions.is(dimensions.Length));
        assert.ok(!customKm.is(units.meter));
        assert.ok(!customKm.is(units.kilometer)); // Not seen as the same unit [1a0cffd]
        assert.equal(customKm.to(units.kilometer), 1);
        assert.equal(customKm.to(units.meter), 1000);
        assert.equal(units.year.prefix(prefixes.giga).to(units.year), 1e9); // Need to test with non-base units too
        assert.equal(units.year.prefix(prefixes.deci).to(units.minute), 60 * 24 * 365.25 / 10);
        assert.equal(units.watt.to(units.volt.times(units.ampere)), 1);
        assert.equal(units.watt.prefix(prefixes.kilo).to(units.volt.times(units.ampere)), 1000);
        assert.equal(units.watt.prefix(prefixes.kilo).to(units.watt), 1000);
        assert.equal(units.watt.prefix(prefixes.centi).to(units.watt), 0.01);
        assert.throws(() => customKm.prefix(prefixes.centi), /can only add a prefix to named base units/i);
    });

    it('prefix fail', () => {
        assert.throws(() => units.Celsius.over(units.minute).prefix(prefixes.tera), /can only add a prefix to named base units/i);
        assert.throws(() => units.millimetersOfMercury.prefix(prefixes.atto), /can only add a prefix to named base units/i);
    });

    it('to', () => {
        assert.equal(units.foot.to(units.inch), 12);
        assert.equal(units.Rankine.to(units.Rankine), 1);
        assert.equal(units.watt.to(units.volt.times(units.ampere)), 1);
        assert.ok(SMath.approx(units.slug.to(units.poundMass), units.Gs.to(units.foot.over(units.second.pow(2)))));
        assert.ok(SMath.approx(units.slug.to(units.poundMass), 32.174));
        assert.equal(units.watt.times(units.hour).to(units.Joule), 3600);
        assert.ok(SMath.approx(units.inch.to(units.millimeter), units.inchesOfMercury.to(units.millimetersOfMercury)));
        assert.ok(SMath.approx(units.inch.to(units.millimeter), 25.4));
        assert.throws(() => units.poundForce.to(units.poundMass), /does not match/i);
    });

    it('customization', () => {
        const dimensionBlob = new Dimension('\\beta'),
            customPrefix = new Prefix('\\textbf{p}_{5}', 5),
            customInch = units.inch.prefix(customPrefix),
            customUnit = customInch.over(new Unit('blob', dimensionBlob));
        assert.strictEqual(dimensionBlob.toString(), '{\\beta}');
        assert.strictEqual(customPrefix.LaTeX, '{\\textbf{p}_{5}}');
        assert.strictEqual(customInch.toString(), '{{\\textbf{p}_{5}}\\text{in}}');
        assert.strictEqual(customUnit.toString(), '\\frac{{{\\textbf{p}_{5}}\\text{in}}}{\\text{blob}}');
        assert.strictEqual(customUnit.dimensions.toString(), '\\frac{{\\textbf{L}}}{{\\beta}}');
        assert.ok(customUnit.dimensions.is(dimensions.Length.over(dimensionBlob)));
    });
});
