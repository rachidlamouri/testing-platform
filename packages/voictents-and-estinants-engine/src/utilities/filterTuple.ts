import { StralineTuple } from './semantic-types/straline';

export type FilterTupleByRejectionUnion<
  TTuple extends StralineTuple,
  TRejectionUnion,
> = TTuple extends readonly [infer TFirst, ...infer TRest extends StralineTuple]
  ? TFirst extends TRejectionUnion
    ? FilterTupleByRejectionUnion<TRest, TRejectionUnion>
    : [TFirst, ...FilterTupleByRejectionUnion<TRest, TRejectionUnion>]
  : [];

export type FilterTupleByAcceptanceUnion<
  TTuple extends StralineTuple,
  TAcceptanceUnion,
> = TTuple extends readonly [infer TFirst, ...infer TRest extends StralineTuple]
  ? TFirst extends TAcceptanceUnion
    ? [TFirst, ...FilterTupleByAcceptanceUnion<TRest, TAcceptanceUnion>]
    : FilterTupleByAcceptanceUnion<TRest, TAcceptanceUnion>
  : [];
