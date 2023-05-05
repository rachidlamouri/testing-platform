import { Estinant2 } from '../core/engine-shell/estinant/estinant';
import { LeftInputHubblepupVicken } from '../core/engine-shell/vicken/leftInputVicken';
import { OutputVicken } from '../core/engine-shell/vicken/outputVicken';
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
}: SerializerBuilderInput<TInputVoictent, TOutputVoictent>): Estinant2<
  LeftInputHubblepupVicken<GenericSerializableSourceVoque>,
  [],
  OutputVicken<[GenericSerializableVoque]>
> => {
  const addMetadataForSerialization: Estinant2<
    LeftInputHubblepupVicken<GenericSerializableSourceVoque>,
    [],
    OutputVicken<[GenericSerializableVoque]>
  > = {
    version: 2,
    name: `serialize/${inputGepp}`,
    leftInputAppreffinge: {
      gepp: inputGepp,
      isWibiz: false,
    },
    rightInputAppreffingeTuple: [],
    outputAppreffinge: {
      geppTuple: [outputGepp],
    },
    tropoig: (rawInput) => {
      const indexedSerializable = rawInput as IndexedSerializable;

      const outputHubblepup: Serializable = {
        gepp: inputGepp,
        serializableId: indexedSerializable.indexByName.serializableId,
        datum: indexedSerializable.hubblepup,
      };

      return {
        [outputGepp]: [outputHubblepup],
      };
    },
  };

  return addMetadataForSerialization;
};
