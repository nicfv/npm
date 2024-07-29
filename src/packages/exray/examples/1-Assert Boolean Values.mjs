import { X } from 'exray';

// This function always returns true.
function alwaysReturnsTrue() {
    return true;
}
// This test should pass
X.isTrue(alwaysReturnsTrue());

// This function always returns false.
function alwaysReturnsFalse() {
    return false;
}
// This test should pass
X.isFalse(alwaysReturnsFalse());

// Show that all tests passed.
console.log('All tests passed!');