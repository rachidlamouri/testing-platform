import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { Item, ItemIndexByName, IndexedItem } from '../item/item';
import { CollectionId } from '../collection/collectionId';

/**
 * The type information needed to define a strongly typed stream connection,
 * transform input, transform output, or collection without tightly coupling their
 * instances.
 *
 * @readableName StreamMetatype
 *
 * @canonicalDeclaration
 */
export type StreamMetatype<
  TCollectionId extends CollectionId,
  TItemEgg extends Item,
  TItem extends Item,
  IndexByName extends ItemIndexByName,
  TCollectionStreamable,
> = {
  collectionId: TCollectionId;
  indexByName: IndexByName;
  itemEggStreamable: TItemEgg;
  itemStreamable: TItem;
  indexedItemStreamable: IndexedItem<TItem, IndexByName>;
  collectionStreamable: TCollectionStreamable;
};

export type GenericStreamMetatype = StreamMetatype<
  CollectionId,
  Item,
  Item,
  ItemIndexByName,
  unknown
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnsafeStreamMetatype = StreamMetatype<any, any, any, any, any>;

export type GenericStreamMetatypeTuple = Tuple<GenericStreamMetatype>;

export type UnsafeStreamMetatypeTuple = Tuple<UnsafeStreamMetatype>;
