import { ProgrammedTransform2 } from '../../core/types/programmed-transform/programmedTransform';
import { LeftInputCollectionStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/leftInputStreamConnectionMetatype';
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
  'collection-1',
  number
>;
type Collection2StreamMetatype = StandardInMemoryStreamMetatype<
  'collection-2',
  string
>;
type Collection3StreamMetatype = StandardInMemoryStreamMetatype<
  'collection-3',
  string
>;
type SerializedStreamMetatype =
  AbstractSerializableStreamMetatype<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-joining-collection-to-collection',
});

/**
 * Joins the entire left collection to the entire right collection
 */
const gatherCollection: ProgrammedTransform2<
  LeftInputCollectionStreamConnectionMetatype<Collection1StreamMetatype>,
  [RightInputCollectionStreamConnectionMetatype<Collection2StreamMetatype>],
  OutputStreamConnectionMetatype<[Collection3StreamMetatype]>
> = {
  name: 'gatherCollection',
  leftInputStreamConfiguration: {
    collectionId: 'collection-1',
    isCollectionStream: true,
  },
  rightInputStreamConfigurationTuple: [
    {
      collectionId: 'collection-2',
      isCollectionStream: true,
      getRightKeyTuple: undefined,
      getRightKey: undefined,
    },
  ],
  outputStreamConfiguration: {
    collectionIdTuple: ['collection-3'],
  },
  transform: (
    leftInput,
    rightInput,
  ): OutputStreamConnectionMetatype<
    [Collection3StreamMetatype]
  >['coreTransformOutput'] => {
    const serializedLeftInput = `[${leftInput.join(', ')}]`;
    const serializedRightInput = `[${rightInput.join(', ')}]`;

    const output = `${serializedLeftInput}-${serializedRightInput}`;

    return {
      'collection-3': [output],
    };
  },
};

/**
 * Tests a transform that consumes two entire collections
 *
 * @canonicalComment
 *
 * @readableName testJoiningCollectionToCollection
 */
runEngine2({
  inputCollectionList: [
    new InMemoryCollection<Collection1StreamMetatype>({
      collectionId: 'collection-1',
      initialItemEggTuple: [1, 2],
    }),
    new InMemoryCollection<Collection2StreamMetatype>({
      collectionId: 'collection-2',
      initialItemEggTuple: ['a', 'b', 'c', 'd'],
    }),
    new InMemoryCollection<Collection3StreamMetatype>({
      collectionId: 'collection-3',
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
      inputCollectionId: 'collection-3',
      outputCollectionId: 'serialized',
    }),
  ],
  onFinish: (runtimeStatistics) => {
    programFileCache.writeRuntimeSnapshot(runtimeStatistics);
  },
});
