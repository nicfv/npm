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
    public static true(test: boolean, message: string = 'Test failed. Value was ' + test + '.'): void {
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
    public static false(test: boolean, message: string = 'Test failed. Value was ' + test + '.'): void {
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
    public static is(test: string, ref: string, message: string = 'Strings "' + test + '" and "' + ref + '" are not the same.'): void {
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
    public static isNot(test: string, ref: string, message: string = 'Strings "' + test + '" and "' + ref + '" are the same.'): void {
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
    public static eq(test: number, ref: number, message: string = 'Numbers ' + test + ' and ' + ref + ' are not equal.'): void {
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
    public static ne(test: number, ref: number, message: string = 'Numbers ' + test + ' and ' + ref + ' are equal.'): void {
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
    public static gt(test: number, ref: number, message: string = 'Number ' + test + ' is not greater than ' + ref + '.'): void {
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
    public static lt(test: number, ref: number, message: string = 'Number ' + test + ' is not less than ' + ref + '.'): void {
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
    public static ge(test: number, ref: number, message: string = 'Number ' + test + ' is not greater than or equal to ' + ref + '.'): void {
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
    public static le(test: number, ref: number, message: string = 'Number ' + test + ' is not less than or equal to ' + ref + '.'): void {
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