import { Psychart, getDefaultDataOptions } from 'psychart';

// Create some custom data options for tracking the
// psychrometrics for two fictitious rooms called "R1" and "R2"
const R1DataOptions = getDefaultDataOptions('Room R1');
R1DataOptions.advanced = true;
R1DataOptions.line = true;
const R2DataOptions = getDefaultDataOptions('Room R2');
R2DataOptions.advanced = true;
R2DataOptions.line = true;
// Set another gradient type for this data series to make
// it easier to visually differentiate between the two.
R2DataOptions.gradient = 'Sunset';

// Initialize Psychart.
const ps = new Psychart({
    // Set custom data options for series 1 (R1) and 2 (R2).
    // Series ID#s can be set to any numeric value and
    // do not need to be 0- or 1-indexed.
    series: {
        1: R1DataOptions,
        2: R2DataOptions,
    },
    // Also, let's render a few ASHRAE standard-55 psychrometric
    // envelopes for the current season onto our chart.
    regions: ['Summer (light work)', 'Summer (sitting)', 'Summer (walking)'],
});

// Append Psychart onto the document and plot data.
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
        // `measurement: 'dbwb'` shows that the auxiliary measurement type is wet bulb
        // `1` represents the series ID# which is defined in our `customPsyOptions`
        ps.plot({ db: state[1], other: state[2], measurement: 'dbwb' }, 1, state[0], startTime, endTime);
    }
    for (const state of R2Data) {
        // Notice that the measurement type and ID# are different for this data series.
        ps.plot({ db: state[1], other: state[2], measurement: 'dbdp' }, 2, state[0], startTime, endTime);
    }
}