import { Datum, fit } from 'datafit';

// Define our model function: y=mx+b
function f(x: number, m: number, b: number): number {
    return m * x + b;
}

// Define our dataset
const data: Datum<number>[] = [
    { x: 1, y: -1 },
    { x: 2, y: 1 },
    { x: 3, y: 2 },
];

// Compute the best fit parameters to
// get `m` and `b`, and print result.
const summary = fit(f, data);
const m_fit: number = summary.params[0];
const b_fit: number = summary.params[1];
console.log('The best-fit line is y = ' + m_fit.toFixed(2) + 'x + ' + b_fit.toFixed(2));