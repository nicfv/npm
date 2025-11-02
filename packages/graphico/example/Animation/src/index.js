import { Canvas } from 'graphico';

const canvas = new Canvas({
    // debug: true,
    border: 'black',
    loop(dt) { console.log(dt) },
});
