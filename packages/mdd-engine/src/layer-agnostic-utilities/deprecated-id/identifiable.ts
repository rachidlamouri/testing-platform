import { Merge } from 'type-fest';
import { StreamMetatype } from '../../core/types/stream-metatype/streamMetatype';
import { AbstractSerializableIndexByName } from '../collection/abstractSerializableCollection';
import { CollectionId } from '../../core/types/collection/collectionId';
import { Item } from '../../core/types/item/item';

/**
 * An identifiable object.
 *
 * @todo switch to using ComplexId for the identifier
 *
 * @readableName Identifiable
 */
export type Identifiable = {
  id: string;
};

type IdentifiableIndexByName = Merge<
  AbstractSerializableIndexByName,
  Identifiable
>;

export type IdentifiableStreamMetatype<
  TCollectionId extends CollectionId,
  TItemEgg extends Item,
  TItem extends Item,
  TCollection,
> = StreamMetatype<
  TCollectionId,
  TItemEgg,
  TItem,
  IdentifiableIndexByName,
  TCollection
>;
