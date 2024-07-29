import { T6 } from 't6';

// Here's a simulation of
// an API to obtain the
// list price of an item.
function getPrice() {
    return 50;
}

// Let's say our cap is $40 to
// continue processing. We can
// assert that the price is less
// than or equal to $40 or throw
// an error. For this example,
// we will catch the exception.
try {
    T6.le(getPrice(), 40);
    console.log('Processing item.');
} catch (e) {
    console.log(e.message);
}

// Here is the same logic using
// a custom exception message.
try {
    T6.le(getPrice(), 40, 'Price exceeded $40 limit.');
    console.log('Processing item.');
} catch (e) {
    console.log(e.message);
}