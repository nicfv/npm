import * as T6 from './index.js';

T6.isTrue(true);
T6.isFalse(false);
T6.eq(1, 1);
T6.ge(1, 1);
T6.ge(2, 1);
T6.gt(2, 1);
T6.le(-2, 1);
T6.lt(-2, 1);

try {
    T6.isTrue(false);
} catch (e) {
    T6.is((e as Error).message, 'Exception found in test #9! The test returned false.');
}

try {
    T6.ne(1, 1, 'Custom');
} catch (e) {
    T6.is((e as Error).message, 'Exception found in test #11! Custom');
}

T6.eq(T6.getTestNumber(), 12);
