import { ProgrammedTransform2 } from '../../core/types/programmed-transform/programmedTransform';
import {
  LeftInputItemStreamConnectionMetatype,
  LeftInputCollectionStreamConnectionMetatype,
} from '../../core/types/stream-connection-metatype/leftInputStreamConnectionMetatype';
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
  string
>;
type Collection3StreamMetatype = StandardInMemoryStreamMetatype<
  'collection-3',
  string[]
>;
type SerializedStreamMetatype =
  AbstractSerializableStreamMetatype<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-releasing-a-left-collection-multiple-times',
});

const SKIP_INDEX = 3;

/**
 * Transfers items from the first collection to the second. This causes the
 * second collection to accumulate items. One item is skipped to cause the
 * second collection to stop accumulating twice, which will currently trigger
 * the next transform twice
 */
const forwardFrom1To2AndSkipAValue: ProgrammedTransform2<
  LeftInputItemStreamConnectionMetatype<Collection1StreamMetatype>,
  [],
  OutputStreamConnectionMetatype<[Collection2StreamMetatype]>
> = {
  name: 'forwardFrom1To2AndSkipAValue',
  leftInputStreamConfiguration: {
    collectionId: 'collection-1',
    isCollectionStream: false,
  },
  rightInputStreamConfigurationTuple: [],
  outputStreamConfiguration: {
    collectionIdTuple: ['collection-2'],
  },
  transform(
    input,
  ): OutputStreamConnectionMetatype<
    [Collection2StreamMetatype]
  >['coreTransformOutput'] {
    if (input.indexByName.listIndex === SKIP_INDEX) {
      return {
        'collection-2': [],
      };
    }

    return {
      'collection-2': [input.item],
    };
  },
};

/**
 * Sends the entire second collection to the third collection. Since the second
 * collection stops accumulating twice this transform is expected to run twice
 */
const forwardFrom2To3: ProgrammedTransform2<
  LeftInputCollectionStreamConnectionMetatype<Collection2StreamMetatype>,
  [],
  OutputStreamConnectionMetatype<[Collection3StreamMetatype]>
> = {
  name: 'forwardFrom2To3',
  leftInputStreamConfiguration: {
    collectionId: 'collection-2',
    isCollectionStream: true,
  },
  rightInputStreamConfigurationTuple: [],
  outputStreamConfiguration: {
    collectionIdTuple: ['collection-3'],
  },
  transform(
    input,
  ): OutputStreamConnectionMetatype<
    [Collection3StreamMetatype]
  >['coreTransformOutput'] {
    return {
      'collection-3': [input],
    };
  },
};

/**
 * Tests a transform that consumes an entire collection, but is triggered
 * multiple times
 *
 * @canonicalComment
 *
 * @readableName testReleasingALeftCollectionMultipleTimes
 */
runEngine2({
  inputCollectionList: [
    new InMemoryCollection<Collection1StreamMetatype>({
      collectionId: 'collection-1',
      initialItemEggTuple: ['a', 'b', 'c', 'SKIP', 'd', 'e', 'f'],
    }),
    new InMemoryCollection<Collection2StreamMetatype>({
      collectionId: 'collection-2',
      initialItemEggTuple: [],
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
    forwardFrom1To2AndSkipAValue,
    forwardFrom2To3,

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
