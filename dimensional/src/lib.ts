/**
 * Represents a type where every object value is a string.
 */
export type Dictionary<T extends string> = { [index in T]: string };
/**
 * Represents a type where every object value is a number.
 */
export type NumberDictionary<T extends string> = { [index in T]?: number };