import { Psychart, getDefaultPsyOptions } from 'psychart';

// Start with the default options for Psychart,
// but set a custom minimum dry bulb temperature.
const customPsyOptions = getDefaultPsyOptions();
customPsyOptions.dbMin = 50;

const ps = new Psychart(
    {
        padding: { x: 40, y: 20 },
        size: { x: 800, y: 600 },
    },
    customPsyOptions,
    Psychart.getDefaultStyleOptions(false)
);

window.addEventListener('load', () => {
    document.body.append(ps.getElement());
});