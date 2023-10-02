/**
 * A heterogenous list where the order matters.
 */
export type Tuple<T> = readonly T[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnsafeTuple = Tuple<any>;

export type NonEmptyTuple<T> = readonly [T, ...T[]];
