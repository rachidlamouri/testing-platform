import { Hubblepup2 } from '../core/engine-shell/quirm/hubblepup';
import { InMemoryVoque } from '../core/engine/inMemoryVoictent';

export type SerializableTypeName = {
  typeName: string;
};

export type SerializableTypeNameHubblepup = Hubblepup2<SerializableTypeName>;

// TODO: change to "serializable-type-name"
export const SERIALIZABLE_TYPE_NAME_GEPP = 'typed-datum';

export type SerializableTypeNameGepp = typeof SERIALIZABLE_TYPE_NAME_GEPP;

export type SerializableTypeNameVoque = InMemoryVoque<
  SerializableTypeNameGepp,
  unknown
>;
