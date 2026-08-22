import * as T6 from 't6';
import * as SMath from 'smath';
import { prefixes, dimensions, units, Prefix, Dimension, Unit, Quantity, config } from './index.js';
import { AmountOfSubstance } from './defaults/dimensions.js';

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
