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
        max: 60,
        operation: 55,
        steps: [15, 30, 45],
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

window.addEventListener('load', () => {
    document.body.append(pumpchart.getElement());
});