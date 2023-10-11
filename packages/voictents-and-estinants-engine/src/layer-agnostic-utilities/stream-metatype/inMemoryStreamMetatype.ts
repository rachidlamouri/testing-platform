import { Merge } from 'type-fest';
import { Item } from '../../core/types/hubblepup/hubblepup';
import { CollectionId } from '../../core/types/voictent/gepp';
import { StreamMetatype } from '../../core/types/voque/voque';
import { AbstractSerializableIndexByName } from '../voictent/abstractSerializableVoictent';

export type InMemoryIndexByName = Merge<
  AbstractSerializableIndexByName,
  {
    listIndex: number;
  }
>;

/**
 * Definese the type information needed to collect and stream data in memory
 *
 * @readableName InMemoryStreamMetatype
 */
export type InMemoryStreamMetatype<
  TCollectionId extends CollectionId,
  TItemEgg extends Item,
  TItem extends Item,
  TIndexByName extends InMemoryIndexByName,
  TCollection,
> = StreamMetatype<TCollectionId, TItemEgg, TItem, TIndexByName, TCollection>;

export type StandardInMemoryStreamMetatype<
  TCollectionId extends CollectionId,
  TItem extends Item,
> = InMemoryStreamMetatype<
  TCollectionId,
  TItem,
  TItem,
  InMemoryIndexByName,
  TItem[]
>;

export type GenericStandardInMemoryStreamMetatype =
  StandardInMemoryStreamMetatype<CollectionId, Item>;

export type GenericInMemoryStreamMetatype = InMemoryStreamMetatype<
  CollectionId,
  Item,
  Item,
  InMemoryIndexByName,
  // TODO: this "unknown" is problematic. It allows a program to specify a
  // collection whose collection stream will not satisfy the constraints of a
  // transform that uses the correct metastream type
  unknown
>;
