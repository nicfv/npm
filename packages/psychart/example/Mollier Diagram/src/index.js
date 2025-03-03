import { getDefaultPsychartOptions, Psychart } from 'psychart';

const customPsyOptions = getDefaultPsychartOptions(false);
customPsyOptions.unitSystem = 'SI';
customPsyOptions.dbMax = 50; // [deg C]
customPsyOptions.dbMin = 10; // [deg C]
customPsyOptions.dpMax = 40; // [deg C]
customPsyOptions.flipXY = true;
customPsyOptions.yAxis = 'hr'; // Humidity Ratio

const ps = new Psychart(customPsyOptions);

window.addEventListener('load', () => {
    document.body.append(ps.getElement());
});