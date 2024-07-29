import { T6 } from 't6';

// 5 is greater than 4
T6.gt(5, 4);
T6.isTrue(5 > 4);

// 2 is less than or equal to 2
T6.le(2, 2);
T6.isTrue(2 <= 2);

// 3 is not equal to 0
T6.ne(3, 0)
T6.isTrue(3 !== 0);
T6.isFalse(3 === 0);

// Show that all tests passed.
console.log('All tests passed!');