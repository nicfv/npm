import { X } from './index';

X.true(true);
X.false(false);
X.eq(1, 1);

try {
    X.true(false);
} catch (e) {
    X.is((e as Error).message, 'Exception found in test #3! The test returned false.');
}

try {
    X.ne(1, 1, 'Custom');
} catch (e) {
    X.is((e as Error).message, 'Exception found in test #5! Custom');
}