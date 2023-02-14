import { QuirmTuple, QuirmTupleTuple } from '../core/quirm';
import { MergeTuple } from '../utilities/mergeTuple';
import { OptionTuple } from '../utilities/optionTuple';

/**
 * A collection where only one Quirm is expected to be used, and not the collection as a whole
 */
export type QuirmOptionTuple<TQuirmTuple extends QuirmTuple = QuirmTuple> =
  OptionTuple<TQuirmTuple>;

export type QuirmOption<TQuirmOptionTuple extends QuirmOptionTuple> =
  TQuirmOptionTuple[number];

export type QuirmOptionTupleToGeppOptionTuple<
  TQuirmOptionTuple extends QuirmOptionTuple,
> = {
  [Index in keyof TQuirmOptionTuple]: TQuirmOptionTuple[Index]['geppTuple'][number];
};

export type QuirmOptionTupleToGeppOptionIntersection<
  TQuirmOptionTuple extends QuirmOptionTuple,
> = MergeTuple<QuirmOptionTupleToGeppOptionTuple<TQuirmOptionTuple>>;

/**
 * A collection of collections where only one Quirm in each collection is expected to be used, and not each collection as a whole
 */
export type QuirmOptionTupleTuple<
  TQuirmTupleTuple extends QuirmTupleTuple = QuirmTupleTuple,
> = TQuirmTupleTuple;

export type QuirmOptionTupleTupleToQuirmTuple<
  TQuirmOptionTupleTuple extends QuirmOptionTupleTuple,
> = {
  [Index in keyof TQuirmOptionTupleTuple]: QuirmOption<
    TQuirmOptionTupleTuple[Index]
  >;
};

export type QuirmOptionTupleTupleToGeppOptionIntersectionTuple<
  TQuirmOptionTupleTuple extends QuirmOptionTupleTuple,
> = {
  [Index in keyof TQuirmOptionTupleTuple]: QuirmOptionTupleToGeppOptionIntersection<
    TQuirmOptionTupleTuple[Index]
  >;
};
