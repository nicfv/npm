import { AlreadyExistsError } from './types';

/**
 * Represents a physical base dimension.
 */
export class Dimension {
    /**
     * Contains a dictionary of all created dimensions.
     */
    private static readonly dictionary: { [name: string]: Dimension } = {};
    /**
     * Return a list of valid dimension plain text names.
     * @returns A list of names for all dimensions
     */
    public static getNames(): Array<string> {
        return Object.keys(this.dictionary);
    }
    /**
     * Return a dimension with the matching plain text name, if one exists.
     * @param name A plain text name to match
     * @returns The matching `Dimension`
     */
    public static get(name: string): Dimension | undefined {
        return this.dictionary[name];
    }
    /**
     * Create a new base dimension.
     * @param name The unique name for this `Dimension`
     * @param symbol The mathematic symbol for this `Dimension`
     */
    constructor(private readonly name: string, private readonly symbol: string) {
        if (Dimension.dictionary[name]) {
            throw new AlreadyExistsError('Dimension', name);
        } else {
            Dimension.dictionary[name] = this;
        }
    }
    /**
     * Generate and return a string representation of this dimension.
     * @param type The type of string to return
     * @returns A string representation of this `Dimension`
     */
    public toString(type: 'plain' | 'LaTeX' = 'plain'): string {
        if (type === 'plain') {
            return this.name;
        } else {
            return '\\textbf{' + this.symbol + '}';
        }
    }
}