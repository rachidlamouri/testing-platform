import { Tuple } from './semantic-types/tuple';

export type FlattenTuple<T extends Tuple<unknown>> = T extends readonly [
  infer TFirst extends Tuple<unknown>,
  ...infer TRest,
]
  ? [...TFirst, ...FlattenTuple<TRest>]
  : [];
