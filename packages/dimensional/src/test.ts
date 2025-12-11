import * as T6 from 't6';
import * as SMath from 'smath';
import { prefixes, dimensions, units, Prefix, Dimension, Unit, Quantity, config } from '.';
import { AmountOfSubstance } from './defaults/dimensions';

{
    // Dimension
    // .toString
    T6.is(dimensions.Dimensionless.toString(), '1');
    T6.is(dimensions.Mass.toString(), '{\\textbf{M}}');
    T6.is(dimensions.acceleration.toString(), '\\frac{{\\textbf{L}}}{{\\textbf{T}}^{2}}');
    T6.is(dimensions.Temperature.toString(), '{\\boldsymbol{\\Theta}}');
    const customDimension = new Dimension('x').times(dimensions.AmountOfSubstance).pow(2);
    T6.is(customDimension.toString(), '\\text{x}^{2} \\cdot {\\textbf{N}}^{2}');
    // .is
    T6.isTrue(dimensions.Dimensionless.is(new Dimension()));
    T6.isTrue(dimensions.velocity.is(dimensions.Length.over(dimensions.Time)));
    T6.isTrue(dimensions.force.is(dimensions.Dimensionless.times(dimensions.force)));
    T6.isFalse(dimensions.acceleration.is(dimensions.Length.over(dimensions.Time)));
    T6.isFalse(customDimension.is(dimensions.LuminousIntensity.pow(-2)));
    T6.isFalse(new Dimension('x').is(new Dimension('x'))); // These should be considered different dimensions
    T6.isTrue(new Dimension(new Map([[dimensions.AmountOfSubstance, 1]])).is(AmountOfSubstance));
    T6.isTrue(dimensions.Dimensionless.over(dimensions.Length).is(dimensions.Length.pow(-1)));
    T6.isTrue(dimensions.charge.times(dimensions.area).is(dimensions.area.times(dimensions.charge)));
}

{
    // Unit
    // .toString
    T6.is(units.kelvin.toString(), '\\text{K}');
    T6.is(units.mile.toString(), '\\text{mi}');
    T6.is(units.Rankine.toString(), '{^{\\circ}\\text{R}}');
    T6.is(units.kilometer.toString(), '{\\text{k}\\text{m}}');
    T6.is(units.fluidOunce.toString(), '{\\text{fl}_\\text{oz}}');
    T6.is(units.ohm.toString(), units.ohm.over(new Unit()).toString());
    // .dimensions
    T6.isTrue(units.kelvin.dimensions.is(dimensions.Temperature));
    T6.isTrue(units.Newton.dimensions.is(dimensions.force));
    T6.isTrue(units.Newton.dimensions.is(dimensions.Mass.times(dimensions.acceleration)));
    T6.isTrue(new Unit().dimensions.is(dimensions.Dimensionless));
    T6.isTrue(new Unit().is(units.Unitless));
    T6.isTrue(new Unit('x').dimensions.is(dimensions.Dimensionless)); // Unassigned base dimensions/units
    T6.isFalse(units.poundForce.dimensions.is(units.poundMass.dimensions));
    // .prefix
    const customKm = units.meter.prefix(prefixes.kilo);
    T6.is(customKm.toString(), units.kilometer.toString());
    T6.isTrue(customKm.dimensions.is(dimensions.Length));
    T6.isFalse(customKm.is(units.meter));
    T6.isFalse(customKm.is(units.kilometer)); // Not seen as the same unit [1a0cffd]
    T6.eq(customKm.to(units.kilometer), 1);
    T6.eq(customKm.to(units.meter), 1000);
    T6.eq(units.year.prefix(prefixes.giga).to(units.year), 1e9); // Need to test with non-base units too
    T6.eq(units.year.prefix(prefixes.deci).to(units.minute), 60 * 24 * 365.25 / 10);
    T6.eq(units.watt.to(units.volt.times(units.ampere)), 1);
    T6.eq(units.watt.prefix(prefixes.kilo).to(units.volt.times(units.ampere)), 1000);
    T6.eq(units.watt.prefix(prefixes.kilo).to(units.watt), 1000);
    T6.eq(units.watt.prefix(prefixes.centi).to(units.watt), 0.01);
    let caught: boolean;
    caught = false;
    try {
        customKm.prefix(prefixes.centi);
    } catch {
        caught = true;
    }
    T6.isTrue(caught, 'Cannot apply a prefix to this unit.');
    caught = false;
    try {
        (units.Celsius.over(units.minute)).prefix(prefixes.tera);
    } catch {
        caught = true;
    }
    T6.isTrue(caught, 'Cannot apply a prefix to this unit.');
    caught = false;
    try {
        units.millimetersOfMercury.prefix(prefixes.atto);
    } catch {
        caught = true;
    }
    T6.isTrue(caught, 'Cannot apply a prefix to this unit.');
    // .to
    let f: number,
        g: number;
    f = units.foot.to(units.inch);
    T6.eq(f, 12);
    f = units.Rankine.to(units.Rankine);
    T6.eq(f, 1);
    f = units.watt.to(units.volt.times(units.ampere));
    T6.eq(f, 1);
    f = units.slug.to(units.poundMass);
    g = units.Gs.to(units.foot.over(units.second.pow(2)));
    T6.isTrue(SMath.approx(f, g));
    T6.ge(f, 32.17);
    T6.lt(f, 32.18);
    f = units.watt.times(units.hour).to(units.Joule);
    T6.eq(f, 3600);
    f = units.inch.to(units.millimeter);
    g = units.inchesOfMercury.to(units.millimetersOfMercury);
    T6.isTrue(SMath.approx(f, g));
    caught = false;
    try {
        units.poundForce.to(units.poundMass);
    } catch {
        caught = true;
    }
    T6.isTrue(caught, 'Can only convert between like dimensions.');
}

