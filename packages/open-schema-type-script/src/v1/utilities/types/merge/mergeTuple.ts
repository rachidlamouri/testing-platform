import { Simplify } from '../simplify/simplify';
import { UnknownTuple } from '../unknownHelpers';

type RecursivelyMergedTuple<TTuple extends UnknownTuple> = TTuple extends [
  infer TOnlyItem,
]
  ? TOnlyItem
  : TTuple extends [infer TFirstItem, ...infer TRestItems]
  ? TFirstItem & RecursivelyMergedTuple<TRestItems>
  : never;

export type MergeTuple<TTuple extends UnknownTuple> = Simplify<
  RecursivelyMergedTuple<TTuple>
>;
