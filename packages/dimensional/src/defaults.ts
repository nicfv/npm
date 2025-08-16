import { Dimension } from './dimension';
import { Prefix } from './prefix';
import { Unit } from './unit';

class Defaults {
    // ==== Prefixes ==== //
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
    // ==== Special ==== //
    public readonly Dimensionless = new Dimension();
    public readonly Unitless = new Unit();
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
    // ==== Base Units ==== //
    public readonly gram = new Unit('g', this.Mass);
    public readonly meter = new Unit('m', this.Length);
    public readonly second = new Unit('s', this.Time);
    public readonly kelvin = new Unit('K', this.Temperature);
    public readonly ampere = new Unit('A', this.ElectricalCurrent);
    public readonly candela = new Unit('cd', this.LuminousIntensity);
    public readonly mole = new Unit('mol', this.AmountOfSubstance);
    // ==== Derived Units ==== //
    public readonly kilogram = this.gram.prefix(this.kilo);
    public readonly kilometer = this.meter.prefix(this.kilo);
    public readonly centimeter = this.meter.prefix(this.centi);
    public readonly millimeter = this.meter.prefix(this.milli);
    public readonly pound = new Unit('lb', this.kilogram, 1 / 2.2);
    public readonly ounce = new Unit('oz', this.pound, 1 / 16);
    public readonly foot = new Unit('ft', this.meter, 1 / 3.28);
    public readonly inch = new Unit('in', this.foot, 1 / 12);
    public readonly yard = new Unit('yd', this.foot, 3);
    public readonly mile = new Unit('mi', this.foot, 5280);
    public readonly minute = new Unit('min', this.second, 60);
    public readonly hour = new Unit('hr', this.minute, 60);
    public readonly day = new Unit('d', this.hour, 24);
    public readonly week = new Unit('wk', this.day, 7);
    public readonly year = new Unit('yr', this.day, 365.25);
    public readonly Celsius = new Unit('^{\\circ}\\text{C}', this.kelvin);
    public readonly Rankine = new Unit('^{\\circ}\\text{R}', this.kelvin, 5 / 9);
    public readonly Fahrenheit = new Unit('^{\\circ}\\text{F}', this.Rankine);
    public readonly Gs = new Unit('G', this.meter.over(this.second.pow(2)), 9.81);
    public readonly Newton = new Unit('N', this.kilogram.times(this.meter).over(this.second.pow(2)));
    public readonly kiloNewton = this.Newton.prefix(this.kilo);
    public readonly Joule = new Unit('J', this.Newton.times(this.meter));
    public readonly kiloJoule = this.Joule.prefix(this.kilo);
    // Pressure
    public readonly pascal = new Unit('Pa', this.Newton.over(this.meter.pow(2)));
    public readonly kiloPascal = this.pascal.prefix(this.kilo);
    public readonly atmosphere = new Unit('atm', this.pascal, 101325);
    public readonly bar = new Unit('bar', this.pascal, 1e5);
}

export const defaults = new Defaults();