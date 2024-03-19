import { Datum, fit } from 'datafit';

// Define a general 3D plane function
// x[0] represents the x-axis
// x[1] represents the y-axis
// The z-axis is represented by f([x, y], ...)
function f(x: number[], cx: number, cy: number, cz: number): number {
    return cx * x[0] + cy * x[1] + cz;
}

// These 3 points make up the plane
// z = 2x - y + 1
const data: Datum<number[]>[] = [
    { x: [0, 0], y: 1 },
    { x: [1, 0], y: 3 },
    { x: [0, 1], y: 0 },
];

// Run the curve fitting algorithm
const summary = fit(f, data);
console.log(summary);