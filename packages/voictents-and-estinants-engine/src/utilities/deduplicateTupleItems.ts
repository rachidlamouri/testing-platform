import { StralineTuple } from './semantic-types/straline';

export type DeduplicateTupleItems<
  TTuple extends StralineTuple,
  TDeduplicatedTuple extends StralineTuple = [],
> = TTuple extends readonly [infer TFirst, ...infer TRest extends StralineTuple]
  ? TFirst extends TDeduplicatedTuple[number]
    ? DeduplicateTupleItems<TRest, TDeduplicatedTuple>
    : DeduplicateTupleItems<TRest, [...TDeduplicatedTuple, TFirst]>
  : TDeduplicatedTuple;
