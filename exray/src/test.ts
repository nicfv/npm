import { X } from './index';

X.true(true);
X.eq(1, 1);

try {
    X.true(false);
} catch (e) {
    X.is(e.message, 'Exception found in test #3! The test returned false.');
}

try {
    X.ne(1, 1, 'Custom');
} catch (e) {
    X.is(e.message, 'Exception found in test #5! Custom');
}