import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { TypeScriptObject } from '../../../package-agnostic-utilities/object/typeScriptObject';

/**
 * The thing that a programmer operates on by streaming it between collections
 * and transforms.
 *
 * It is of type "unknown" because it can be anything!
 *
 * @readableName Item
 *
 * @canonicalDeclaration
 */
export type Item = unknown;

// TODO: make this one the canonical declaration
type Item2<TItem> = TItem;

export type GenericItem = Item2<unknown>;

export type ItemTuple = readonly Item[];

export type ItemIndexByName = TypeScriptObject;

export type IndexedItem<
  TItem extends Item,
  TIndexByName extends ItemIndexByName,
> = {
  indexByName: TIndexByName;
  item: TItem;
};

export type GenericIndexedItem = IndexedItem<Item, ItemIndexByName>;

export type GenericIndexedItemTuple = Tuple<GenericIndexedItem>;
