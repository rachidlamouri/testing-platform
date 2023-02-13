import { StralineTuple } from '../core/straline';

type RecursivelyMergeTuple<TTuple extends StralineTuple> = TTuple extends [
  infer TOnlyItem,
]
  ? TOnlyItem
  : TTuple extends [infer TFirstItem, ...infer TRestItems]
  ? TFirstItem & RecursivelyMergeTuple<TRestItems>
  : never;

export type MergeTuple<TTuple extends StralineTuple> =
  RecursivelyMergeTuple<TTuple>;
