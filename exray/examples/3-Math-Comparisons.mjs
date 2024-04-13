import { X } from 'exray';

// 5 is greater than 4
X.gt(5, 4);
X.isTrue(5 > 4);

// 2 is less than or equal to 2
X.le(2, 2);
X.isTrue(2 <= 2);

// 3 is not equal to 0
X.ne(3, 0)
X.isTrue(3 !== 0);
X.isFalse(3 === 0);

// Show that all tests passed.
console.log('All tests passed!');