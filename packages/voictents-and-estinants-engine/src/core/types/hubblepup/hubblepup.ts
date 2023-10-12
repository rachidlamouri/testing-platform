import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { TypeScriptObject } from '../../../package-agnostic-utilities/object/typeScriptObject';

export type Item = unknown;

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
type Hubblepup2<THubblepup> = THubblepup;

export type GenericItem = Hubblepup2<unknown>;

export type HubblepupTuple = readonly Item[];

export type ItemIndexByName = TypeScriptObject;

export type IndexedItem<
  THubblepup extends Item,
  TIndexByName extends ItemIndexByName,
> = {
  indexByName: TIndexByName;
  item: THubblepup;
};

export type GenericIndexedHubblepup = IndexedItem<Item, ItemIndexByName>;

export type GenericIndexedHubblepupTuple = Tuple<GenericIndexedHubblepup>;
