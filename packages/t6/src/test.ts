import { T6 } from './index';

T6.isTrue(true);
T6.isFalse(false);
T6.eq(1, 1);
T6.ge(1, 1);
T6.ge(2, 1);
T6.gt(2, 1);

try {
    T6.isTrue(false);
} catch (e) {
    T6.is((e as Error).message, 'Exception found in test #7! The test returned false.');
}

try {
    T6.ne(1, 1, 'Custom');
} catch (e) {
    T6.is((e as Error).message, 'Exception found in test #9! Custom');
}