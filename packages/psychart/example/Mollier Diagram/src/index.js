import { Psychart } from 'psychart';

const psychart = new Psychart({
    unitSystem: 'SI',
    dbMax: 50, // [deg C]
    dbMin: 10, // [deg C]
    dpMax: 40, // [deg C]
    flipXY: true,
    yAxis: 'hr', // Humidity Ratio
    dAxis: 'h', // Enthalpy
    legend: false,
    showAxisNames: true,
});

document.body.append(psychart.getElement());
