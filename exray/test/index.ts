import { X } from '../src/index';

X.true(true);
X.eq(1, 1);

try {
    X.true(false);
} catch (e) {
    X.is(e.message, 'Exception found in test #3! The test returned false.');
}