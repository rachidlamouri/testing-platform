import { InMemoryIdentifiableItem2ListStreamMetatype } from '../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

/**
 * A data structure to snapshot when testing if a utility can detect the right
 * type of some input data. It doesn't actually contain the input data itself
 * because it bloats the snapshot.
 */
type SerializableTypeName = {
  zorn: string;
  // TODO: this structure is dumb but it will break a snapshot test, so fix it later
  grition: {
    typeName: string;
  };
};

export const SERIALIZABLE_TYPE_NAME_GEPP = 'serializable-type-name';

type SerializableTypeNameGepp = typeof SERIALIZABLE_TYPE_NAME_GEPP;

export type SerializableTypeNameVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    SerializableTypeNameGepp,
    SerializableTypeName
  >;
