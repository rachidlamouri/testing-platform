import { NonEmptyTuple, Tuple } from './tuple';

/**
 * A placeholder for anything. This is used when the data type doesn't matter or is parameterized.
 */
export type Straline = unknown;

export type StralineTuple = Tuple<Straline>;

export type NonEmptyStralineTuple = NonEmptyTuple<Straline>;

export type StralineObject = object;
