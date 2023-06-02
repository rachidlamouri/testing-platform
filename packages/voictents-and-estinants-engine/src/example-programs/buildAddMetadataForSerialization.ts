import { Estinant2 } from '../core/engine-shell/estinant/estinant';
import { LeftInputHubblepupVicken } from '../core/engine-shell/vicken/leftInputVicken';
import { OutputVicken } from '../core/engine-shell/vicken/outputVicken';
import {
  GenericAbstractSerializableSourceVoque,
  GenericAbstractSerializableVoque,
  IndexedAbstractSerializable,
  AbstractSerializable,
} from './abstractSerializableVoictent';

type SerializerBuilderInput<
  TInputVoictent extends GenericAbstractSerializableSourceVoque,
  TOutputVoictent extends GenericAbstractSerializableVoque,
> = {
  inputGepp: TInputVoictent['gepp'];
  outputGepp: TOutputVoictent['gepp'];
};

export const buildAddMetadataForSerialization = <
  TInputVoictent extends GenericAbstractSerializableSourceVoque,
  TOutputVoictent extends GenericAbstractSerializableVoque,
>({
  inputGepp,
  outputGepp,
}: SerializerBuilderInput<TInputVoictent, TOutputVoictent>): Estinant2<
  LeftInputHubblepupVicken<GenericAbstractSerializableSourceVoque>,
  [],
  OutputVicken<[GenericAbstractSerializableVoque]>
> => {
  const addMetadataForSerialization: Estinant2<
    LeftInputHubblepupVicken<GenericAbstractSerializableSourceVoque>,
    [],
    OutputVicken<[GenericAbstractSerializableVoque]>
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
      const indexedSerializable = rawInput as IndexedAbstractSerializable;

      const outputHubblepup: AbstractSerializable = {
        sourceGepp: inputGepp,
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
