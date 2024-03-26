#!/usr/bin/env node

import { SMath } from '.';

const args: Array<string> = process.argv.slice(2);

/**
 * Try to convert an argument into a numeric value.
 */
function N(index: number, defaultVal: number = NaN): number {
    if (index >= args.length) {
        if (Number.isFinite(defaultVal)) {
            return defaultVal;
        } else {
            console.error('Required argument ' + index + ' is missing!');
            process.exit(1);
        }
    }
    const arg: number = Number.parseFloat(args[index]);
    if (Number.isFinite(arg)) {
        return arg;
    } else if (Number.isFinite(defaultVal)) {
        return defaultVal;
    } else {
        console.error('Argument #' + index + ' is ' + arg + ' but a number was expected.');
        process.exit(1);
    }
}

if (args.length < 1 || args[0].includes('help')) {
    console.log('Key: <required> [optional]');
    console.log('Arguments:');
    console.log('  help                     : Show this page');
    console.log('  approx <a> <b> [eps]     : Check if `a` and `b` are approximately equal');
    console.log('  avg <c0> [c1] ... [cn]   : Take an average of `n` numbers');
    console.log('  clamp <n> <min> <max>    : Clamp `n` between `min` and `max`');
    console.log('  expand <n> <min> <max>   : Expand normalized `n` between `min` and `max`');
    console.log('  linspace <min> <max> <n> : Generate `n` linearly spaced numbers between `min` and `max`');
    console.log('  logspace <min> <max> <n> : Generate `n` logarithmically spaced numbers between `min` and `max`');
    console.log('  normalize <n> <min> <max>');
    console.log('                           : Normalize `n` between `min` and `max`');
    console.log('  translate <n> <min1> <max1> <min2> <max2>');
    console.log('                           : Linearly interpolate `n` from `min1`, `max1` to `min2`, `max2`');
    console.log('  error <exp> <act>        : Calculate the normaized percent error between `exp` and `act`');
    process.exit(1);
}

switch (args[0]) {
    case ('approx'): {
        console.log(SMath.approx(N(1), N(2), N(3, 1e-6)));
        break;
    }
    case ('avg'): {
        if (args.length < 2) {
            console.error('Need at least 1 argument.');
            process.exit(1);
        }
        const operands: Array<number> = [];
        for (let i = 1; i < args.length; i++) {
            operands.push(N(i));
        }
        console.log(SMath.avg(operands));
        break;
    }
    case ('clamp'): {
        console.log(SMath.clamp(N(1), N(2), N(3)));
        break;
    }
    case ('expand'): {
        console.log(SMath.expand(N(1), N(2), N(3)));
        break;
    }
    case ('linspace'): {
        console.log(SMath.linspace(N(1), N(2), N(3)));
        break;
    }
    case ('logspace'): {
        console.log(SMath.logspace(N(1), N(2), N(3)));
        break;
    }
    case ('normalize'): {
        console.log(SMath.normalize(N(1), N(2), N(3)));
        break;
    }
    case ('translate'): {
        console.log(SMath.translate(N(1), N(2), N(3), N(4), N(5)));
        break;
    }
    case ('error'): {
        console.log(SMath.error(N(1), N(2)));
        break;
    }
    default: {
        console.error('Unknown argument "' + args[0] + '". Use with "help" for a list of commands.');
        process.exit(1);
    }
}