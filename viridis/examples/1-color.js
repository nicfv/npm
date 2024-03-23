import { Color } from 'viridis';

// getContrastingColor() will always return black or
// white, depending on which one has better contrast.
const background = new Color(255, 0, 0),
    foreground = background.getContrastingColor();

// Automatically calls the toString() member function
console.log('Background: ' + background);
console.log('Foreground: ' + foreground);