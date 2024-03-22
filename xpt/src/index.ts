/**
 * @packageDocumentation
 * Finds exceptions in your code
 * 
 * Exports the public-facing API for `xpt`
 */
/**
 * Framework to find exceptions.
 */
export abstract class xpt {
    /**
     * Detect an exception for a failed test.
     * @param pass Whether the assertion will pass or find an exception.
     * @param message The exception message, if found.
     */
    private static assert(pass: boolean, message: string = 'Exception found!'): void {
        if (!pass) {
            throw new Exception(message);
        }
    }
    /**
     * Test that `a` is `b` or throw an exception.
     * @param a Any value
     * @param b Any value
     */
    public static is(a: any, b: any) {
        this.assert(JSON.stringify(a) === JSON.stringify(b));
    }
}
/**
 * Exceptions extend the base `Error` class.
 */
class Exception extends Error { }