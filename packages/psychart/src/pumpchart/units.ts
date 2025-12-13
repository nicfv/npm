import { prefixes, Quantity, Unit, units } from 'dimensional';
import { Flow, Fluid, Head, Power, Speed } from './types';

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
 * Convert the string representation of the speed to the actual units
 */
export const SpeedUnits: Record<Speed, Unit> = {
    '%': units.hertz,
    'Hz': units.hertz,
    'rpm': units.minute.pow(-1),
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
 * Contains the respective densities for different process fluids
 */
export const FluidDensities: Record<Fluid, Quantity> = {
    water: new Quantity(1, units.gram.over(units.centimeter.pow(3))),
};
