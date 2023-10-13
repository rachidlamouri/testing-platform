import { ProgrammedTransform2 } from '../../core/types/programmed-transform/programmedTransform';
import { LeftInputItemStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/leftInputStreamConnectionMetatype';
import { OutputStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/outputStreamConnectionMetatype';
import { RightInputItemTupleStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/rightInputStreamConnectionMetatype';
import { digikikify2 } from '../../core/engine/digikikify';
import { InMemoryCollection } from '../../layer-agnostic-utilities/collection/inMemoryCollection';
import { StandardInMemoryStreamMetatype } from '../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import { AbstractSerializableStreamMetatype } from '../../layer-agnostic-utilities/collection/abstractSerializableCollection';
import { buildAddMetadataForSerialization } from '../../layer-agnostic-utilities/programmed-transform/buildAddMetadataForSerialization';
import { SerializableCollection } from '../../layer-agnostic-utilities/collection/serializableCollection';

type Voictent1Voque = StandardInMemoryStreamMetatype<'voictent-1', number>;
type Voictent2Voque = StandardInMemoryStreamMetatype<'voictent-2', string>;
type Voictent3Voque = StandardInMemoryStreamMetatype<'voictent-3', string>;
type SerializedVoque = AbstractSerializableStreamMetatype<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-joining-one-to-one',
});

/**
 * Joins each item in the left collection to one item in the right collection
 */
const joinCollections: ProgrammedTransform2<
  LeftInputItemStreamConnectionMetatype<Voictent1Voque>,
  [RightInputItemTupleStreamConnectionMetatype<Voictent2Voque, [number]>],
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
digikikify2({
  inputVoictentList: [
    new InMemoryCollection<Voictent1Voque>({
      collectionId: 'voictent-1',
      initialItemEggTuple: [1, 2, 3],
    }),
    new InMemoryCollection<Voictent2Voque>({
      collectionId: 'voictent-2',
      initialItemEggTuple: ['a', 'b', 'c'],
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
  estinantTuple: [
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
