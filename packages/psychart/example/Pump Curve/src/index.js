import { Pumpchart } from 'psychart';

// Define timestamps
const now = Date.now();
const onehr = 60 * 60 * 1000;
const in1hr = now + onehr
const nData = 0;

// Create a custom pump chart
const pumpchart = new Pumpchart({
    curve: { // Define performance curves as a function of `q` (flow rate)
        pump: {
            maxFlow: 6000,
            maxHead: 300,
        },
        system: {
            static: 5,
            friction: 175 ** -2,
        },
    },
    speed: {
        max: 60, // Max pump speed (rpm)
        operation: 45, // Operational speed (rpm)
        steps: [15, 30, 45], // Minor pump curves (rpm)
    },
    density: 1,
    units: {
        density: 'g/cm3',
        flow: 'm3/s',
        head: 'Pa',
        power: 'W',
        speed: 'rpm',
    },
    timestamp: { // Set the start and ending timestamps for colorizing data
        start: now,
        stop: in1hr,
    }
});

// Plot `nData` number of data points
for (let t = now; t < in1hr; t += onehr / nData) {
    const flow = Math.random() * 3000;
    const head = Math.random() * 200;
    const power = flow * head;
    pumpchart.plot({ flow: flow, head: head, power: power }, { timestamp: t });
}

// pumpchart.clearData();
// pumpchart.plot({ flow: 500, head: 150, power: 50 });

// Append pumpchart to the document <body>
document.body.append(pumpchart.getElement());
