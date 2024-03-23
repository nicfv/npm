import { X } from '../src/index';

X.true(true);

try {
    X.true(false);
} catch (e) {
    X.is(e.message, 'Exception found in test #2! The test returned false.');
}