{
    // Customization
    const dimensionBlob = new Dimension('\\beta'),
        customPrefix = new Prefix('\\textbf{p}_{5}', 5),
        customInch = units.inch.prefix(customPrefix),
        customUnit = customInch.over(new Unit('blob', dimensionBlob));
    T6.is(dimensionBlob.toString(), '{\\beta}');
    T6.is(customPrefix.LaTeX, '{\\textbf{p}_{5}}');
    T6.is(customInch.toString(), '{{\\textbf{p}_{5}}\\text{in}}');
    T6.is(customUnit.toString(), '\\frac{{{\\textbf{p}_{5}}\\text{in}}}{\\text{blob}}');
    T6.is(customUnit.dimensions.toString(), '\\frac{{\\textbf{L}}}{{\\beta}}');
    T6.isTrue(customUnit.dimensions.is(dimensions.Length.over(dimensionBlob)));
}

{
    // Quantity
    // .as
    const wattage = new Quantity(1500, units.watt);
    const kW = units.watt.prefix(prefixes.kilo);
    T6.eq(wattage.as(kW).quantity, 1.5);
    T6.is(wattage.as(kW).toString(), '1.5 \\left[ {\\text{k}\\text{W}} \\right]');
    const mph = new Quantity(55, units.mile.over(units.hour)),
        mps = mph.as(units.meter.over(units.second));
    T6.eq(mph.quantity, 55);
    T6.ge(mps.quantity, 24.5);
    T6.lt(mps.quantity, 24.6);
    T6.is(mph.toString(), '55 \\left[ \\frac{\\text{mi}}{\\text{hr}} \\right]');
    T6.is(mps.units.toString(), '\\frac{\\text{m}}{\\text{s}}');
    const psi = new Quantity(25, units.poundsPerSquareInch),
        psi2 = psi.as(units.poundForce.over(units.inch.pow(2)));
    T6.eq(psi.quantity, 25);
    T6.eq(psi.quantity, psi2.quantity);
    T6.isFalse(psi.units.is(psi2.units));
    let caught: boolean;
    caught = false;
    try {
        psi.as(units.Joule.over(units.Celsius));
    } catch {
        caught = true;
    }
    T6.isTrue(caught, 'Bad unit conversion.');
    // .plus
    const lps: Quantity = new Quantity(2, units.liter.over(units.second)),
        cfm: Quantity = lps.as(units.foot.pow(3).over(units.minute)),
        combo: Quantity = lps.plus(cfm);
    T6.eq(combo.quantity, 4);
    T6.is(combo.toString(), '4 \\left[ \\frac{\\text{L}}{\\text{s}} \\right]');
    // .minus
    const combo2: Quantity = lps.minus(cfm);
    T6.eq(combo2.quantity, 0);
    T6.is(combo2.toString(), '0 \\left[ \\frac{\\text{L}}{\\text{s}} \\right]');
    T6.eq(combo2.as(cfm.units).quantity, 0);
    T6.is(combo2.as(cfm.units).toString(), '0 \\left[ \\frac{\\text{ft}^{3}}{\\text{min}} \\right]');
    // .pow
    const x1: Quantity = new Quantity(2, units.foot),
        a1: Quantity = x1.pow(2),
        a2: Quantity = a1.as(units.inch.pow(2));
    T6.eq(a1.quantity, 4);
    T6.is(a1.toString(), '4 \\left[ \\text{ft}^{2} \\right]');
    T6.isFalse(a1.units.is(x1.units));
    T6.isFalse(a1.units.is(a2.units));
    T6.eq(a2.quantity, 144 * 4);
    T6.is(a2.toString(), '576 \\left[ \\text{in}^{2} \\right]');
    T6.eq(a2.pow(1 / 2).quantity, 12 * 2);
    // .scaleBy
    const x2: Quantity = x1.scaleBy(3),
        x3: Quantity = x2.as(units.centimeter);
    T6.eq(x2.quantity, 6);
    T6.ge(x3.quantity, 182);
    T6.lt(x3.quantity, 183);
    T6.eq(x2.scaleBy(-1).quantity, -6);
    T6.eq(x3.scaleBy(0).quantity, 0);
    // .times
    const weight: Quantity = new Quantity(40, units.poundForce),
        height: Quantity = new Quantity(2.5, units.foot),
        energy: Quantity = weight.times(height),
        energySI: Quantity = energy.as(units.Joule);
    T6.eq(energy.quantity, 100);
    T6.isTrue(energy.units.is(units.foot.times(units.poundForce)));
    T6.ge(energySI.quantity, 135.5);
    T6.lt(energySI.quantity, 135.6);
    // .over
    const distance: Quantity = new Quantity(3.1, units.mile),
        duration: Quantity = new Quantity(22, units.minute).plus(new Quantity(15, units.second));
    T6.eq(duration.quantity, 22.25);
    T6.isTrue(duration.units.is(units.minute));
    const mileTime: Quantity = duration.over(distance),
        speedMPH: Quantity = distance.over(duration).as(units.mile.over(units.hour));
    T6.ge(mileTime.quantity, 7.1);
    T6.lt(mileTime.quantity, 7.2);
    T6.ge(speedMPH.quantity, 8.3);
    T6.lt(speedMPH.quantity, 8.4);
    // Scientific Notation
    const ft_1 = new Quantity(1, units.foot),
        nm_1 = ft_1.as(units.meter.prefix(prefixes.nano));
    T6.is(nm_1.toString(), '3.048 \\times 10^{8} \\left[ {\\text{n}\\text{m}} \\right]');
    const nm_2 = new Quantity(1, units.meter.prefix(prefixes.nano)),
        ft_2 = nm_2.as(units.foot);
    T6.is(ft_2.toString(), '3.281 \\times 10^{-9} \\left[ \\text{ft} \\right]');
    const neg_1 = new Quantity(-200, units.liter),
        neg_2 = neg_1.as(units.millimeter.pow(3));
    T6.is(neg_1.toString(), '-200 \\left[ \\text{L} \\right]');
    T6.is(neg_2.toString(), '-2 \\times 10^{8} \\left[ {\\text{m}\\text{m}}^{3} \\right]');
    // Infinity
    const inf_1 = new Quantity(1 / 0, units.ohm);
    T6.is(inf_1.toString(), '\\infty \\left[ {\\Omega} \\right]');
    const inf_2 = new Quantity(-1 / 0, units.hertz);
    T6.is(inf_2.toString(), '-\\infty \\left[ \\text{Hz} \\right]');
    const nan_1 = new Quantity(-NaN, units.year);
    T6.is(nan_1.toString(), '\\text{NaN} \\left[ \\text{yr} \\right]');
}

