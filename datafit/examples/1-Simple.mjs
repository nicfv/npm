import { fit } from 'datafit';

// Define our model function: y=mx+b
function f(x, m, b) {
    return m * x + b;
}

// Define our dataset
const data = [
    { x: 1, y: -1 },
    { x: 2, y: 1 },
    { x: 3, y: 2 },
];

// Compute the best fit parameters to
// get `m` and `b`, and print result.
const summary = fit(f, data);
const m_fit = summary.params[0];
const b_fit = summary.params[1];
console.log('The best-fit line is y = ' + m_fit.toFixed(2) + 'x + ' + b_fit.toFixed(2));