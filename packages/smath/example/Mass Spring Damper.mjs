import { DiffyQ } from 'smath';

// System properties
const m = 10;
const b = 1;
const k = 1;

// Initial conditions at `t=0`
const x0 = 0;
const dx0 = 0;

// Applied external force
function F(t) {
    return Math.sin(t);
}

// Differential equation, solved for ddx
function ddx(t, x, dx) {
    return 1 / m * (F(t) - b * dx - k * x);
}

// Create and solve the differential equation
const mass_spring_damper = new DiffyQ.DifferentialEquation(ddx, x0, dx0);
const data = mass_spring_damper.solve(0.01, 10);

// Print out results, dx[0] is the "x" position, dx[1] is velocity, 
for (let i = 0; i < data.length; i += 100) {
    console.log(`t=${data[i].time}, x=${data[i].dx[0]}, dx=${data[i].dx[1]}, ddx=${data[i].dx[2]}`);
}
