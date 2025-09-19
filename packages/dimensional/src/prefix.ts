import { config } from './config';

/**
 * Represents a unit prefix, which is effectively a unit modifier by a scaling factor.
 */
export class Prefix {
    /**
     * Define a new prefix to be used for any unit.
     * @param LaTeX The LaTeX code for this prefix
     * @param scale The scale of this prefix, relative to the base unit
     */
    constructor(public readonly LaTeX: string, public readonly scale: number) {
        if (/^[a-zA-Z]+$/.test(LaTeX) && config.convertToText) {
            this.LaTeX = '\\text{' + LaTeX + '}';
        } else {
            this.LaTeX = '{' + LaTeX + '}';
        }
    }
}