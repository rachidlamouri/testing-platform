import { UnionToIntersection } from 'type-fest';

/**
 * Merges two objects without making the intellisense do something dumb, unlike
 * type-fest. Maybe one day we won't need this
 */
export type Simplify<T1 extends object, T2 extends object> = {
  [Key in keyof (T1 & T2)]: (T1 & T2)[Key];
};

/**
 * Same description as Simplify, but for N objects
 */
export type SimplifyN<TObjectList extends readonly object[]> = {
  [Key in keyof UnionToIntersection<TObjectList[number]>]: UnionToIntersection<
    TObjectList[number]
  >[Key];
};
