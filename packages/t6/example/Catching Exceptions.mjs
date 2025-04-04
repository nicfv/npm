import * as T6 from 't6';

// Oops! There was a logic
// error in returns8()!
function returns8() {
    return 9;
}

try {
    // This test will fail
    T6.eq(returns8(), 8);
} catch (e) {
    console.log(e.message);
}

console.log('...Still processing...');