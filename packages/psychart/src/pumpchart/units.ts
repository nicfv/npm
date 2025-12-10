import { prefixes, Unit, units } from 'dimensional';
import { Density, Flow, Head, Power } from './types';

/**
 * Convert the string representation of the flow to the actual units
 */
export const FlowUnits: Record<Flow, Unit> = {
    'L/h': units.liter.over(units.hour),
    'L/m': units.liter.over(units.minute),
    'L/s': units.liter.over(units.second),
    'ft3/h': units.foot.pow(3).over(units.hour),
    'ft3/m': units.foot.pow(3).over(units.minute),
    'ft3/s': units.foot.pow(3).over(units.second),
    'gph': units.gallon.over(units.hour),
    'gpm': units.gallon.over(units.minute),
    'm3/h': units.meter.pow(3).over(units.hour),
    'm3/m': units.meter.pow(3).over(units.minute),
    'm3/s': units.meter.pow(3).over(units.second),
};
/**
 * Convert the string representation of the head to the actual units
 */
export const HeadUnits: Record<Head, Unit> = {
    Pa: units.pascal,
    atm: units.atmosphere,
    bar: units.bar,
    cm: units.centimeter,
    ft: units.foot,
    in: units.inch,
    kPa: units.pascal.prefix(prefixes.kilo),
    m: units.meter,
    mm: units.millimeter,
    psf: units.poundsPerSquareFoot,
    psi: units.poundsPerSquareInch,
};
/**
 * Convert the string representation of the power to the actual units
 */
export const PowerUnits: Record<Power, Unit> = {
    W: units.watt,
    hp: units.horsepower,
    kW: units.watt.prefix(prefixes.kilo),
};
/**
 * Convert the string representation of the density to the actual units
 */
export const DensityUnits: Record<Density, Unit> = {
    'g/cm3': units.gram.over(units.centimeter.pow(3)),
    'g/mL': units.gram.over(units.liter.prefix(prefixes.milli)),
    'kg/L': units.kilogram.over(units.liter),
    'kg/m3': units.kilogram.over(units.meter.pow(3)),
    'lb/ft3': units.poundMass.over(units.foot.pow(3)),
    'lb/gal': units.poundMass.over(units.gallon),
    'oz/in3': units.ounce.over(units.inch.pow(3)),
};
