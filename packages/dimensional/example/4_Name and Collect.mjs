import { dimensions, units } from 'dimensional';

// Use the JavaScript builtins `Object.entries`
// and `.forEach` loop to iterate through each
// default dimension to find the match.
function getDimensionName(dimension) {
    console.log('Looking for match...', dimension.toString());
    let found = false;
    Object.entries(dimensions).forEach(([key, val]) => {
        if (val.is(dimension)) {
            found = true;
            console.log('The unknown dimension is ' + key + '.');
        }
    });
    if (!found) {
        console.log('No default dimension found.');
    }
}

// This should give us "Length".
// Note: Base dimensions have their first letter capitalized!
getDimensionName(dimensions.Length);


// Let's derive a dimension using pre-packaged default
// dimensions and see if it matches one of the defaults
const complex_dimension = dimensions.Mass.over(dimensions.Length.times(dimensions.area));
getDimensionName(complex_dimension);

// The same thing can be done for naming units with the caveat.
function getUnitName(unit) {
    console.log('Looking for match...', unit.toString());
    let found = false;
    Object.entries(units).forEach(([key, val]) => {
        if (val.is(unit)) {
            found = true;
            console.log('The unknown unit is ' + key + '.');
        }
    });
    if (!found) {
        console.log('No default unit found.');
    }
}

// This will work just fine
getUnitName(units.Joule);

// Technically, this is also a Joule
const Newton_meter = units.Newton.times(units.meter);
getUnitName(Newton_meter);

// Find all other default units matching dimension
function getUnitsForDimension(dimension) {
    console.log('Looking for match...', dimension.toString());
    const found = [];
    Object.entries(units).forEach(([key, val]) => {
        if (val.dimensions.is(dimension)) {
            found.push(key);
        }
    });
    if (found.length > 0) {
        console.log('Valid units for measurement: ' + found.join(', '));
    } else {
        console.log('No default units found for dimension.');
    }
}

// Shows all default units of energy/torque
getUnitsForDimension(Newton_meter.dimensions);