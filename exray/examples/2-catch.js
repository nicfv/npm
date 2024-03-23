import { X } from 'exray';

// Oops! There was a logic
// error in returns8()!
function returns8() {
    return 9;
}

try {
    // This test will fail
    X.eq(returns8(), 8);
} catch (e) {
    console.log(e);
}