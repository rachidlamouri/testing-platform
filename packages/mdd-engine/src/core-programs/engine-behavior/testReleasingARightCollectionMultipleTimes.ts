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
type Collection4StreamMetatype = StandardInMemoryStreamMetatype<
  'voictent-4',
  string
>;

type SerializedStreamMetatype =
  AbstractSerializableStreamMetatype<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-releasing-a-right-voictent-multiple-timesy',
});

const SKIP_INDEX = 2;

/**
 * Forwards each item in collection 2 to collecion 3 except for one item.
 * Skipping an item causes the third collection to stop accumulating twice.
 */
const forwardFrom2To3AndSkipAValue: ProgrammedTransform2<
  LeftInputItemStreamConnectionMetatype<Collection2StreamMetatype>,
  [],
  OutputStreamConnectionMetatype<[Collection3StreamMetatype]>
> = {
  version: 2,
  name: 'forwardFrom2To3AndSkipAValue',
  leftInputStreamConfiguration: {
    collectionId: 'voictent-2',
    isCollectionStream: false,
  },
  rightInputStreamConfigurationTuple: [],
  outputStreamConfiguration: {
    collectionIdTuple: ['voictent-3'],
  },
  transform(
    input,
  ): OutputStreamConnectionMetatype<
    [Collection3StreamMetatype]
  >['coreTransformOutput'] {
    if (input.indexByName.listIndex === SKIP_INDEX) {
      return {
        'voictent-3': [],
      };
    }

    return {
      'voictent-3': [input.item],
    };
  },
};

/**
 * Joins each item in collection 1 to the entirety of collection 3. Since
 * collection 3 stops accumulating twice, this transform will trigger twice for
 * each item in collection 1
 */
const join1ToAllOf3: ProgrammedTransform2<
  LeftInputItemStreamConnectionMetatype<Collection1StreamMetatype>,
  [RightInputCollectionStreamConnectionMetatype<Collection3StreamMetatype>],
  OutputStreamConnectionMetatype<[Collection4StreamMetatype]>
> = {
  version: 2,
  name: 'join1ToAllOf3',
  leftInputStreamConfiguration: {
    collectionId: 'voictent-1',
    isCollectionStream: false,
  },
  rightInputStreamConfigurationTuple: [
    {
      collectionId: 'voictent-3',
      isCollectionStream: true,
      getRightKey: undefined,
      getRightKeyTuple: undefined,
    },
  ],
  outputStreamConfiguration: {
    collectionIdTuple: ['voictent-4'],
  },
  transform(
    leftInput,
    rightInput,
  ): OutputStreamConnectionMetatype<
    [Collection4StreamMetatype]
  >['coreTransformOutput'] {
    const serializedRightInput = `[${rightInput.join(', ')}]`;

    const output = `${leftInput.item}-${serializedRightInput}`;

    return {
      'voictent-4': [output],
    };
  },
};

/**
 * Tests a transform that consumes a right collection in which the right
 * collection causes the transform to trigger multiple times
 *
 * @canonicalComment
 *
 * @readableName testReleasingARightCollectionMultipleTimes
 */
runEngine2({
  inputCollectionList: [
    new InMemoryCollection<Collection1StreamMetatype>({
      collectionId: 'voictent-1',
      initialItemEggTuple: [1, 2],
    }),
    new InMemoryCollection<Collection2StreamMetatype>({
      collectionId: 'voictent-2',
      initialItemEggTuple: ['a', 'b', 'SKIP', 'c', 'd'],
    }),
    new InMemoryCollection<Collection3StreamMetatype>({
      collectionId: 'voictent-3',
      initialItemEggTuple: [],
    }),
    new InMemoryCollection<Collection4StreamMetatype>({
      collectionId: 'voictent-4',
      initialItemEggTuple: [],
    }),
    new SerializableCollection<SerializedStreamMetatype>({
      collectionId: 'serialized',
      programFileCache,
      initialItemEggTuple: [],
    }),
  ],
  programmedTransformTuple: [
    forwardFrom2To3AndSkipAValue,
    join1ToAllOf3,

    buildAddMetadataForSerialization<
      Collection4StreamMetatype,
      SerializedStreamMetatype
    >({
      inputCollectionId: 'voictent-4',
      outputCollectionId: 'serialized',
    }),
  ],
  onFinish: (runtimeStatistics) => {
    programFileCache.writeRuntimeSnapshot(runtimeStatistics);
  },
});
