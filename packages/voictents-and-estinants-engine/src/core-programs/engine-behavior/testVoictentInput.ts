import { Estinant2 } from '../../core/engine-shell/estinant/estinant';
import { LeftInputVoictentVicken } from '../../core/engine-shell/vicken/leftInputVicken';
import { OutputVicken } from '../../core/engine-shell/vicken/outputVicken';
import { digikikify2 } from '../../core/engine/digikikify';
import { InMemoryVoictent } from '../../core/engine/inMemoryVoictent';
import { StandardInMemoryVoque } from '../../core/engine/inMemoryVoque';
import { ProgramFileCache } from '../../utilities/program/programFileCache';
import { AbstractSerializableVoque } from '../abstractSerializableVoictent';
import { buildAddMetadataForSerialization } from '../buildAddMetadataForSerialization';
import { SerializableVoictent } from '../serializableVoictent';

type Voictent1Voque = StandardInMemoryVoque<'voictent-1', string>;
type Voictent2Voque = StandardInMemoryVoque<'voictent-2', string[]>;
type SerializedVoque = AbstractSerializableVoque<'serialized'>;

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
 */
digikikify2({
  inputVoictentList: [
    new InMemoryVoictent<Voictent1Voque>({
      gepp: 'voictent-1',
      initialHubblepupPelueTuple: ['a', 'b', 'c', 'd'],
    }),
    new InMemoryVoictent<Voictent2Voque>({
      gepp: 'voictent-2',
      initialHubblepupPelueTuple: [],
    }),
    new SerializableVoictent<SerializedVoque>({
      gepp: 'serialized',
      programFileCache,
      initialHubblepupPelueTuple: [],
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
