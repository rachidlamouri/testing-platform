import { ProgrammedTransform2 } from '../../core/types/programmed-transform/programmedTransform';
import { LeftInputItemStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/leftInputStreamConnectionMetatype';
import { OutputStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/outputStreamConnectionMetatype';
import { RightInputItemTupleStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/rightInputStreamConnectionMetatype';
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
  namespace: 'test-joining-one-to-one',
});

/**
 * Joins each item in the left collection to one item in the right collection
 */
const joinCollections: ProgrammedTransform2<
  LeftInputItemStreamConnectionMetatype<Collection1StreamMetatype>,
  [
    RightInputItemTupleStreamConnectionMetatype<
      Collection2StreamMetatype,
      [number]
    >,
  ],
  OutputStreamConnectionMetatype<[Collection3StreamMetatype]>
> = {
  version: 2,
  name: 'joinCollections',
  leftInputStreamConfiguration: {
    collectionId: 'voictent-1',
    isCollectionStream: false,
  },
  rightInputStreamConfigurationTuple: [
    {
      collectionId: 'voictent-2',
      isCollectionStream: false,
      getRightKeyTuple: (leftInput) => [leftInput.indexByName.listIndex],
      getRightKey: (rightInput) => rightInput.indexByName.listIndex,
    },
  ],
  outputStreamConfiguration: {
    collectionIdTuple: ['voictent-3'],
  },
  transform: (leftInput, rightInputTuple) => {
    const [rightInput] = rightInputTuple;

    const output = `${leftInput.item}-${rightInput.item}`;

    return {
      'voictent-3': [output],
    };
  },
};

/**
 * Tests a transform that consumes one item in the right collection for each
 * item in the left collection.
 *
 * @canonicalComment
 */
runEngine2({
  inputCollectionList: [
    new InMemoryCollection<Collection1StreamMetatype>({
      collectionId: 'voictent-1',
      initialItemEggTuple: [1, 2, 3],
    }),
    new InMemoryCollection<Collection2StreamMetatype>({
      collectionId: 'voictent-2',
      initialItemEggTuple: ['a', 'b', 'c'],
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
    joinCollections,

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
