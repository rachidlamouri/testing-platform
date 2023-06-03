import { Tuple } from './semantic-types/tuple';

export type FilterTupleByRejectionUnion<
  TTuple extends Tuple<unknown>,
  TRejectionUnion,
> = TTuple extends readonly [
  infer TFirst,
  ...infer TRest extends Tuple<unknown>,
]
  ? TFirst extends TRejectionUnion
    ? FilterTupleByRejectionUnion<TRest, TRejectionUnion>
    : [TFirst, ...FilterTupleByRejectionUnion<TRest, TRejectionUnion>]
  : [];

export type FilterTupleByAcceptanceUnion<
  TTuple extends Tuple<unknown>,
  TAcceptanceUnion,
> = TTuple extends readonly [
  infer TFirst,
  ...infer TRest extends Tuple<unknown>,
]
  ? TFirst extends TAcceptanceUnion
    ? [TFirst, ...FilterTupleByAcceptanceUnion<TRest, TAcceptanceUnion>]
    : FilterTupleByAcceptanceUnion<TRest, TAcceptanceUnion>
  : [];
