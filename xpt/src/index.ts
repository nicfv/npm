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
     * Test that `a` is `b` or throw an exception.
     * @param a Any value
     * @param b Any value
     */
    public static is(a: any, b: any) {
        this.true(JSON.stringify(a) === JSON.stringify(b));
    }
}
/**
 * Exceptions extend the base `Error` class.
 */
class Exception extends Error { }