import { ProgrammedTransform2 } from '../../core/types/programmed-transform/programmedTransform';
import { LeftInputItemStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/leftInputStreamConnectionMetatype';
import { OutputStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/outputStreamConnectionMetatype';
import { RightInputCollectionStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/rightInputStreamConnectionMetatype';
import { runEngine2 } from '../../core/engine/runEngine';
import { InMemoryCollection } from '../../layer-agnostic-utilities/collection/inMemoryCollection';
import { StandardInMemoryStreamMetatype } from '../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import { AbstractSerializableStreamMetatype } from '../../layer-agnostic-utilities/collection/abstractSerializableCollection';
import { buildAddMetadataForSerialization } from '../../layer-agnostic-utilities/programmed-transform/buildAddMetadataForSerialization';
import { SerializableCollection } from '../../layer-agnostic-utilities/collection/serializableCollection';

type Collection1StreamMetatype = StandardInMemoryStreamMetatype<
  'voictent-1',
  number
>;
type Collection2StreamMetatype = StandardInMemoryStreamMetatype<
  'voictent-2',
  string
>;
type Collection3StreamMetatype = StandardInMemoryStreamMetatype<
  'voictent-3',
  string
>;
type SerializedStreamMetatype =
  AbstractSerializableStreamMetatype<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-joining-one-to-voictent',
});

/**
 * Joins each item in the left collection to the entire right collection
 */
const gatherCollection: ProgrammedTransform2<
  LeftInputItemStreamConnectionMetatype<Collection1StreamMetatype>,
  [RightInputCollectionStreamConnectionMetatype<Collection2StreamMetatype>],
  OutputStreamConnectionMetatype<[Collection3StreamMetatype]>
> = {
  version: 2,
  name: 'gatherCollection',
  leftInputStreamConfiguration: {
    collectionId: 'voictent-1',
    isCollectionStream: false,
  },
  rightInputStreamConfigurationTuple: [
    {
      collectionId: 'voictent-2',
      isCollectionStream: true,
      getRightKeyTuple: undefined,
      getRightKey: undefined,
    },
  ],
  outputStreamConfiguration: {
    collectionIdTuple: ['voictent-3'],
  },
  transform: (leftInput, rightInput) => {
    const serializedRightInput = `[${rightInput.join(', ')}]`;

    const output = `${leftInput.item}-${serializedRightInput}`;

    return {
      'voictent-3': [output],
    };
  },
};

/**
 * Tests joining each item in the left collection to the entire right collection
 *
 * @todo debug the program snapshot for this one. The output collection appears to be out of the expected order (1, 2). Which is ok, but I want to know why.
 *
 * @canonicalComment
 *
 * @readableName testJoiningOneItemToCollection
 */
runEngine2({
  inputCollectionList: [
    new InMemoryCollection<Collection1StreamMetatype>({
      collectionId: 'voictent-1',
      initialItemEggTuple: [1, 2],
    }),
    new InMemoryCollection<Collection2StreamMetatype>({
      collectionId: 'voictent-2',
      initialItemEggTuple: ['a', 'b', 'c', 'd'],
    }),
    new InMemoryCollection<Collection3StreamMetatype>({
      collectionId: 'voictent-3',
      initialItemEggTuple: [],
    }),
    new SerializableCollection<SerializedStreamMetatype>({
      collectionId: 'serialized',
      programFileCache,
      initialItemEggTuple: [],
    }),
  ],
  programmedTransformTuple: [
    gatherCollection,

    buildAddMetadataForSerialization<
      Collection3StreamMetatype,
      SerializedStreamMetatype
    >({
      inputCollectionId: 'voictent-3',
      outputCollectionId: 'serialized',
    }),
  ],
  onFinish: (runtimeStatistics) => {
    programFileCache.writeRuntimeSnapshot(runtimeStatistics);
  },
});
