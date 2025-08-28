import { Quantity, units } from 'dimensional';

// Define your height in feet and inches
const height_ft = new Quantity(5, units.foot),
    height_in = new Quantity(9, units.inch);

// Calculate your total height in feet
const height_us = height_ft.plus(height_in); // Automatically converts to ft because the first argument's units are ft
console.log('H_{us} = ' + height_us.toString());

// Convert to SI units
const height_si = height_us.as(units.meter);
console.log('H_{si} = ' + height_si.toString());