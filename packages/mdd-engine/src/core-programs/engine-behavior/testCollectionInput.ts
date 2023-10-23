import { ProgrammedTransform2 } from '../../core/types/programmed-transform/programmedTransform';
import { LeftInputCollectionStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/leftInputStreamConnectionMetatype';
import { OutputStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/outputStreamConnectionMetatype';
import { runEngine2 } from '../../core/engine/runEngine';
import { InMemoryCollection } from '../../layer-agnostic-utilities/collection/inMemoryCollection';
import { StandardInMemoryStreamMetatype } from '../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import { AbstractSerializableStreamMetatype } from '../../layer-agnostic-utilities/collection/abstractSerializableCollection';
import { buildAddMetadataForSerialization } from '../../layer-agnostic-utilities/programmed-transform/buildAddMetadataForSerialization';
import { SerializableCollection } from '../../layer-agnostic-utilities/collection/serializableCollection';

type Collection1StreamMetatype = StandardInMemoryStreamMetatype<
  'collection-1',
  string
>;
type Collection2StreamMetatype = StandardInMemoryStreamMetatype<
  'collection-2',
  string[]
>;
type SerializedStreamMetatype =
  AbstractSerializableStreamMetatype<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-collection-input',
});

/**
 * Forwards collection 1 as a whole to collection 2.
 */
const gatherCollection: ProgrammedTransform2<
  LeftInputCollectionStreamConnectionMetatype<Collection1StreamMetatype>,
  [],
  OutputStreamConnectionMetatype<[Collection2StreamMetatype]>
> = {
  version: 2,
  name: 'gatherCollection',
  leftInputStreamConfiguration: {
    collectionId: 'collection-1',
    isCollectionStream: true,
  },
  rightInputStreamConfigurationTuple: [],
  outputStreamConfiguration: {
    collectionIdTuple: ['collection-2'],
  },
  transform: (
    input,
  ): OutputStreamConnectionMetatype<
    [Collection2StreamMetatype]
  >['coreTransformOutput'] => {
    return {
      'collection-2': [input],
    };
  },
};

/**
 * Tests a transform that consumes a collection as a whole.
 *
 * @canonicalComment
 *
 * @readableName testCollectionInput
 */
runEngine2({
  inputCollectionList: [
    new InMemoryCollection<Collection1StreamMetatype>({
      collectionId: 'collection-1',
      initialItemEggTuple: ['a', 'b', 'c', 'd'],
    }),
    new InMemoryCollection<Collection2StreamMetatype>({
      collectionId: 'collection-2',
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
      Collection2StreamMetatype,
      SerializedStreamMetatype
    >({
      inputCollectionId: 'collection-2',
      outputCollectionId: 'serialized',
    }),
  ],
  onFinish: (runtimeStatistics) => {
    programFileCache.writeRuntimeSnapshot(runtimeStatistics);
  },
});
