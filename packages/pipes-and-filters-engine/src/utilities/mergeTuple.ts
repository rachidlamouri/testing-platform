import { SimplifyObject } from './simplifyObject';

type RecursivelyMergeTuple<TTuple extends readonly unknown[]> = TTuple extends [
  infer TOnlyItem,
]
  ? TOnlyItem
  : TTuple extends [infer TFirstItem, ...infer TRestItems]
  ? TFirstItem extends object
    ? TFirstItem & RecursivelyMergeTuple<TRestItems>
    : object
  : object;

export type MergeTuple<TTuple extends readonly unknown[]> = SimplifyObject<
  RecursivelyMergeTuple<TTuple>
>;
