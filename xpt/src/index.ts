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
     * @param test A boolean test
     * @param message The exception message, if found
     */
    public static true(test: boolean, message: string = 'Exception found! Value was ' + test + '.'): void {
        if (!test) {
            throw new Exception(message);
        }
    }
    /**
     * Expect two arguments of any type to contain the same value(s).
     * @param arg1 Argument 1, any value is accepted
     * @param arg2 Argument 2, any value is accepted
     */
    public static is(arg1: any, arg2: any) {
        this.true(JSON.stringify(arg1) === JSON.stringify(arg2));
    }
}
/**
 * Exceptions extend the base `Error` class.
 */
class Exception extends Error { }