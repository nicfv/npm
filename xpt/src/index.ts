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
    public static true(test: boolean, message: string = 'Test was not true.'): void {
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
    public static false(test: boolean, message: string = 'Test was not false.'): void {
        this.true(!test, message);
    }
    /**
     * Expect the test string to be **identical** to the reference string.
     * @param test A test that returns a string result
     * @param ref A string to use as reference for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static is(test: string, ref: string, message: string = 'Test "' + test + '" did not match the reference "' + ref + '".'): void {
        this.true(test === ref, message);
    }
    /**
     * Expect the test string to be **different** than the reference string.
     * @param test A test that returns a string result
     * @param ref A string to use as reference for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static isNot(test: string, ref: string, message: string = 'Test "' + test + '" matched the reference "' + ref + '".'): void {
        this.true(test !== ref, message);
    }
    /**
     * Expect the test to **be equal** to the reference value.
     * @param test A test that returns a numeric result
     * @param ref A number to use as reference for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static eq(test: number, ref: number, message: string = 'Test value ' + test + ' was not equal to reference value ' + ref + '.'): void {
        this.true(test === ref, message);
    }
    /**
     * Expect the test to **not be equal** to the reference value.
     * @param test A test that returns a numeric result
     * @param ref A number to use as reference for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static ne(test: number, ref: number, message: string = 'Test value ' + test + ' was equal to reference value ' + ref + '.'): void {
        this.true(test !== ref, message);
    }
    /**
     * Expect the test to be strictly **greater than** the reference value.
     * @param test A test that returns a numeric result
     * @param ref A number to use as reference for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static gt(test: number, ref: number, message: string = 'Test value ' + test + ' was not greater than reference value ' + ref + '.'): void {
        this.true(test > ref, message);
    }
    /**
     * Expect the test to be strictly **less than** the reference value.
     * @param test A test that returns a numeric result
     * @param ref A number to use as reference for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static lt(test: number, ref: number, message: string = 'Test value ' + test + ' was not less than reference value ' + ref + '.'): void {
        this.true(test < ref, message);
    }
    /**
     * Expect the test to be **greater than or equal to** the reference value.
     * @param test A test that returns a numeric result
     * @param ref A number to use as reference for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static ge(test: number, ref: number, message: string = 'Test value ' + test + ' was not greater than nor equal to reference value ' + ref + '.'): void {
        this.true(test >= ref, message);
    }
    /**
     * Expect the test to be **less than or equal to** the reference value.
     * @param test A test that returns a numeric result
     * @param ref A number to use as reference for comparison
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static le(test: number, ref: number, message: string = 'Test value ' + test + ' was not less than nor equal to reference value ' + ref + '.'): void {
        this.true(test <= ref, message);
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