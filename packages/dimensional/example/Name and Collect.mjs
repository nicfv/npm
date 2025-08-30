import { dimensions } from 'dimensional';

// Use the JavaScript builtins `Object.entries`
// and `.forEach` loop to iterate through each
// default dimension to find the match.
function getDimensionName(dimension) {
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


// Let's derive a dimension using pre-packaged default
// dimensions and see if it matches one of the defaults
const complex_dimension = dimensions.Mass.over(dimensions.Length.times(dimensions.area));
console.log(complex_dimension.toString());
getDimensionName(complex_dimension);