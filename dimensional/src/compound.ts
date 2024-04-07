import { NumberDictionary } from './lib';

export class Compound<Names extends string, Abbreviations extends string> {
    constructor(private readonly exponents: NumberDictionary<Names>) { }
    public mult(other: Compound<Names, Abbreviations>): Compound<Names, Abbreviations> {
        const exponents_combined: NumberDictionary<Names> = {};
        for (const name in this.exponents) {
            exponents_combined[name] = (this.exponents[name] ?? 0);
        }
        for (const name in other.exponents) {
            exponents_combined[name] = (exponents_combined[name] ?? 0) + (other.exponents[name] ?? 0);
        }
        return new Compound<Names, Abbreviations>(exponents_combined);
    }
}