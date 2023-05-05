import { Estinant } from '../core/engine-shell/estinant/estinant';
import { GenericIndexedHubblepup } from '../core/engine-shell/quirm/hubblepup';
import { Quirm } from '../core/engine-shell/quirm/quirm';
import {
  GenericSerializableSourceVoque,
  GenericSerializableVoque,
  IndexedSerializable,
  Serializable,
} from './serializableVoictent';

export type SerializerBuilderInput<
  TInputVoictent extends GenericSerializableSourceVoque,
  TOutputVoictent extends GenericSerializableVoque,
> = {
  inputGepp: TInputVoictent['gepp'];
  outputGepp: TOutputVoictent['gepp'];
};

export const buildAddMetadataForSerialization = <
  TInputVoictent extends GenericSerializableSourceVoque,
  TOutputVoictent extends GenericSerializableVoque,
>({
  inputGepp,
  outputGepp,
}: SerializerBuilderInput<TInputVoictent, TOutputVoictent>): Estinant => {
  const addMetadataForSerialization: Estinant = {
    name: `serialize/${inputGepp}`,
    leftAppreffinge: {
      gepp: inputGepp,
      isWibiz: false,
    },
    rightAppreffingeTuple: [],
    tropoig: (rawInput: GenericIndexedHubblepup) => {
      const indexedSerializable = rawInput as IndexedSerializable;

      const outputHubblepup: Serializable = {
        gepp: inputGepp,
        serializableId: indexedSerializable.indexByName.serializableId,
        datum: indexedSerializable.hubblepup,
      };

      const outputQuirm: Quirm = {
        gepp: outputGepp,
        hubblepup: outputHubblepup,
      };

      return [outputQuirm];
    },
  };

  return addMetadataForSerialization;
};
