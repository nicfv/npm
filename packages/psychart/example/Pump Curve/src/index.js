import { Pumpchart } from 'psychart';

// Define timestamps
const now = Date.now();
const onehr = 60 * 60 * 1000;
const in1hr = now + onehr
const nData = 100;

// Create a custom pump chart
const pumpchart = new Pumpchart({
    curve: { // Define performance curves as a function of `q` (flow rate)
        pump: {
            maxFlow: 3000,
            maxHead: 35,
        },
        system: {
            static: 5,
            friction: 2e-6,
        },
    },
    speed: {
        max: 60, // Max pump speed (rpm)
        operation: 45, // Operational speed (rpm)
        steps: [15, 30, 45], // Minor pump curves (rpm)
    },
    units: {
        flow: 'gpm',
        head: 'psi',
        power: 'kW',
        speed: 'rpm',
    },
    timestamp: { // Set the start and ending timestamps for colorizing data
        start: now,
        stop: in1hr,
    },
});

// Plot `nData` number of data points
for (let t = now; t < in1hr; t += onehr / nData) {
    const flow = Math.random() * 2500;
    const head = Math.random() * 25;
    const power = flow * head / 2000;
    pumpchart.plot({ flow: flow, head: head, power: power }, { timestamp: t });
}

// Append pumpchart to the document <body>
document.body.append(pumpchart.getElement());
