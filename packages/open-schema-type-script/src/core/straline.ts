/**
 * A placeholder for anything. This is used when the data type doesn't matter or is parameterized.
 */
export type Straline = unknown;

export type StralineTuple = readonly Straline[];

/**
 * The engine's specific implementation of "null".
 * This prevents the engine from conflating the purpose of TypeScript's "null" and "undefined" with the engine's need to know if something is "null".
 * This value should not be used by a Programmer.
 */
export const NULL_STRALINE = Symbol('null-straline');

export type NullStraline = typeof NULL_STRALINE;
