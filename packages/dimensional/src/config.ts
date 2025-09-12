/**
 * Global configuration options for the `dimensional` package
 */
export const config = {
    /**
     * Automatically convert dimension, unit, and prefix names to LaTeX `text` elements\
     * Default: `true`
     */
    convertToText: true,
    /**
     * The symbol to use for dimensionless and unitless quantities\
     * Default: `1`
     */
    scalarSymbol: '1',
    /**
     * The LaTeX symbol for combined units or dimensions by multiplication\
     * Default: `\cdot`
     */
    multiplySymbol: '\\cdot',
    /**
     * The number of decimals displayed when converting quantities to strings\
     * Default: `3`
     */
    decimalsShown: 3,
    /**
     * The base-10 magnitude bounds at which numeric values are displayed in scientific notation
     */
    scientificNotationMagnitude: {
        /**
         * The minimum magnitude for standard notation\
         * Default: `-6` (0.000 001)
         */
        min: -6,
        /**
         * The maximum magnitude for standard notation\
         * Default: `6` (1,000,000)
         */
        max: 6,
    },
    /**
     * Characters in LaTeX that mark the beginning and end of a unit within a quantity
     */
    unitDelimiters: {
        /**
         * The left side\
         * Default: `\left[`
         */
        left: '\\left[',
        /**
         * The right side\
         * Default: `\right]`
         */
        right: '\\right]',
    },
};