{
    // Customization 2
    const footballField: Unit = new Unit('fbf', units.yard, 100),
        height: Quantity = new Quantity(5, units.foot).plus(new Quantity(9, units.inch)),
        height2: Quantity = height.as(footballField);
    T6.eq(height.quantity, 5.75);
    T6.isTrue(height.units.is(units.foot));
    T6.is(height.toString(), '5.75 \\left[ \\text{ft} \\right]');
    T6.ge(height2.quantity, 0.019); // 0.0191666666667
    T6.lt(height2.quantity, 0.020);
    T6.isTrue(height2.units.is(footballField));
    T6.is(height2.units.toString(), '\\text{fbf}');
    // Unitless
    const num = new Quantity(5, units.Unitless);
    T6.is(num.toString(), '5 \\left[ 1 \\right]');
    config.showUnitless = false;
    T6.is(num.toString(), '5');
}

{
    // Configuration
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
    T6.is(digital.toString(), '{d}');
    T6.is(bit.toString(), '{b}');
    T6.is(kilobit.toString(), '{\\text{k}{b}}');
    T6.is(qkb.toString(), '8.9 [ {\\text{k}{b}} ]');
    T6.is(dimensions.Dimensionless.toString(), '\\pi');
    T6.is(units.Unitless.toString(), '\\pi');
}