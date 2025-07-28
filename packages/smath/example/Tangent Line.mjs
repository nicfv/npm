import * as SMath from 'smath';

// Define our curve function
function f(x) {
    return 1 / 8 * x * x - x - 4;
}

// Obtain our point (x0, y0)
const x0 = 1;
const y0 = f(x0);

// Use SMath to obtain the slope at our point
const m = SMath.differentiate(f, x0);

// Use SMath to decompose the slope and
// y-intercept into fractions.
const m_frac = SMath.rat(m);
const b_frac = SMath.rat(y0 - m * x0);

// Print results
console.log('y = ' + m_frac.num + '/' + m_frac.den + ' x + ' + b_frac.num + '/' + b_frac.den);