import { Dimension } from './dimension';
import { factor } from './lib';
import { AlreadyExistsError, Factors, NotFoundError } from './types';

export class Attribute {
    /**
     * Contains a dictionary of all created attributes.
     */
    private static readonly dictionary: { [name: string]: Attribute } = {};
    /**
     * Return a list of valid atribute plain text names.
     * @returns A list of names for all attributes
     */
    public static getNames(): Array<string> {
        return Object.keys(this.dictionary);
    }
    /**
     * Return an attribute with the matching plain text name, if one exists.
     * @param name A plain text name to match
     * @returns The matching `Attribute`
     */
    public static get(name: string): Attribute | undefined {
        return this.dictionary[name];
    }
    /**
     * The base physical dimensions for this attribute.
     */
    private readonly baseDimensions: Factors = {};
    /**
     * Numerator
     */
    private readonly num: Factors = {};
    /**
     * Denominator
     */
    private readonly den: Factors = {};
    /**
     * Create a new attribute.
     * @param name The unique name for this attribute
     * @param symbol The mathematical symbol for this attribute
     * @param baseDimensionOrAttributeFactors Either the base dimension name as a string, or the makeup of attribute factors and their exponents
     */
    constructor(private readonly name: string, private readonly symbol: string, baseDimensionOrAttributeFactors: string | Factors) {
        if (Attribute.get(name)) {
            throw new AlreadyExistsError('Attribute', name);
        } else {
            Attribute.dictionary[name] = this;
        }
        if (typeof baseDimensionOrAttributeFactors === 'string') {
            const baseDimension = Dimension.get(baseDimensionOrAttributeFactors);
            if (baseDimension) {
                this.baseDimensions[baseDimension.toString('plain')] = 1;
            } else {
                throw new NotFoundError('Dimension', baseDimensionOrAttributeFactors);
            }
        } else {
            for (const attributeName in baseDimensionOrAttributeFactors) {
                if (name === attributeName) {
                    throw new Error('Recursive loop detected in attribute factors.');
                }
                const attribute = Attribute.get(attributeName);
                if (!attribute) {
                    throw new NotFoundError('Attribute', attributeName);
                }
                const attributeExponent: number = baseDimensionOrAttributeFactors[attributeName];
                for (const dimensionName in attribute.baseDimensions) {
                    const dimensionExponent: number = attribute.baseDimensions[dimensionName];
                    this.baseDimensions[dimensionName] = (this.baseDimensions[dimensionName] ?? 0) + attributeExponent * dimensionExponent;
                }
            }
        }
        for (const dimensionName in this.baseDimensions) {
            const dimension = Dimension.get(dimensionName);
            if (!dimension) {
                throw new NotFoundError('Dimension', dimensionName);
            }
            const exponent: number = this.baseDimensions[dimensionName];
            if (exponent > 0) {
                this.num[dimensionName] = exponent;
            } else if (exponent < 0) {
                this.den[dimensionName] = -exponent;
            }
        }
    }
    public toString(type: 'plain' | 'LaTeX' | 'Dimensions-LaTeX' = 'plain'): string {
        switch (type) {
            case ('plain'): {
                return this.name;
            }
            case ('LaTeX'): {
                return this.symbol;
            }
            case ('Dimensions-LaTeX'): {
                let numerator: string = '',
                    denominator: string = '';
                for (const dimensionName in this.num) {
                    const dimension = Dimension.get(dimensionName),
                        exponent: number = this.num[dimensionName];
                    if (!dimension) {
                        throw new NotFoundError('Dimension', dimensionName);
                    }
                    if (numerator) {
                        numerator += '\\cdot';
                    }
                    numerator += factor(dimension.toString('LaTeX'), exponent);
                }
                for (const dimensionName in this.den) {
                    const dimension = Dimension.get(dimensionName),
                        exponent: number = this.den[dimensionName];
                    if (!dimension) {
                        throw new NotFoundError('Dimension', dimensionName);
                    }
                    if (denominator) {
                        denominator += '\\cdot';
                    }
                    denominator += factor(dimension.toString('LaTeX'), exponent);
                }
                if (denominator) {
                    return '\\frac{' + (numerator || '1') + '}{' + denominator + '}';
                } else {
                    return numerator || '1';
                }
            }
        }
    }
    public getBaseDimensions(): Factors {
        return JSON.parse(JSON.stringify(this.baseDimensions));
    }
}