import { Color, Gradient } from 'viridis';

// Define a custom gradient using an array of colors
const RGB_Gradient = new Gradient([
    new Color(255, 0, 0), // 0.0
    new Color(0, 255, 0), // 0.5
    new Color(0, 0, 255), // 1.0
]);

// Generate valid CSS code for this color gradient
console.log('CSS code        : ' + RGB_Gradient);
console.log('CSS code [45deg]: ' + RGB_Gradient.toString(45));

// Show the internal array of color stops
console.log('Color Stops', RGB_Gradient.colors);

// Generate a short list of intermediate color values
// Gradient will automatically interpolate if given
// a minimum and maximum bound. (1, N)
const N = 5;
for (let i = 1; i <= N; i++) {
    console.log(i + ' = ' + RGB_Gradient.getColor(i, 1, N));
}