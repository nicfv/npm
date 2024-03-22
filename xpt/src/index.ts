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
     * Expect two strings to be **identical**.
     * @param str1 String value 1
     * @param str2 String value 2
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static is(str1: string, str2: string, message: string = 'Strings "' + str1 + '" and "' + str2 + '" are not the same.'): void {
        this.true(str1 === str2, message);
    }
    /**
     * Expect two strings to be **different**.
     * @param str1 String value 1
     * @param str2 String value 2
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static isNot(str1: string, str2: string, message: string = 'Strings "' + str1 + '" and "' + str2 + '" are the same.'): void {
        this.true(str1 !== str2, message);
    }
    /**
     * Expect two numbers to be of **equal** value.
     * @param num1 Numeric input 1
     * @param num2 Numeric input 2
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static eq(num1: number, num2: number, message: string = 'Numbers ' + num1 + ' and ' + num2 + ' are not equal.'): void {
        this.true(num1 === num2, message);
    }
    /**
     * Expect two numbers to **not be of equal** value.
     * @param num1 Numeric input 1
     * @param num2 Numeric input 2
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static ne(num1: number, num2: number, message: string = 'Numbers ' + num1 + ' and ' + num2 + ' are equal.'): void {
        this.true(num1 !== num2, message);
    }
    /**
     * Expect the first number to be strictly **greater than** the second number.
     * @param num1 Numeric input 1
     * @param num2 Numeric input 2
     * @param message The exception message to show if
     * an unexpected result was found. If not set, will
     * display a default message for this type of test.
     */
    public static gt(num1: number, num2: number, message: string = 'Numbers ' + num1 + ' and ' + num2 + ' are equal.'): void {
        this.true(num1 > num2, message);
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