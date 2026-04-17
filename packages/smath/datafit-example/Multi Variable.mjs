import { fit } from 'datafit';

// Define a general 3D plane function where z = f(x, y)
function f([x, y], cx, cy, cz) {
    return cx * x + cy * y + cz;
}

// These 3 points make up the plane
// z = 2x - y + 1
const data = [
    { x: [0, 0], y: 1 },
    { x: [1, 0], y: 3 },
    { x: [0, 1], y: 0 },
];

// Run the curve fitting algorithm
const summary = fit(f, data);
console.log(summary);