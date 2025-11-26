import { Pumpchart } from 'psychart';

const pumpchart = new Pumpchart();
pumpchart.plot({ flow: 50, head: 40 });

window.addEventListener('load', () => {
    document.body.append(pumpchart.getElement());
});