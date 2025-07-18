import * as SMath from 'smath';

/**
 * Render a single factor in LaTeX markup.
 * @param LaTeX LaTeX symbol to render
 * @param exponent The exponent on this factor
 * @returns A LaTeX representation of a factor
 */
export function factor(LaTeX: string, exponent: number): string {
    const rat = SMath.rat(exponent, 0.01);
    if (rat.num === 1 && rat.den === 1) {
        return LaTeX;
    }
    if (rat.num === 1 && rat.den === 2) {
        return '\\sqrt{' + LaTeX + '}';
    }
    if (rat.den === 1) {
        return LaTeX + '^{' + rat.num + '}';
    }
    return LaTeX + '^\\frac{' + rat.num + '}{' + rat.den + '}';
}