import { StralineTuple } from '../core/straline';
import { Simplify } from './simplify';

type RecursivelyMergeTuple<TTuple extends StralineTuple> = TTuple extends [
  infer TOnlyItem,
]
  ? TOnlyItem
  : TTuple extends [infer TFirstItem, ...infer TRestItems]
  ? TFirstItem & RecursivelyMergeTuple<TRestItems>
  : never;

export type MergeTuple<TTuple extends StralineTuple> = Simplify<
  RecursivelyMergeTuple<TTuple>
>;
