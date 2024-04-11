import { X } from 'exray';

// This function always returns true.
function alwaysReturnsTrue() {
    return true;
}
// This test should pass
X.true(alwaysReturnsTrue());

// This function always returns false.
function alwaysReturnsFalse() {
    return false;
}
// This test should pass
X.false(alwaysReturnsFalse());

// Show that all tests passed.
console.log('All tests passed!');