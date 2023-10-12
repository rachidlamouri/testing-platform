import { Estinant2 } from '../../core/types/estinant/estinant';
import { LeftInputVoictentVicken } from '../../core/types/vicken/leftInputVicken';
import { OutputVicken } from '../../core/types/vicken/outputVicken';
import { digikikify2 } from '../../core/engine/digikikify';
import { InMemoryCollection } from '../../layer-agnostic-utilities/collection/inMemoryCollection';
import { StandardInMemoryStreamMetatype } from '../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import { AbstractSerializableStreamMetatype } from '../../layer-agnostic-utilities/collection/abstractSerializableCollection';
import { buildAddMetadataForSerialization } from '../../layer-agnostic-utilities/estinant/buildAddMetadataForSerialization';
import { SerializableCollection } from '../../layer-agnostic-utilities/collection/serializableCollection';

type Voictent1Voque = StandardInMemoryStreamMetatype<'voictent-1', string>;
type Voictent2Voque = StandardInMemoryStreamMetatype<'voictent-2', string[]>;
type SerializedVoque = AbstractSerializableStreamMetatype<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-voictent-input',
});

/**
 * Forwards collection 1 as a whole to collection 2.
 */
const gatherCollection: Estinant2<
  LeftInputVoictentVicken<Voictent1Voque>,
  [],
  OutputVicken<[Voictent2Voque]>
> = {
  version: 2,
  name: 'gatherCollection',
  leftInputAppreffinge: {
    gepp: 'voictent-1',
    isWibiz: true,
  },
  rightInputAppreffingeTuple: [],
  outputAppreffinge: {
    geppTuple: ['voictent-2'],
  },
  tropoig: (input): OutputVicken<[Voictent2Voque]>['tropoignantOutput'] => {
    return {
      'voictent-2': [input],
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
digikikify2({
  inputVoictentList: [
    new InMemoryCollection<Voictent1Voque>({
      collectionId: 'voictent-1',
      initialItemEggTuple: ['a', 'b', 'c', 'd'],
    }),
    new InMemoryCollection<Voictent2Voque>({
      collectionId: 'voictent-2',
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

    buildAddMetadataForSerialization<Voictent2Voque, SerializedVoque>({
      inputGepp: 'voictent-2',
      outputGepp: 'serialized',
    }),
  ],
  onFinish: (runtimeStatistics) => {
    programFileCache.writeRuntimeSnapshot(runtimeStatistics);
  },
});
