import { Psychart } from 'psychart';

const ps = new Psychart({
    unitSystem: 'SI',
    dbMax: 50, // [deg C]
    dbMin: 10, // [deg C]
    dpMax: 40, // [deg C]
    flipXY: true,
    yAxis: 'hr', // Humidity Ratio
    legend: false,
    showAxisNames: true,
});

window.addEventListener('load', () => {
    document.body.append(ps.getElement());
});