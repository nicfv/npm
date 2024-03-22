import { fit } from 'datafit';

// Define a model function for curve fitting.
// Let's use a generic 2nd degree polynomial
// with all constants unknown.
function f(x, a0, a1, a2) {
    a0 = a0 ?? 1.3;
    a1 = a1 ?? 1.0;
    a2 = a2 ?? -0.2;
    return a2 * x ** 2 + a1 * x + a0;
}

// Define a function to add noise to the dataset
function noise(A) {
    return A * (2 * Math.random() - 1)
}

// Define the dataset from our noisy signal
const data = [-2, -1, 0, 1, 2].map(x => ({ x: x, y: f(x) + noise(0.1) }));
console.log('Dataset', data);

// Compute the best-fit set of parameters
// starting with an initial guess of [x^2 + x + 1]
// with 10,000 iterations, and each parameter
// can vary up to 50% on the first iteration
const summary = fit(f, data, [1, 1, 1], 10000, 0.5);
console.log('Summary', summary);

// Compute the actual value and
// best-fit value of f(3) to compare
const f3_act = f(3);
const f3_fit = summary.f(3);
console.log('f(3)', f3_act, f3_fit);

// Compute the relative error
const rel_error = (f3_fit - f3_act) / f3_act * 100;
console.log('Error: ' + rel_error.toFixed(2) + '%');