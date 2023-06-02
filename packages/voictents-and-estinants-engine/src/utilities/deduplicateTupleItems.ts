import { Tuple } from './semantic-types/tuple';

export type DeduplicateTupleItems<
  TTuple extends Tuple<unknown>,
  TDeduplicatedTuple extends Tuple<unknown> = [],
> = TTuple extends readonly [
  infer TFirst,
  ...infer TRest extends Tuple<unknown>,
]
  ? TFirst extends TDeduplicatedTuple[number]
    ? DeduplicateTupleItems<TRest, TDeduplicatedTuple>
    : DeduplicateTupleItems<TRest, [...TDeduplicatedTuple, TFirst]>
  : TDeduplicatedTuple;
