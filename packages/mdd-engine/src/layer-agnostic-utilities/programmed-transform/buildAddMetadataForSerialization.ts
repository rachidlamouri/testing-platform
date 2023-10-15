import { ProgrammedTransform2 } from '../../core/types/programmed-transform/programmedTransform';
import { LeftInputItemStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/leftInputStreamConnectionMetatype';
import { OutputStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/outputStreamConnectionMetatype';
import {
  GenericAbstractSerializableSourceStreamMetatype,
  GenericAbstractSerializableStreamMetatype,
  IndexedAbstractSerializable,
  AbstractSerializable,
} from '../collection/abstractSerializableCollection';

type SerializerBuilderInput<
  TInputCollection extends GenericAbstractSerializableSourceStreamMetatype,
  TOutputCollection extends GenericAbstractSerializableStreamMetatype,
> = {
  inputCollectionId: TInputCollection['collectionId'];
  outputCollectionId: TOutputCollection['collectionId'];
};

/**
 * Constructs an estinant that takes a serializeable input, normalizes it, and
 * sends it to a compatible output stream
 */
export const buildAddMetadataForSerialization = <
  TInputCollection extends GenericAbstractSerializableSourceStreamMetatype,
  TOutputCollection extends GenericAbstractSerializableStreamMetatype,
>({
  inputCollectionId,
  outputCollectionId,
}: SerializerBuilderInput<
  TInputCollection,
  TOutputCollection
>): ProgrammedTransform2<
  LeftInputItemStreamConnectionMetatype<GenericAbstractSerializableSourceStreamMetatype>,
  [],
  OutputStreamConnectionMetatype<[GenericAbstractSerializableStreamMetatype]>
> => {
  const addMetadataForSerialization: ProgrammedTransform2<
    LeftInputItemStreamConnectionMetatype<GenericAbstractSerializableSourceStreamMetatype>,
    [],
    OutputStreamConnectionMetatype<[GenericAbstractSerializableStreamMetatype]>
  > = {
    version: 2,
    name: `serialize/${inputCollectionId}`,
    leftInputStreamConfiguration: {
      collectionId: inputCollectionId,
      isCollectionStream: false,
    },
    rightInputStreamConfigurationTuple: [],
    outputStreamConfiguration: {
      collectionIdTuple: [outputCollectionId],
    },
    transform: (rawInput) => {
      const indexedSerializable = rawInput as IndexedAbstractSerializable;

      const outputItem: AbstractSerializable = {
        sourceCollectionId: inputCollectionId,
        serializableId: indexedSerializable.indexByName.serializableId,
        datum: indexedSerializable.item,
      };

      return {
        [outputCollectionId]: [outputItem],
      };
    },
  };

  return addMetadataForSerialization;
};
