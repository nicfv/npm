import { Dimension } from './dimension';
import { Prefix } from './prefix';
import { Unit } from './unit';

class Prefixes {
    public readonly quetta = new Prefix('Q', 1e30);
    public readonly ronna = new Prefix('R', 1e27);
    public readonly yotta = new Prefix('Y', 1e24);
    public readonly zetta = new Prefix('Z', 1e21);
    public readonly exa = new Prefix('E', 1e18);
    public readonly peta = new Prefix('P', 1e15);
    public readonly tera = new Prefix('T', 1e12);
    public readonly giga = new Prefix('G', 1e9);
    public readonly mega = new Prefix('M', 1e6);
    public readonly kilo = new Prefix('k', 1e3);
    public readonly hecto = new Prefix('h', 1e2);
    public readonly deca = new Prefix('da', 1e1);
    public readonly deci = new Prefix('d', 1e-1);
    public readonly centi = new Prefix('c', 1e-2);
    public readonly milli = new Prefix('m', 1e-3);
    public readonly micro = new Prefix('\\mu', 1e-6);
    public readonly nano = new Prefix('n', 1e-9);
    public readonly pico = new Prefix('p', 1e-12);
    public readonly femto = new Prefix('f', 1e-15);
    public readonly atto = new Prefix('a', 1e-18);
    public readonly zepto = new Prefix('z', 1e-21);
    public readonly yocto = new Prefix('y', 1e-24);
    public readonly ronto = new Prefix('r', 1e-27);
    public readonly quecto = new Prefix('q', 1e-30);
}
/**
 * Contains a set of default unit prefixes.
 */
export const prefixes = new Prefixes();

class Dimensions {
    // ==== Special ==== //
    public readonly Dimensionless = new Dimension();
    // ==== Dimensions ==== //
    public readonly Mass = new Dimension('\\textbf{M}');
    public readonly Length = new Dimension('\\textbf{L}');
    public readonly Time = new Dimension('\\textbf{T}');
    public readonly Temperature = new Dimension('\\boldsymbol{\\Theta}');
    public readonly ElectricalCurrent = new Dimension('\\textbf{I}');
    public readonly LuminousIntensity = new Dimension('\\textbf{J}');
    public readonly AmountOfSubstance = new Dimension('\\textbf{N}');
    // ==== Attributes ==== //
    public readonly area = this.Length.pow(2);
    public readonly volume = this.Length.pow(3);
    public readonly velocity = this.Length.over(this.Time);
    public readonly acceleration = this.velocity.over(this.Time);
    public readonly force = this.Mass.times(this.acceleration);
    public readonly energy = this.force.times(this.Length);
    public readonly pressure = this.force.over(this.area);
    public readonly charge = this.ElectricalCurrent.times(this.Time);
    public readonly voltage = this.energy.over(this.charge);
}
/**
 * Contains a set of default base and derived dimensions.
 */
export const dimensions = new Dimensions();

class Units {
    // ==== Special ==== //
    public readonly Unitless = new Unit();
    // ==== Base Units ==== //
    public readonly gram = new Unit('g', dimensions.Mass);
    public readonly meter = new Unit('m', dimensions.Length);
    public readonly second = new Unit('s', dimensions.Time);
    public readonly kelvin = new Unit('K', dimensions.Temperature);
    public readonly ampere = new Unit('A', dimensions.ElectricalCurrent);
    public readonly candela = new Unit('cd', dimensions.LuminousIntensity);
    public readonly mole = new Unit('mol', dimensions.AmountOfSubstance);
    // ==== Derived Units ==== //
    // Length
    public readonly kilogram = this.gram.prefix(prefixes.kilo);
    public readonly kilometer = this.meter.prefix(prefixes.kilo);
    public readonly centimeter = this.meter.prefix(prefixes.centi);
    public readonly millimeter = this.meter.prefix(prefixes.milli);
    public readonly foot = new Unit('ft', this.meter, 1 / 3.28);
    public readonly inch = new Unit('in', this.foot, 1 / 12);
    public readonly yard = new Unit('yd', this.foot, 3);
    public readonly mile = new Unit('mi', this.foot, 5280);
    // Mass
    public readonly pound = new Unit('lb', this.kilogram, 1 / 2.2);
    public readonly ounce = new Unit('oz', this.pound, 1 / 16);
    // Time
    public readonly minute = new Unit('min', this.second, 60);
    public readonly hour = new Unit('hr', this.minute, 60);
    public readonly day = new Unit('d', this.hour, 24);
    public readonly week = new Unit('wk', this.day, 7);
    public readonly year = new Unit('yr', this.day, 365.25);
    // Temperature
    public readonly Celsius = new Unit('^{\\circ}\\text{C}', this.kelvin);
    public readonly Rankine = new Unit('^{\\circ}\\text{R}', this.kelvin, 5 / 9);
    public readonly Fahrenheit = new Unit('^{\\circ}\\text{F}', this.Rankine);
    // Force
    public readonly Newton = new Unit('N', this.kilogram.times(this.meter).over(this.second.pow(2)));
    public readonly kiloNewton = this.Newton.prefix(prefixes.kilo);
    // Energy
    public readonly Joule = new Unit('J', this.Newton.times(this.meter));
    public readonly kiloJoule = this.Joule.prefix(prefixes.kilo);
    // Power
    public readonly watt = new Unit('W', this.Joule.over(this.second));
    // Pressure
    public readonly pascal = new Unit('Pa', this.Newton.over(this.meter.pow(2)));
    public readonly kiloPascal = this.pascal.prefix(prefixes.kilo);
    public readonly atmosphere = new Unit('atm', this.pascal, 101325);
    public readonly bar = new Unit('bar', this.pascal, 1e5);
    // Electrical
    public readonly coulomb = new Unit('C', this.ampere.times(this.second));
    public readonly volt = new Unit('V', this.Joule.over(this.coulomb));
    public readonly ohm = new Unit('\\Omega', this.volt.over(this.ampere));
    // Other
    public readonly Gs = new Unit('G', this.meter.over(this.second.pow(2)), 9.81);
}
/**
 * Contains a set of default base and derived units.
 */
export const units = new Units();
