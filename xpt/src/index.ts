/**
 * @packageDocumentation
 * Expect or except!
 * 
 * Exports the public-facing API for `xpt`
 */
/**
 * Lightweight framework to expect
 * results or throw exceptions. If
 * any test fails, halts execution.
 * Exceptions can be caught with
 * standard `try ... catch` blocks.
 */
export abstract class xpt {
    /**
     * Expect a test to return **true**.
     * @param test A test that returns a boolean result
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static true(test: boolean, message: string = 'The test returned ' + test + '.'): void {
        if (!test) {
            throw new Exception(message);
        }
    }
    /**
     * Expect a test to return **false**.
     * @param test A test that returns a boolean result
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static false(test: boolean, message: string = 'The test returned ' + test + '.'): void {
        this.true(!test, message);
    }
    /**
     * Expect the test string to be **identical** to the expected string.
     * @param test A test that returns a string result
     * @param expect The expected string to use for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static is(test: string, expect: string, message: string = 'The test string "' + test + '" did not match the expected string "' + expect + '".'): void {
        this.true(test === expect, message);
    }
    /**
     * Expect the test string to be **different** than the expected string.
     * @param test A test that returns a string result
     * @param expect The expected string to use for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static not(test: string, expect: string, message: string = 'The test string "' + test + '" matched the expected string "' + expect + '".'): void {
        this.true(test !== expect, message);
    }
    /**
     * Expect the test to **be equal** to the expected value.
     * @param test A test that returns a numeric result
     * @param expect The expected number to use for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static eq(test: number, expect: number, message: string = 'The test value ' + test + ' was not equal to the expected value ' + expect + '.'): void {
        this.true(test === expect, message);
    }
    /**
     * Expect the test to **not be equal** to the expected value.
     * @param test A test that returns a numeric result
     * @param expect The expected number to use for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static ne(test: number, expect: number, message: string = 'The test value ' + test + ' was equal to the expected value ' + expect + '.'): void {
        this.true(test !== expect, message);
    }
    /**
     * Expect the test to be strictly **greater than** the expected value.
     * @param test A test that returns a numeric result
     * @param expect The expected number to use for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static gt(test: number, expect: number, message: string = 'The test value ' + test + ' was not greater than the expected value ' + expect + '.'): void {
        this.true(test > expect, message);
    }
    /**
     * Expect the test to be strictly **less than** the expected value.
     * @param test A test that returns a numeric result
     * @param expect The expected number to use for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static lt(test: number, expect: number, message: string = 'The test value ' + test + ' was not less than the expected value ' + expect + '.'): void {
        this.true(test < expect, message);
    }
    /**
     * Expect the test to be **greater than or equal to** the expected value.
     * @param test A test that returns a numeric result
     * @param expect The expected number to use for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static ge(test: number, expect: number, message: string = 'The test value ' + test + ' was not greater than nor equal to the expected value ' + expect + '.'): void {
        this.true(test >= expect, message);
    }
    /**
     * Expect the test to be **less than or equal to** the expected value.
     * @param test A test that returns a numeric result
     * @param expect The expected number to use for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static le(test: number, expect: number, message: string = 'The test value ' + test + ' was not less than nor equal to the expected value ' + expect + '.'): void {
        this.true(test <= expect, message);
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
    constructor(message: string) {
        super('Exception found! ' + message);
    }
}