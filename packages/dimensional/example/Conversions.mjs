import { Quantity, units } from 'dimensional';

// ==== INPUTS ====//

// Define your height in feet and inches
const height_ft = new Quantity(5, units.foot),
    height_in = new Quantity(9, units.inch);
// Define your weight in pounds and ounces (mass)
const mass_lb = new Quantity(140, units.poundMass),
    mass_oz = new Quantity(8, units.ounce);

// ==== CONVERSIONS ====//

// Calculate your total height in feet
const height_us = height_ft.plus(height_in); // Automatically converts to ft because the first argument's units are ft
console.log('H_{us} = ' + height_us.toString());
// Convert to SI units
const height_si = height_us.as(units.meter);
console.log('H_{si} = ' + height_si.toString());

// Calculate your total weight in pounds
const mass_us = mass_lb.plus(mass_oz);
console.log('M_{us} = ' + mass_us.toString());
// Convert to SI units
const mass_si = mass_us.as(units.kilogram);
console.log('M_{si} = ' + mass_si.toString());

// ==== CALCULATE BMI ====//

// Use the formula with SI units (m/h^2)
const BMI = mass_si.over(height_si.pow(2));
console.log('BMI = ' + BMI.toString());
// Define healthy BMI range
const healthy_BMI_min = 18.5;
const healthy_BMI_max = 24.9;
// Use .quantity for inequality comparisons
if (BMI.quantity < healthy_BMI_min) {
    console.log('Underweight.');
} else if (BMI.quantity < healthy_BMI_max) {
    console.log('Healthy weight.');
} else {
    console.log('Overweight.');
}