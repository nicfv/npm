#!/usr/bin/env node

import { SMath } from '.';

/**
 * Try to convert an argument into a numeric value.
 */
function N(index: number, defaultVal?: number): number {
    const arg: number = Number.parseFloat(process.argv[index]);
    if (Number.isFinite(arg)) {
        return arg;
    } else if (typeof defaultVal === 'number' && Number.isFinite(defaultVal)) {
        return defaultVal;
    } else {
        throw new Error('Argument ' + (index - 2) + ' is ' + arg);
    }
}

if (process.argv.length < 3 || process.argv[2].includes('help')) {
    console.log('Key: <required> [optional]');
    console.log('Arguments:');
    console.log('  help                     : Show this page');
    console.log('  approx <a> <b> [eps]     : Check if `a` and `b` are approximately equal');
    console.log('  avg <c0> [c1] ... [cn]   : Take an average of `n` numbers');
    console.log('  clamp <n> <min> <max>    : Clamp `n` between `min` and `max`');
    process.exit(1);
}

switch (process.argv[2]) {
    case ('approx'): {
        console.log(SMath.approx(N(3), N(4), N(5, 1e-6)));
        break;
    }
}

console.log('Inputs:', process.argv);
console.log(SMath.avg(1, 2, 3));