import { Estinant2 } from '../../core/types/estinant/estinant';
import { LeftInputVoictentVicken } from '../../core/types/vicken/leftInputVicken';
import { OutputVicken } from '../../core/types/vicken/outputVicken';
import { RightInputVoictentVicken } from '../../core/types/vicken/rightInputVicken';
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
  namespace: 'test-joining-voictent-to-voictent',
});

/**
 * Joins the entire left collection to the entire right collection
 */
const gatherCollection: Estinant2<
  LeftInputVoictentVicken<Voictent1Voque>,
  [RightInputVoictentVicken<Voictent2Voque>],
  OutputVicken<[Voictent3Voque]>
> = {
  version: 2,
  name: 'gatherCollection',
  leftInputAppreffinge: {
    gepp: 'voictent-1',
    isWibiz: true,
  },
  rightInputAppreffingeTuple: [
    {
      gepp: 'voictent-2',
      isWibiz: true,
      framate: undefined,
      croard: undefined,
    },
  ],
  outputAppreffinge: {
    geppTuple: ['voictent-3'],
  },
  tropoig: (
    leftInput,
    rightInput,
  ): OutputVicken<[Voictent3Voque]>['tropoignantOutput'] => {
    const serializedLeftInput = `[${leftInput.join(', ')}]`;
    const serializedRightInput = `[${rightInput.join(', ')}]`;

    const output = `${serializedLeftInput}-${serializedRightInput}`;

    return {
      'voictent-3': [output],
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
digikikify2({
  inputVoictentList: [
    new InMemoryCollection<Voictent1Voque>({
      collectionId: 'voictent-1',
      initialItemEggTuple: [1, 2],
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
  estinantTuple: [
    gatherCollection,

    buildAddMetadataForSerialization<Voictent3Voque, SerializedVoque>({
      inputGepp: 'voictent-3',
      outputGepp: 'serialized',
    }),
  ],
  onFinish: (runtimeStatistics) => {
    programFileCache.writeRuntimeSnapshot(runtimeStatistics);
  },
});
