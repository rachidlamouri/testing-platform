export type Tuple<T = unknown> = readonly T[];

export type NonEmptyTuple<T = unknown> = readonly [T, ...T[]];
