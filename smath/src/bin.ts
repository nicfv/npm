#!/usr/bin/env node

import { SMath } from '.';

const func: string = (process.argv[2] ?? '').toLowerCase(),
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
    console.log('  sum <c0> [c1] ... [cn]   : Compute a total of `n` numbers');
    console.log('  prod <c0> [c1] ... [cn]  : Compute a product of `n` numbers');
    console.log('  avg <c0> [c1] ... [cn]   : Take an average of `n` numbers');
    console.log('  varp <c0> [c1] ... [cn]  : Compute the population variance of `n` numbers');
    console.log('  vars <c0> [c1] ... [cn]  : Compute the sample variance of `n` numbers');
    console.log('  stdevp <c0> [c1] ... [cn]: Compute the population standard deviation of `n` numbers');
    console.log('  stdevs <c0> [c1] ... [cn]: Compute the sample standard deviation of `n` numbers');
    console.log('  approx <a> <b> [eps]     : Check if `a` and `b` are approximately equal');
    console.log('  clamp <n> <min> <max>    : Clamp `n` between `min` and `max`');
    console.log('  expand <n> <min> <max>   : Expand normalized `n` between `min` and `max`');
    console.log('  linspace <min> <max> <n> : Generate `n` linearly spaced numbers between `min` and `max`');
    console.log('  logspace <min> <max> <n> : Generate `n` logarithmically spaced numbers between `min` and `max`');
    console.log('  normalize <n> <min> <max>: Normalize `n` between `min` and `max`');
    console.log('  translate <n> <min1> <max1> <min2> <max2>');
    console.log('                           : Linearly interpolate `n` from `min1`, `max1` to `min2`, `max2`');
    console.log('  factorial <n>            : Compute `n!` (factorial)');
    console.log('  error <exp> <act>        : Calculate the normaized percent error between `exp` and `act`');
    process.exit(1);
}

switch (func) {
    case ('sum'): {
        console.log(SMath.sum(nums));
        break;
    }
    case ('prod'): {
        console.log(SMath.prod(nums));
        break;
    }
    case ('avg'): {
        console.log(SMath.avg(nums));
        break;
    }
    case ('varp'): {
        console.log(SMath.varp(nums));
        break;
    }
    case ('vars'): {
        console.log(SMath.vars(nums));
        break;
    }
    case ('stdevp'): {
        console.log(SMath.stdevp(nums));
        break;
    }
    case ('stdevs'): {
        console.log(SMath.stdevs(nums));
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
    case ('factorial'): {
        console.log(SMath.factorial(nums[0]));
        break;
    }
    case ('error'): {
        console.log(SMath.error(nums[0], nums[1]));
        break;
    }
    case (''): {
        console.error('Missing argument. Use with "help" for a list of commands.');
        process.exit(1);
    }
    default: {
        console.error('Unknown argument "' + func + '". Use with "help" for a list of commands.');
        process.exit(1);
    }
}