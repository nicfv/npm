import * as T6 from 't6';
import { defaults } from './defaults';
import { Dimension } from './dimension';
import { Prefix } from './prefix';
import { Unit } from './unit';

{
    // Dimension
    // .toString
    T6.is(defaults.Dimensionless.toString(), '1');
    T6.is(defaults.Mass.toString(), '{\\textbf{M}}');
    T6.is(defaults.acceleration.toString(), '\\frac{{\\textbf{L}}}{{\\textbf{T}}^{2}}');
    T6.is(defaults.Temperature.toString(), '{\\boldsymbol{\\Theta}}');
    const customDimension = new Dimension('x').times(defaults.AmountOfSubstance).pow(2);
    T6.is(customDimension.toString(), '\\text{x}^{2} \\cdot {\\textbf{N}}^{2}');
    // .is
    T6.isTrue(defaults.Dimensionless.is(new Dimension()));
    T6.isTrue(defaults.velocity.is(defaults.Length.over(defaults.Time)));
    T6.isTrue(defaults.force.is(defaults.Dimensionless.times(defaults.force)));
    T6.isFalse(defaults.acceleration.is(defaults.Length.over(defaults.Time)));
    T6.isFalse(customDimension.is(defaults.LuminousIntensity.pow(-2)));
    T6.isFalse(new Dimension('x').is(new Dimension('x'))); // These should be considered different dimensions
    T6.isTrue(defaults.Dimensionless.over(defaults.Length).is(defaults.Length.pow(-1)));
}

{
    // Unit
    // .toString
    console.log(T6.getTestNumber());
    T6.is(defaults.kelvin.toString(), '\\text{K}');
    T6.is(defaults.mile.toString(), '\\text{mi}');
    T6.is(defaults.Rankine.toString(), '{^{\\circ}\\text{R}}');
    T6.is(defaults.kilometer.toString(), '{\\text{k}\\text{m}}');
    // .dimensions
    T6.isTrue(defaults.kelvin.dimensions.is(defaults.Temperature));
    T6.isTrue(defaults.Newton.dimensions.is(defaults.force));
    T6.isTrue(defaults.Newton.dimensions.is(defaults.Mass.times(defaults.acceleration)));
    T6.isTrue(new Unit().dimensions.is(defaults.Dimensionless));
    T6.isTrue(new Unit().is(defaults.Unitless));
    T6.isTrue(new Unit('x').dimensions.is(defaults.Dimensionless)); // Unassigned base dimensions/units
    // .prefix
    const customKm = defaults.meter.prefix(defaults.kilo);
    T6.is(customKm.toString(), defaults.kilometer.toString());
    T6.isFalse(customKm.is(defaults.kilometer)); // Not seen as the same unit
    let caught: boolean;
    caught = false;
    try {
        customKm.prefix(defaults.milli);
    } catch {
        caught = true;
    }
    T6.isTrue(caught, 'Should not allow multiple prefixes.');
}
{
    // Customization
    const dimensionBlob = new Dimension('\\beta'),
        customPrefix = new Prefix('\\textbf{p}_{5}', 5),
        customInch = defaults.inch.prefix(customPrefix),
        customUnit = customInch.over(new Unit('blob', dimensionBlob));
    T6.is(dimensionBlob.toString(), '{\\beta}');
    T6.is(customPrefix.LaTeX, '{\\textbf{p}_{5}}');
    T6.is(customInch.toString(), '{{\\textbf{p}_{5}}\\text{in}}');
    T6.is(customUnit.toString(), '\\frac{{{\\textbf{p}_{5}}\\text{in}}}{\\text{blob}}');
    T6.is(customUnit.dimensions.toString(), '\\frac{{\\textbf{L}}}{{\\beta}}');
    T6.isTrue(customUnit.dimensions.is(defaults.Length.over(dimensionBlob)));
}