/**
 * @packageDocumentation
 * Expect or except!
 * 
 * Exports the public-facing API for `xpt`
 */
/**
 * Framework to find exceptions.
 * If any test fails, will throw
 * an exception and halt execution.
 */
export abstract class xpt {
    /**
     * Expect a test to return true.
     * @param test A test that returns a boolean result
     * @param message The exception message, if found
     */
    public static true(test: boolean, message: string = 'Exception found! Value was ' + test + '.'): void {
        if (!test) {
            throw new Exception(message);
        }
    }
    /**
     * Expect a test to return false.
     * @param test A test that returns a boolean result
     */
    public static false(test: boolean): void {
        this.true(!test);
    }
    /**
     * Expect two arguments of any type to contain the same value(s).
     * @param arg1 Argument 1, any value is accepted
     * @param arg2 Argument 2, any value is accepted
     */
    public static is(arg1: any, arg2: any): void {
        this.true(JSON.stringify(arg1) === JSON.stringify(arg2));
    }
    /**
     * Expect two numbers to be of equal value.
     * @param num1 Numeric input 1
     * @param num2 Numeric input 2
     */
    public static eq(num1: number, num2: number): void {
        this.true(num1 === num2);
    }
}
/**
 * Exceptions extend the base `Error` class.
 */
class Exception extends Error { }