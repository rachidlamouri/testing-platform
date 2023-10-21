import { InMemoryIdentifiableItem3StreamMetatype } from '../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

/**
 * A data structure to snapshot when testing if a utility can detect the right
 * type of some input data. It doesn't actually contain the input data itself
 * because it bloats the snapshot.
 */
type SerializableTypeName = {
  id: string;
  // TODO: this structure is dumb but it will break a snapshot test, so fix it later
  subitem: {
    typeName: string;
  };
};

export const SERIALIZABLE_TYPE_NAME_COLLECTION_ID = 'serializable-type-name';

type SerializableTypeNameCollectionId =
  typeof SERIALIZABLE_TYPE_NAME_COLLECTION_ID;

export type SerializableTypeNameStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    SerializableTypeNameCollectionId,
    SerializableTypeName
  >;
