import { InMemoryOdeshin2ListVoque } from '../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';

type SerializableTypeName = {
  zorn: string;
  // TODO: this structure is dumb but it will break a snapshot test, so fix it later
  grition: {
    typeName: string;
  };
};

export const SERIALIZABLE_TYPE_NAME_GEPP = 'serializable-type-name';

type SerializableTypeNameGepp = typeof SERIALIZABLE_TYPE_NAME_GEPP;

export type SerializableTypeNameVoque = InMemoryOdeshin2ListVoque<
  SerializableTypeNameGepp,
  SerializableTypeName
>;
