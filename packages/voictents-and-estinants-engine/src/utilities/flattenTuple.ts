import { StralineTuple } from './semantic-types/straline';

export type FlattenTuple<T extends StralineTuple> = T extends readonly [
  infer TFirst extends StralineTuple,
  ...infer TRest,
]
  ? [...TFirst, ...FlattenTuple<TRest>]
  : [];
