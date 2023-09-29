import { Estinant2 } from '../../core/types/estinant/estinant';
import { LeftInputVoictentVicken } from '../../core/types/vicken/leftInputVicken';
import { OutputVicken } from '../../core/types/vicken/outputVicken';
import { RightInputVoictentVicken } from '../../core/types/vicken/rightInputVicken';
import { digikikify2 } from '../../core/engine/digikikify';
import { InMemoryVoictent } from '../../layer-agnostic-utilities/voictent/inMemoryVoictent';
import { StandardInMemoryVoque } from '../../layer-agnostic-utilities/voque/inMemoryVoque';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import { AbstractSerializableVoque } from '../../layer-agnostic-utilities/voictent/abstractSerializableVoictent';
import { buildAddMetadataForSerialization } from '../../layer-agnostic-utilities/estinant/buildAddMetadataForSerialization';
import { SerializableVoictent } from '../../layer-agnostic-utilities/voictent/serializableVoictent';

type Voictent1Voque = StandardInMemoryVoque<'voictent-1', number>;
type Voictent2Voque = StandardInMemoryVoque<'voictent-2', string>;
type Voictent3Voque = StandardInMemoryVoque<'voictent-3', string>;
type SerializedVoque = AbstractSerializableVoque<'serialized'>;

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
 */
digikikify2({
  inputVoictentList: [
    new InMemoryVoictent<Voictent1Voque>({
      gepp: 'voictent-1',
      initialHubblepupPelueTuple: [1, 2],
    }),
    new InMemoryVoictent<Voictent2Voque>({
      gepp: 'voictent-2',
      initialHubblepupPelueTuple: ['a', 'b', 'c', 'd'],
    }),
    new InMemoryVoictent<Voictent3Voque>({
      gepp: 'voictent-3',
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

    buildAddMetadataForSerialization<Voictent3Voque, SerializedVoque>({
      inputGepp: 'voictent-3',
      outputGepp: 'serialized',
    }),
  ],
  onFinish: (runtimeStatistics) => {
    programFileCache.writeRuntimeSnapshot(runtimeStatistics);
  },
});
