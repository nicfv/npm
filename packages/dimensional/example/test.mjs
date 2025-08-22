import { dimensions } from 'dimensional';

Object.entries(dimensions).forEach(([key, val]) => {
    console.log(key + ' \\\\\\(' + val.toString() + '\\\\\\)');
});