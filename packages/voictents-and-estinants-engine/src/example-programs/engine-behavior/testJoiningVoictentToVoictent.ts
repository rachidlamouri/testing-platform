import { Estinant2 } from '../../core/engine-shell/estinant/estinant';
import { LeftInputVoictentVicken } from '../../core/engine-shell/vicken/leftInputVicken';
import { OutputVicken } from '../../core/engine-shell/vicken/outputVicken';
import { RightInputVoictentVicken } from '../../core/engine-shell/vicken/rightInputVicken';
import { digikikify2 } from '../../core/engine/digikikify';
import {
  InMemoryVoictent,
  InMemoryVoque,
} from '../../core/engine/inMemoryVoictent';
import { buildAddMetadataForSerialization } from '../buildAddMetadataForSerialization';
import {
  SerializableVoictent,
  SerializableVoque,
} from '../serializableVoictent';

type Voictent1Voque = InMemoryVoque<'voictent-1', number>;
type Voictent2Voque = InMemoryVoque<'voictent-2', string>;
type Voictent3Voque = InMemoryVoque<'voictent-3', string>;
type SerializedVoque = SerializableVoque<'serialized'>;

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
      initialHubblepupTuple: [1, 2],
    }),
    new InMemoryVoictent<Voictent2Voque>({
      gepp: 'voictent-2',
      initialHubblepupTuple: ['a', 'b', 'c', 'd'],
    }),
    new InMemoryVoictent<Voictent3Voque>({
      gepp: 'voictent-3',
      initialHubblepupTuple: [],
    }),
    new SerializableVoictent<SerializedVoque>({
      nameSpace: 'test-joining-voictent-to-voictent',
      gepp: 'serialized',
      initialHubblepupTuple: [],
    }),
  ],
  estinantTuple: [
    gatherCollection,

    buildAddMetadataForSerialization<Voictent3Voque, SerializedVoque>({
      inputGepp: 'voictent-3',
      outputGepp: 'serialized',
    }),
  ],
});
