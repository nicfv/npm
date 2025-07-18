/**
 * Represents the makeup of a compound using plain text names of its factors and their exponents.
 */
export interface Factors {
    /**
     * This represents a factor within the compound and its corresponding exponent.
     */
    [plain: string]: number;
}

/**
 * Create a new error type for items already created.
 */
export class AlreadyExistsError extends Error {
    constructor(className: string, itemName: string) {
        super(className + ' "' + itemName + '" already exists.');
    }
}

/**
 * Create a new error type for items not found.
 */
export class NotFoundError extends Error {
    constructor(className: string, itemName: string) {
        super(className + ' "' + itemName + '" not found.');
    }
}