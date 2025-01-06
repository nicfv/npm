/**
 * @packageDocumentation
 * Lightweight assertion testing framework
 * 
 * ![NPM Downloads](https://img.shields.io/npm/d18m/t6)
 */
/**
 * Lightweight framework to expect
 * results or throw exceptions. If
 * any test fails, halts execution.
 * Exceptions can be caught with
 * standard `try ... catch` blocks.
 */
export namespace T6 {
    /**
     * Increments for every test run.
     */
    let i: number = 0;
    /**
     * Return the number of the test that last completed.
     * @returns The current test number.
     */
    export function getTestNumber(): number {
        return i;
    }
    /**
     * Expect a test to return **true**.
     * @param test A test that returns a boolean result
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    export function isTrue(test: boolean, message: string = 'The test returned ' + test + '.'): void {
        i++;
        if (!test) {
            throw new Exception(i, message);
        }
    }
    /**
     * Expect a test to return **false**.
     * @param test A test that returns a boolean result
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    export function isFalse(test: boolean, message: string = 'The test returned ' + test + '.'): void {
        isTrue(!test, message);
    }
    /**
     * Expect the test string to be **identical** to the expected string.
     * @param test A test that returns a string result
     * @param expect The expected string to use for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    export function is(test: string, expect: string, message: string = 'The test string "' + test + '" did not match the expected string "' + expect + '".'): void {
        isTrue(test === expect, message);
    }
    /**
     * Expect the test string to be **different** than the expected string.
     * @param test A test that returns a string result
     * @param expect The expected string to use for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    export function not(test: string, expect: string, message: string = 'The test string "' + test + '" matched the expected string "' + expect + '".'): void {
        isTrue(test !== expect, message);
    }
    /**
     * Expect the test to **be equal** to the expected value.
     * @param test A test that returns a numeric result
     * @param expect The expected number to use for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    export function eq(test: number, expect: number, message: string = 'The test value of ' + test + ' was not equal to the expected value of ' + expect + '.'): void {
        isTrue(test === expect, message);
    }
    /**
     * Expect the test to **not be equal** to the expected value.
     * @param test A test that returns a numeric result
     * @param expect The expected number to use for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    export function ne(test: number, expect: number, message: string = 'The test value of ' + test + ' was equal to the expected value of ' + expect + '.'): void {
        isTrue(test !== expect, message);
    }
    /**
     * Expect the test to be strictly **greater than** the expected value.
     * @param test A test that returns a numeric result
     * @param expect The expected number to use for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    export function gt(test: number, expect: number, message: string = 'The test value of ' + test + ' was not greater than the expected value of ' + expect + '.'): void {
        isTrue(test > expect, message);
    }
    /**
     * Expect the test to be strictly **less than** the expected value.
     * @param test A test that returns a numeric result
     * @param expect The expected number to use for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    export function lt(test: number, expect: number, message: string = 'The test value of ' + test + ' was not less than the expected value of ' + expect + '.'): void {
        isTrue(test < expect, message);
    }
    /**
     * Expect the test to be **greater than or equal to** the expected value.
     * @param test A test that returns a numeric result
     * @param expect The expected number to use for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    export function ge(test: number, expect: number, message: string = 'The test value of ' + test + ' was not greater than nor equal to the expected value of ' + expect + '.'): void {
        isTrue(test >= expect, message);
    }
    /**
     * Expect the test to be **less than or equal to** the expected value.
     * @param test A test that returns a numeric result
     * @param expect The expected number to use for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    export function le(test: number, expect: number, message: string = 'The test value of ' + test + ' was not less than nor equal to the expected value of ' + expect + '.'): void {
        isTrue(test <= expect, message);
    }
}
/**
 * Exceptions extend the base `Error` class.
 */
class Exception extends Error {
    /**
     * Create a new exception to throw.
     * @param message The exception message
     */
    constructor(id: number, message: string) {
        super('Exception found in test #' + id + '! ' + message);
    }
}