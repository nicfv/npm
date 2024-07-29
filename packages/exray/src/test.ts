import { X } from './index';

X.isTrue(true);
X.isFalse(false);
X.eq(1, 1);
X.ge(1, 1);
X.ge(2, 1);
X.gt(2, 1);

try {
    X.isTrue(false);
} catch (e) {
    X.is((e as Error).message, 'Exception found in test #7! The test returned false.');
}

try {
    X.ne(1, 1, 'Custom');
} catch (e) {
    X.is((e as Error).message, 'Exception found in test #9! Custom');
}