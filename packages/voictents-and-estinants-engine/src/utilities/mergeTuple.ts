import { Simplify } from './simplify';

type RecursivelyMergeTuple<TTuple extends readonly unknown[]> = TTuple extends [
  infer TOnlyItem,
]
  ? TOnlyItem
  : TTuple extends [infer TFirstItem, ...infer TRestItems]
  ? TFirstItem & RecursivelyMergeTuple<TRestItems>
  : never;

export type MergeTuple<TTuple extends readonly unknown[]> = Simplify<
  RecursivelyMergeTuple<TTuple>
>;
