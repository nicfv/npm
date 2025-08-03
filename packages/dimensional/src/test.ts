import * as T6 from 't6';
import { defaults } from './defaults';
import { Dimension } from './dimension';

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