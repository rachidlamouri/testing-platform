import { InMemoryOdeshinVoque } from '../core/engine/inMemoryOdeshinVoictent';
import { Grition } from '../custom/adapter/grition';
import { OdeshinFromGrition } from '../custom/adapter/odeshin';

export type SerializableTypeName = {
  typeName: string;
};

export type SerializableTypeNameGrition = Grition<SerializableTypeName>;

export type SerializableTypeNameOdeshin =
  OdeshinFromGrition<SerializableTypeNameGrition>;

export const SERIALIZABLE_TYPE_NAME_GEPP = 'serializable-type-name';

export type SerializableTypeNameGepp = typeof SERIALIZABLE_TYPE_NAME_GEPP;

export type SerializableTypeNameVoque = InMemoryOdeshinVoque<
  SerializableTypeNameGepp,
  SerializableTypeNameOdeshin
>;
