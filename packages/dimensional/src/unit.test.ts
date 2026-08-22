import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { SMath } from 'smath';
import { dimensions, prefixes, Unit, units } from './index.js';

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