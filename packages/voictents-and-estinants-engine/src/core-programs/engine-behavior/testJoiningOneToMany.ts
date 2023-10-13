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

type Voictent1Voque = StandardInMemoryStreamMetatype<
  'voictent-1',
  {
    value: number;
    joinIndexList: number[];
  }
>;
type Voictent2Voque = StandardInMemoryStreamMetatype<'voictent-2', string>;
type Voictent3Voque = StandardInMemoryStreamMetatype<'voictent-3', string>;
type SerializedVoque = AbstractSerializableStreamMetatype<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-joining-one-to-many',
});

/**
 * Joins each item in the left collection to multiple items in the right
 * collection
 */
const joinCollections: ProgrammedTransform2<
  LeftInputItemStreamConnectionMetatype<Voictent1Voque>,
  [RightInputItemTupleStreamConnectionMetatype<Voictent2Voque, number[]>],
  OutputStreamConnectionMetatype<[Voictent3Voque]>
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
      getRightKeyTuple: (leftInput) => leftInput.item.joinIndexList,
      getRightKey: (rightInput) => rightInput.indexByName.listIndex,
    },
  ],
  outputStreamConfiguration: {
    collectionIdTuple: ['voictent-3'],
  },
  transform: (leftInput, rightInputTuple) => {
    const rightInputValueList = rightInputTuple.map((input) => input.item);
    const serializedRightInput = `[${rightInputValueList.join(', ')}]` as const;

    const output = `${leftInput.item.value}-${serializedRightInput}`;

    return {
      'voictent-3': [output],
    };
  },
};

/**
 * Tests a transform that consumes multiple items from a right collection for
 * each item of the left collection
 *
 * @canonicalComment
 */
runEngine2({
  inputCollectionList: [
    new InMemoryCollection<Voictent1Voque>({
      collectionId: 'voictent-1',
      initialItemEggTuple: [
        {
          value: 1,
          joinIndexList: [0, 2],
        },
        {
          value: 2,
          joinIndexList: [1, 3],
        },
      ],
    }),
    new InMemoryCollection<Voictent2Voque>({
      collectionId: 'voictent-2',
      initialItemEggTuple: ['a', 'b', 'c', 'd'],
    }),
    new InMemoryCollection<Voictent3Voque>({
      collectionId: 'voictent-3',
      initialItemEggTuple: [],
    }),
    new SerializableCollection<SerializedVoque>({
      collectionId: 'serialized',
      programFileCache,
      initialItemEggTuple: [],
    }),
  ],
  programmedTransformTuple: [
    joinCollections,

    buildAddMetadataForSerialization<Voictent3Voque, SerializedVoque>({
      inputCollectionId: 'voictent-3',
      outputCollectionId: 'serialized',
    }),
  ],
  onFinish: (runtimeStatistics) => {
    programFileCache.writeRuntimeSnapshot(runtimeStatistics);
  },
});
