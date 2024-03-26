#!/usr/bin/env node

import { SMath } from '.';

const func: string = process.argv[2].toLowerCase(),
    nums: Array<number> = process.argv.slice(3).map((arg, i) => {
        const num: number = Number.parseFloat(arg);
        if (Number.isFinite(num)) {
            return num;
        } else {
            console.error('Argument #' + i + ' is "' + arg + '" but a number was expected.');
            process.exit(1);
        }
    });

if (func.includes('help')) {
    console.log('Key: <required> [optional]');
    console.log('Arguments:');
    console.log('  help                     : Show this page');
    console.log('  avg <c0> [c1] ... [cn]   : Take an average of `n` numbers');
    console.log('  approx <a> <b> [eps]     : Check if `a` and `b` are approximately equal');
    console.log('  clamp <n> <min> <max>    : Clamp `n` between `min` and `max`');
    console.log('  expand <n> <min> <max>   : Expand normalized `n` between `min` and `max`');
    console.log('  linspace <min> <max> <n> : Generate `n` linearly spaced numbers between `min` and `max`');
    console.log('  logspace <min> <max> <n> : Generate `n` logarithmically spaced numbers between `min` and `max`');
    console.log('  normalize <n> <min> <max>');
    console.log('                           : Normalize `n` between `min` and `max`');
    console.log('  translate <n> <min1> <max1> <min2> <max2>');
    console.log('                           : Linearly interpolate `n` from `min1`, `max1` to `min2`, `max2`');
    console.log('  error <exp> <act>        : Calculate the normaized percent error between `exp` and `act`');
    // process.exit(1);
}

switch (func) {
    case ('avg'): {
        console.log(SMath.avg(nums));
        break;
    }
    case ('approx'): {
        console.log(SMath.approx(nums[0], nums[1], nums[2] ?? 1e-6));
        break;
    }
    case ('clamp'): {
        console.log(SMath.clamp(nums[0], nums[1], nums[2]));
        break;
    }
    case ('expand'): {
        console.log(SMath.expand(nums[0], nums[1], nums[2]));
        break;
    }
    case ('linspace'): {
        console.log(SMath.linspace(nums[0], nums[1], nums[2]));
        break;
    }
    case ('logspace'): {
        console.log(SMath.logspace(nums[0], nums[1], nums[2]));
        break;
    }
    case ('normalize'): {
        console.log(SMath.normalize(nums[0], nums[1], nums[2]));
        break;
    }
    case ('translate'): {
        console.log(SMath.translate(nums[0], nums[1], nums[2], nums[3], nums[4]));
        break;
    }
    case ('error'): {
        console.log(SMath.error(nums[0], nums[1]));
        break;
    }
    default: {
        console.error('Unknown argument "' + func + '". Use with "help" for a list of commands.');
        process.exit(1);
    }
}