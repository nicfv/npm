## Getting Started

"xpt" can be pronounced "expect" or "except"! This package contains a simple, lightweight assertion testing framework written in JavaScript. If any one of the `xpt` expectations fail, it will throw an exception and halt program execution. Exceptions can be caught using the standard `try ... catch` block.

`xpt` exports several different test types, however all of them can be simply derived from `xpt.true(...)`. Here is an example of a basic use case for `xpt.true(...)` using a test function that will always fail. Custom exception messages are always optional, but recommended for clarity in case a test fails.

```js
// Define an example test that always returns false
function alwaysFails() {
    return false;
}
// Test the function
xpt.true(alwaysFails(), 'My custom test failed!');
```

Here is another example with comparing 2 numbers. We can run the same test using `xpt.gt(...)` and using the builtin exception message.

```js
// Define 2 numbers
const a = 5, b = 5;
// Test whether a is greater than b
xpt.true(a > b, 'a was not greater than b!');
// Try the same thing using the gt test
xpt.gt(a, b); // No need to set a custom message
```
