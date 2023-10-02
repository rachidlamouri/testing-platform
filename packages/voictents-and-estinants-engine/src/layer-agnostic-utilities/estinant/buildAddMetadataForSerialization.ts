import { Estinant2 } from '../../core/types/estinant/estinant';
import { LeftInputHubblepupVicken } from '../../core/types/vicken/leftInputVicken';
import { OutputVicken } from '../../core/types/vicken/outputVicken';
import {
  GenericAbstractSerializableSourceVoque,
  GenericAbstractSerializableVoque,
  IndexedAbstractSerializable,
  AbstractSerializable,
} from '../voictent/abstractSerializableVoictent';

type SerializerBuilderInput<
  TInputVoictent extends GenericAbstractSerializableSourceVoque,
  TOutputVoictent extends GenericAbstractSerializableVoque,
> = {
  inputGepp: TInputVoictent['gepp'];
  outputGepp: TOutputVoictent['gepp'];
};

/**
 * Constructs an estinant that takes a serializeable input, normalizes it, and
 * sends it to a compatible output stream
 */
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
