import { dimensions, prefixes } from '..';
import { Unit } from '../unit';

// ==== Special ==== //
export const Unitless = new Unit();
// ==== Base Units ==== //
export const gram = new Unit('g', dimensions.Mass);
export const meter = new Unit('m', dimensions.Length);
export const second = new Unit('s', dimensions.Time);
export const kelvin = new Unit('K', dimensions.Temperature);
export const ampere = new Unit('A', dimensions.ElectricalCurrent);
export const candela = new Unit('cd', dimensions.LuminousIntensity);
export const mole = new Unit('mol', dimensions.AmountOfSubstance);
// ==== Derived Units ==== //
// Length
export const kilometer = meter.prefix(prefixes.kilo);
export const centimeter = meter.prefix(prefixes.centi);
export const millimeter = meter.prefix(prefixes.milli);
export const foot = new Unit('ft', meter, 1 / 3.28084);
export const inch = new Unit('in', foot, 1 / 12);
export const yard = new Unit('yd', foot, 3);
export const mile = new Unit('mi', foot, 5280);
// Volume
export const liter = new Unit('L', centimeter.pow(3), 1000);
export const gallon = new Unit('gal', liter, 3.7854);
export const quart = new Unit('qt', gallon, 1 / 4);
export const pint = new Unit('pt', quart, 1 / 2);
export const cup = new Unit('cup', pint, 1 / 2);
export const fluidOunce = new Unit('\\text{fl}_\\text{oz}', cup, 1 / 8);
export const tablespoon = new Unit('Tbsp', fluidOunce, 1 / 2);
export const teaspoon = new Unit('tsp', tablespoon, 1 / 3);
export const barrel = new Unit('bbl', gallon, 42);
// Time
export const minute = new Unit('min', second, 60);
export const hour = new Unit('hr', minute, 60);
export const day = new Unit('d', hour, 24);
export const week = new Unit('wk', day, 7);
export const year = new Unit('yr', day, 365.25);
export const hertz = new Unit('Hz', second.pow(-1));
// Acceleration
export const Gs = new Unit('G', meter.over(second.pow(2)), 9.80665);
// Mass
export const kilogram = gram.prefix(prefixes.kilo);
export const tonne = new Unit('t', kilogram, 1000);
export const poundMass = new Unit('\\text{lb}_{m}', kilogram, 1 / 2.204623);
export const ounce = new Unit('oz', poundMass, 1 / 16);
export const slug = new Unit('sl', poundMass, Gs.to(foot.over(second.pow(2))));
export const shortTon = new Unit('ton', poundMass, 2000);
// Temperature
export const Celsius = new Unit('^{\\circ}\\text{C}', kelvin);
export const Rankine = new Unit('^{\\circ}\\text{R}', kelvin, 5 / 9);
export const Fahrenheit = new Unit('^{\\circ}\\text{F}', Rankine);
// Force
export const Newton = new Unit('N', kilogram.times(meter).over(second.pow(2)));
export const poundForce = new Unit('\\text{lb}_{f}', slug.times(foot.over(second.pow(2))));
// Energy/Torque
export const Joule = new Unit('J', Newton.times(meter));
export const calorie = new Unit('cal', Joule, 4.184);
export const foodCalorie = new Unit('Cal', calorie, 1000);
export const BritishThermalUnit = new Unit('BTU', Joule, 1055.056);
// Power
export const watt = new Unit('W', Joule.over(second));
export const horsepower = new Unit('hp', watt, 745.6999);
export const tonOfRefrigeration = new Unit('TR', BritishThermalUnit.over(hour), 12000);
// Pressure
export const pascal = new Unit('Pa', Newton.over(meter.pow(2)));
export const atmosphere = new Unit('atm', pascal, 101325);
export const bar = new Unit('bar', pascal, 1e5);
export const millimetersOfMercury = new Unit('mmHg', bar, 133.322, false);
export const inchesOfMercury = new Unit('inHg', millimetersOfMercury, inch.to(millimeter));
export const poundsPerSquareInch = new Unit('psi', poundForce.over(inch.pow(2)));
export const poundsPerSquareFoot = new Unit('psf', poundForce.over(foot.pow(2)));
// Electrical
export const coulomb = new Unit('C', ampere.times(second));
export const volt = new Unit('V', Joule.over(coulomb));
export const ohm = new Unit('\\Omega', volt.over(ampere));
export const siemens = new Unit('\\mho', ohm.pow(-1));
export const farad = new Unit('F', coulomb.over(volt));
export const henry = new Unit('H', second.pow(2).over(farad));
