import * as T6 from 't6';

// This function always returns true.
function alwaysReturnsTrue() {
    return true;
}
// This test should pass
T6.isTrue(alwaysReturnsTrue());

// This function always returns false.
function alwaysReturnsFalse() {
    return false;
}
// This test should pass
T6.isFalse(alwaysReturnsFalse());

// Show that all tests passed.
console.log('All tests passed!');