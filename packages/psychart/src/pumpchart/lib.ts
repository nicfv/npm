/**
 * Represents a mathematical function `h = f(q)`
 */
export type f = (q: number) => number;
/**
 * Find the solution (zero) of a function.
 */
export function zero(func: f, left: number, right: number, maxIterations = 1e6): number {
    for (let i = 0; i < maxIterations; i++) {
        const leftSign: number = Math.sign(func(left));
        const rightSign: number = Math.sign(func(right));
        if (leftSign === rightSign) {
            throw new Error('A solution cannot be found.');
        }
        const mid: number = (left + right) / 2;
        const midSign: number = Math.sign(func(mid));
        if (leftSign === 0) { return left; }
        if (rightSign === 0) { return right; }
        if (midSign === 0) { return mid };
        if (i > maxIterations) { return mid; }
        if (midSign === leftSign) {
            left = mid;
        } else {
            right = mid;
        }
    }
    return left;
}
/**
 * Convert a raw function definition into a valid function.
 */
export function getFunction(raw: string, variable: string): f {
    const ALLOWABLE_CHARS = '1234567890.+-*/^()' + variable;
    for (const char of raw) {
        if (!ALLOWABLE_CHARS.includes(char)) {
            throw new Error(`Invalid character ${char} in function: ${raw}`);
        }
    }
    return new Function('q', `return +(${raw.replace('^', '**')})`) as f;
}