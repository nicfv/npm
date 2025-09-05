/**
 * Global configuration options for the `dimensional` package
 */
export const config = {
    /**
     * Automatically convert dimension, unit, and prefix names to LaTeX `text` elements
     */
    convertToText: true,
    /**
     * The symbol to use for dimensionless and unitless quantities
     */
    scalarSymbol: '1',
    /**
     * The LaTeX symbol for combined units or dimensions by multiplication
     */
    multiplySymbol: '\\cdot',
    /**
     * The number of decimals displayed when converting quantities to strings
     */
    decimalsShown: 3,
    /**
     * Characters in LaTeX that mark the beginning and end of a unit within a quantity
     */
    unitDelimiters: {
        /**
         * The left side, e.g. `[`
         */
        left: '\\left[',
        /**
         * The right side, e.g. `]`
         */
        right: '\\right]',
    },
};