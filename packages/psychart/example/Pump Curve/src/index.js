import { Pumpchart } from 'psychart';

const pumpchart = new Pumpchart();

window.addEventListener('load', () => {
    document.body.append(pumpchart.getElement());
});