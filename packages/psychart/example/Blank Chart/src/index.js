import { Psychart } from 'psychart';

const ps = new Psychart(
    {
        padding: { x: 40, y: 20 },
        size: { x: 800, y: 600 },
    },
    {
        altitude: 0,
        count: 0,
        dbMin: 20,
        dbMax: 100,
        dpMax: 90,
        flipXY: false,
        regions: [],
        series: {},
        unitSystem: 'IP',
    },
    Psychart.getDefaultStyleOptions(false)
);

window.addEventListener('load', () => {
    document.body.append(ps.getElement());
});