import * as T6 from 't6';
import * as SMath from 'smath';
import { prefixes, dimensions, units, Prefix, Dimension, Unit, Quantity } from '.';

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
    T6.isTrue(dimensions.Dimensionless.over(dimensions.Length).is(dimensions.Length.pow(-1)));
}

{
    // Unit
    // .toString
    T6.is(units.kelvin.toString(), '\\text{K}');
    T6.is(units.mile.toString(), '\\text{mi}');
    T6.is(units.Rankine.toString(), '{^{\\circ}\\text{R}}');
    T6.is(units.kilometer.toString(), '{\\text{k}\\text{m}}');
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
    T6.isFalse(customKm.is(units.kilometer)); // Not seen as the same unit
    let caught: boolean;
    caught = false;
    try {
        customKm.prefix(prefixes.milli);
    } catch {
        caught = true;
    }
    T6.isTrue(caught, 'Should not allow multiple prefixes.');
    // .to
    let f: number,
        g: number;
    f = units.foot.to(units.inch);
    T6.eq(f, 12);
    f = units.Rankine.to(units.Rankine);
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
    // TODO
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
}