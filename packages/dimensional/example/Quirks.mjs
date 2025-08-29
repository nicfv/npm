import { Dimension, dimensions } from 'dimensional';

// Define the length dimension
const length_1 = new Dimension('L');

// You can combine dimensions alone
const area = length_1.pow(2);
console.log(area.toString());

// Define the same dimension again
// but it's not the same as the one
// defined previously.
const length_2 = new Dimension('L');
console.log('length_1 == length_2?', length_1.is(length_2));

// Let's derive a dimension using
// pre-packaged default dimensions
const complex_dimension = dimensions.Mass.over(dimensions.Length.times(dimensions.area));

// Use the JavaScript builtins `Object.entries`
// and `.forEach` loop to iterate through each
// default dimension to find the match.
Object.entries(dimensions).forEach(([key, val]) => {
    if (val.is(complex_dimension)) {
        console.log('The unknown dimension is ' + key + '.');
    }
});