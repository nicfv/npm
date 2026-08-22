import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { config, Dimension, dimensions, prefixes, Quantity, Unit, units } from './index.js';

describe('Quantity', () => {
    it('as', () => {
        const wattage = new Quantity(1500, units.watt);
        const kW = units.watt.prefix(prefixes.kilo);

        assert.equal(wattage.as(kW).quantity, 1.5);
        assert.strictEqual(wattage.as(kW).toString(), '1.5 \\left[ {\\text{k}\\text{W}} \\right]');

        const mph = new Quantity(55, units.mile.over(units.hour));
        const mps = mph.as(units.meter.over(units.second));

        assert.equal(mph.quantity, 55);
        assert.ok(mps.quantity >= 24.5);
        assert.ok(mps.quantity < 24.6);
        assert.strictEqual(mph.toString(), '55 \\left[ \\frac{\\text{mi}}{\\text{hr}} \\right]');
        assert.strictEqual(mps.units.toString(), '\\frac{\\text{m}}{\\text{s}}');

        const psi = new Quantity(25, units.poundsPerSquareInch);
        const psi2 = psi.as(units.poundForce.over(units.inch.pow(2)));

        assert.equal(psi.quantity, 25);
        assert.equal(psi.quantity, psi2.quantity);
        assert.ok(!psi.units.is(psi2.units));
        assert.throws(() => psi.as(units.Joule.over(units.Celsius)), /bad unit conversion|does not match|cannot/i);
    });

    it('plus', () => {
        const lps: Quantity = new Quantity(2, units.liter.over(units.second));
        const cfm: Quantity = lps.as(units.foot.pow(3).over(units.minute));
        const combo: Quantity = lps.plus(cfm);

        assert.equal(combo.quantity, 4);
        assert.strictEqual(combo.toString(), '4 \\left[ \\frac{\\text{L}}{\\text{s}} \\right]');
    });

    it('minus', () => {
        const lps: Quantity = new Quantity(2, units.liter.over(units.second));
        const cfm: Quantity = lps.as(units.foot.pow(3).over(units.minute));
        const combo2: Quantity = lps.minus(cfm);

        assert.equal(combo2.quantity, 0);
        assert.strictEqual(combo2.toString(), '0 \\left[ \\frac{\\text{L}}{\\text{s}} \\right]');
        assert.equal(combo2.as(cfm.units).quantity, 0);
        assert.strictEqual(combo2.as(cfm.units).toString(), '0 \\left[ \\frac{\\text{ft}^{3}}{\\text{min}} \\right]');
    });

    it('pow', () => {
        const x1: Quantity = new Quantity(2, units.foot);
        const a1: Quantity = x1.pow(2);
        const a2: Quantity = a1.as(units.inch.pow(2));

        assert.equal(a1.quantity, 4);
        assert.strictEqual(a1.toString(), '4 \\left[ \\text{ft}^{2} \\right]');
        assert.ok(!a1.units.is(x1.units));
        assert.ok(!a1.units.is(a2.units));
        assert.equal(a2.quantity, 144 * 4);
        assert.strictEqual(a2.toString(), '576 \\left[ \\text{in}^{2} \\right]');
        assert.equal(a2.pow(1 / 2).quantity, 12 * 2);
    });

    it('scaleBy', () => {
        const x1: Quantity = new Quantity(2, units.foot);
        const x2: Quantity = x1.scaleBy(3);
        const x3: Quantity = x2.as(units.centimeter);

        assert.equal(x2.quantity, 6);
        assert.ok(x3.quantity >= 182);
        assert.ok(x3.quantity < 183);
        assert.equal(x2.scaleBy(-1).quantity, -6);
        assert.equal(x3.scaleBy(0).quantity, 0);
    });

    it('times', () => {
        const weight: Quantity = new Quantity(40, units.poundForce);
        const height: Quantity = new Quantity(2.5, units.foot);
        const energy: Quantity = weight.times(height);
        const energySI: Quantity = energy.as(units.Joule);

        assert.equal(energy.quantity, 100);
        assert.ok(energy.units.is(units.foot.times(units.poundForce)));
        assert.ok(energySI.quantity >= 135.5);
        assert.ok(energySI.quantity < 135.6);
    });

    it('over', () => {
        const distance: Quantity = new Quantity(3.1, units.mile);
        const duration: Quantity = new Quantity(22, units.minute).plus(new Quantity(15, units.second));
        const mileTime: Quantity = duration.over(distance);
        const speedMPH: Quantity = distance.over(duration).as(units.mile.over(units.hour));

        assert.equal(duration.quantity, 22.25);
        assert.ok(duration.units.is(units.minute));
        assert.ok(mileTime.quantity >= 7.1);
        assert.ok(mileTime.quantity < 7.2);
        assert.ok(speedMPH.quantity >= 8.3);
        assert.ok(speedMPH.quantity < 8.4);
    });

    it('scientific notation', () => {
        const ft_1 = new Quantity(1, units.foot);
        const nm_1 = ft_1.as(units.meter.prefix(prefixes.nano));
        const nm_2 = new Quantity(1, units.meter.prefix(prefixes.nano));
        const ft_2 = nm_2.as(units.foot);
        const neg_1 = new Quantity(-200, units.liter);
        const neg_2 = neg_1.as(units.millimeter.pow(3));

        assert.strictEqual(nm_1.toString(), '3.048 \\times 10^{8} \\left[ {\\text{n}\\text{m}} \\right]');
        assert.strictEqual(ft_2.toString(), '3.281 \\times 10^{-9} \\left[ \\text{ft} \\right]');
        assert.strictEqual(neg_1.toString(), '-200 \\left[ \\text{L} \\right]');
        assert.strictEqual(neg_2.toString(), '-2 \\times 10^{8} \\left[ {\\text{m}\\text{m}}^{3} \\right]');
    });

    it('infinity and NaN', () => {
        const inf_1 = new Quantity(1 / 0, units.ohm);
        const inf_2 = new Quantity(-1 / 0, units.hertz);
        const nan_1 = new Quantity(-NaN, units.year);

        assert.strictEqual(inf_1.toString(), '\\infty \\left[ {\\Omega} \\right]');
        assert.strictEqual(inf_2.toString(), '-\\infty \\left[ \\text{Hz} \\right]');
        assert.strictEqual(nan_1.toString(), '\\text{NaN} \\left[ \\text{yr} \\right]');
    });

    it('customization', () => {
        const footballField: Unit = new Unit('fbf', units.yard, 100);
        const height: Quantity = new Quantity(5, units.foot).plus(new Quantity(9, units.inch));
        const height2: Quantity = height.as(footballField);

        assert.equal(height.quantity, 5.75);
        assert.ok(height.units.is(units.foot));
        assert.strictEqual(height.toString(), '5.75 \\left[ \\text{ft} \\right]');
        assert.ok(height2.quantity >= 0.019);
        assert.ok(height2.quantity < 0.020);
        assert.ok(height2.units.is(footballField));
        assert.strictEqual(height2.units.toString(), '\\text{fbf}');
    });

    it('unitless', () => {
        const num = new Quantity(5, units.Unitless);

        assert.strictEqual(num.toString(), '5 \\left[ 1 \\right]');
        config.showUnitless = false;
        assert.strictEqual(num.toString(), '5');
    });

    it('configuration', () => {
        config.convertToText = false;
        config.decimalsShown = 1;
        config.multiplySymbol = '*';
        config.scalarSymbol = '\\pi';
        config.unitDelimiters = {
            left: '[',
            right: ']',
        };

        const digital: Dimension = new Dimension('d');
        const bit: Unit = new Unit('b', digital);
        const kilobit: Unit = bit.prefix(prefixes.kilo);
        const qkb: Quantity = new Quantity(8.88, kilobit);

        assert.strictEqual(digital.toString(), '{d}');
        assert.strictEqual(bit.toString(), '{b}');
        assert.strictEqual(kilobit.toString(), '{\\text{k}{b}}');
        assert.strictEqual(qkb.toString(), '8.9 [ {\\text{k}{b}} ]');
        assert.strictEqual(dimensions.Dimensionless.toString(), '\\pi');
        assert.strictEqual(units.Unitless.toString(), '\\pi');
    });
});
