import { Psychart } from 'psychart';

// Initialize Psychart.
const ps = new Psychart({
    // Let's render a few ASHRAE standard-55 psychrometric
    // envelopes for the current season onto our chart.
    regions: ['Summer (light work)', 'Summer (sitting)', 'Summer (walking)'],
});

// Append Psychart and the legend onto the document and plot data.
window.addEventListener('load', () => {
    document.body.append(ps.getElement());
    plotData();
});

// Assume data comes in from room R1 as a clean CSV with the following columns:
// [0]: Unix timestamp, [1]: Dry bulb (F), and [2]: Wet bulb (F)
const R1Data = [
    [1700000000000, 77, 67],
    [1700001200000, 78, 66],
    [1700002400000, 77, 64],
    [1700003600000, 79, 65],
    [1700004800000, 80, 67],
];
// Possibly the sensors in room R2 are configured differently:
// [0]: Unix timestamp, [1]: Dry bulb (F), and [2]: Dew point (F)
const R2Data = [
    [1700000000000, 71, 57],
    [1700001000000, 72, 58],
    [1700002000000, 75, 56],
    [1700003000000, 74, 54],
    [1700004000000, 76, 55],
    [1700005000000, 78, 55],
];

// Plot some data - this can be done dynamically
// as data is received by the client.
function plotData() {
    // Knowing the start and end time of the measurements allows for gradients to be rendered properly
    const startTime = 1700000000000,
        endTime = 1700005000000;
    for (const state of R1Data) {
        // Extract the timestamp from the data table.
        const timeStamp = state[0];
        // Plot data onto Psychart.
        ps.plot(
            {
                db: state[1],
                other: state[2],
                measurement: 'dbwb', // Shows the two measurement types are dry bulb and wet bulb
            },
            {
                advanced: true,
                line: true,
                name: 'Room R1', // Need to assign a series name to connect data points and display in the legend
                time: { start: startTime, end: endTime, now: timeStamp },
            }
        );
    }
    for (const state of R2Data) {
        // Extract the timestamp from the data table.
        const timeStamp = state[0];
        // Plot data onto Psychart.
        ps.plot(
            {
                db: state[1],
                other: state[2],
                measurement: 'dbdp' // Shows the two measurement types are dry bulb and dew point
            },
            {
                advanced: true,
                line: true,
                name: 'Room R2', // Assign another series name to differentiate data series
                time: { start: startTime, end: endTime, now: timeStamp },
                gradient: 'Sunset', // Set a non-default gradient type to make it easier to visually differentiate between the two data series
            }
        );
    }
    // Plot the desired setpoint.
    ps.plot(
        {
            db: 70,
            other: 60,
            measurement: 'dbwb'
        },
        {
            name: 'Setpoint',
            legend: false, // Show in the tooltip but not create a legend entry
            color: '#DF1000', // Use a hex-code to define a single color instead of using a gradient
            pointRadius: 8, // Enlarge the point to make it visually stand out
        }
    );
    // Draw a warning line on the 70F wetbulb line, from 70-80F dry bulb.
    ps.plot(
        {
            db: 80,
            other: 70,
            measurement: 'dbwb'
        },
        {
            name: 'Warning',
            legend: false,
            color: 'FBAB10',
            line: { db: 70, other: 70, measurement: 'dbwb' } // Draw a line between 2 arbitary points.
        }
    );
}