import { Pumpchart } from 'psychart';

// Define timestamps
const now = Date.now();
const onehr = 60 * 60 * 1000;
const in1hr = now + onehr
const nData = 100;

// Create a custom pump chart
const pumpchart = new Pumpchart({
    pumpCurve: '30-(q/100)^2',
    systemCurve: '5+(q/75)^2',
    speed: {
        max: 60, // Max pump speed (rpm)
        operation: 55, // Operational speed (rpm)
        steps: [15, 30, 45], // Minor pump curves (rpm)
    },
    units: {
        flow: 'gpm',
        head: 'psi',
        power: 'kW',
        speed: 'rpm',
    },
});

// Plot `nData` number of data points
for (let t = now; t < in1hr; t += onehr / nData) {
    const flow = Math.random() * 300;
    const head = Math.random() * 20;
    pumpchart.plot({ flow: flow, head: head }, {
        timestamp: t,
        gradient: {
            name: 'Viridis',
            score: (t - now) / onehr,
        },
    });
}

// Append pumpchart to the document <body>
document.body.append(pumpchart.getElement());
