import { Psychart } from 'psychart';

const ps = new Psychart(
    {
        padding: { x: 40, y: 20 },
        size: { x: 800, y: 600 },
    },
    {
        altitude: 100, // [m]
        count: 0,
        dbMin: 10, // [degC]
        dbMax: 50, // [degC]
        dpMax: 40, // [degC]
        flipXY: true,
        showUnits: 'both',
        regions: [],
        series: {},
        unitSystem: 'SI',
        yAxis: 'hr', // Humidity ratio
    },
    Psychart.getDefaultStyleOptions(false)
);

window.addEventListener('load', () => {
    document.body.append(ps.getElement());
});