import { Estinant2 } from '../../core/types/estinant/estinant';
import { LeftInputHubblepupVicken } from '../../core/types/vicken/leftInputVicken';
import { OutputVicken } from '../../core/types/vicken/outputVicken';
import {
  GenericAbstractSerializableSourceStreamMetatype,
  GenericAbstractSerializableStreamMetatype,
  IndexedAbstractSerializable,
  AbstractSerializable,
} from '../collection/abstractSerializableCollection';

type SerializerBuilderInput<
  TInputVoictent extends GenericAbstractSerializableSourceStreamMetatype,
  TOutputVoictent extends GenericAbstractSerializableStreamMetatype,
> = {
  inputGepp: TInputVoictent['gepp'];
  outputGepp: TOutputVoictent['gepp'];
};

/**
 * Constructs an estinant that takes a serializeable input, normalizes it, and
 * sends it to a compatible output stream
 */
export const buildAddMetadataForSerialization = <
  TInputVoictent extends GenericAbstractSerializableSourceStreamMetatype,
  TOutputVoictent extends GenericAbstractSerializableStreamMetatype,
>({
  inputGepp,
  outputGepp,
}: SerializerBuilderInput<TInputVoictent, TOutputVoictent>): Estinant2<
  LeftInputHubblepupVicken<GenericAbstractSerializableSourceStreamMetatype>,
  [],
  OutputVicken<[GenericAbstractSerializableStreamMetatype]>
> => {
  const addMetadataForSerialization: Estinant2<
    LeftInputHubblepupVicken<GenericAbstractSerializableSourceStreamMetatype>,
    [],
    OutputVicken<[GenericAbstractSerializableStreamMetatype]>
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
        sourceCollectionId: inputGepp,
        serializableId: indexedSerializable.indexByName.serializableId,
        datum: indexedSerializable.item,
      };

      return {
        [outputGepp]: [outputHubblepup],
      };
    },
  };

  return addMetadataForSerialization;
};
