import { InMemoryOdeshin2Voque } from '../core/engine/inMemoryOdeshinVoictent2';
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

export type SerializableTypeNameVoque = InMemoryOdeshin2Voque<
  SerializableTypeNameGepp,
  SerializableTypeNameOdeshin
>;
