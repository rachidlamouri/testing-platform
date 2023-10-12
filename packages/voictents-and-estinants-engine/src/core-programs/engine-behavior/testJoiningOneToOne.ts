import { Estinant2 } from '../../core/types/estinant/estinant';
import { LeftInputHubblepupVicken } from '../../core/types/vicken/leftInputVicken';
import { OutputVicken } from '../../core/types/vicken/outputVicken';
import { RightInputHubblepupTupleVicken } from '../../core/types/vicken/rightInputVicken';
import { digikikify2 } from '../../core/engine/digikikify';
import { InMemoryCollection } from '../../layer-agnostic-utilities/collection/inMemoryCollection';
import { StandardInMemoryStreamMetatype } from '../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import { AbstractSerializableStreamMetatype } from '../../layer-agnostic-utilities/collection/abstractSerializableCollection';
import { buildAddMetadataForSerialization } from '../../layer-agnostic-utilities/estinant/buildAddMetadataForSerialization';
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
const joinCollections: Estinant2<
  LeftInputHubblepupVicken<Voictent1Voque>,
  [RightInputHubblepupTupleVicken<Voictent2Voque, [number]>],
  OutputVicken<[Voictent3Voque]>
> = {
  version: 2,
  name: 'joinCollections',
  leftInputAppreffinge: {
    gepp: 'voictent-1',
    isWibiz: false,
  },
  rightInputAppreffingeTuple: [
    {
      gepp: 'voictent-2',
      isWibiz: false,
      framate: (leftInput) => [leftInput.indexByName.listIndex],
      croard: (rightInput) => rightInput.indexByName.listIndex,
    },
  ],
  outputAppreffinge: {
    geppTuple: ['voictent-3'],
  },
  tropoig: (leftInput, rightInputTuple) => {
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
      inputGepp: 'voictent-3',
      outputGepp: 'serialized',
    }),
  ],
  onFinish: (runtimeStatistics) => {
    programFileCache.writeRuntimeSnapshot(runtimeStatistics);
  },
});
