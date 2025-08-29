import { Dimension } from '../dimension';

// ==== Special ==== //
export const Dimensionless = new Dimension();
// ==== Dimensions ==== //
export const Mass = new Dimension('\\textbf{M}');
export const Length = new Dimension('\\textbf{L}');
export const Time = new Dimension('\\textbf{T}');
export const Temperature = new Dimension('\\boldsymbol{\\Theta}');
export const ElectricalCurrent = new Dimension('\\textbf{I}');
export const LuminousIntensity = new Dimension('\\textbf{J}');
export const AmountOfSubstance = new Dimension('\\textbf{N}');
// ==== Attributes ==== //
export const area = Length.pow(2);
export const volume = Length.pow(3);
export const density = Mass.over(volume);
export const velocity = Length.over(Time);
export const acceleration = velocity.over(Time);
export const force = Mass.times(acceleration);
export const energy = force.times(Length);
export const power = energy.over(Time);
export const pressure = force.over(area);
export const frequency = Time.pow(-1);
export const charge = ElectricalCurrent.times(Time);
export const voltage = energy.over(charge);
export const resistance = voltage.over(ElectricalCurrent);
export const conductance = resistance.pow(-1);
export const capacitance = charge.over(voltage);
export const inductance = voltage.times(Time).over(ElectricalCurrent);
export const luminance = LuminousIntensity.over(area);
