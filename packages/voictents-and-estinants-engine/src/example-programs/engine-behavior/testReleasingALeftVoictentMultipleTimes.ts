import { Estinant2 } from '../../core/engine-shell/estinant/estinant';
import {
  LeftInputHubblepupVicken,
  LeftInputVoictentVicken,
} from '../../core/engine-shell/vicken/leftInputVicken';
import { OutputVicken } from '../../core/engine-shell/vicken/outputVicken';
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

type Voictent1Voque = InMemoryVoque<'voictent-1', string>;
type Voictent2Voque = InMemoryVoque<'voictent-2', string>;
type Voictent3Voque = InMemoryVoque<'voictent-3', string[]>;
type SerializedVoque = SerializableVoque<'serialized'>;

const SKIP_INDEX = 3;

const forwardFrom1To2AndSkipAValue: Estinant2<
  LeftInputHubblepupVicken<Voictent1Voque>,
  [],
  OutputVicken<[Voictent2Voque]>
> = {
  version: 2,
  name: 'forwardFrom1To2AndSkipAValue',
  leftInputAppreffinge: {
    gepp: 'voictent-1',
    isWibiz: false,
  },
  rightInputAppreffingeTuple: [],
  outputAppreffinge: {
    geppTuple: ['voictent-2'],
  },
  tropoig(input): OutputVicken<[Voictent2Voque]>['tropoignantOutput'] {
    if (input.indexByName.listIndex === SKIP_INDEX) {
      return {
        'voictent-2': [],
      };
    }

    return {
      'voictent-2': [input.hubblepup],
    };
  },
};

const forwardFrom2To3: Estinant2<
  LeftInputVoictentVicken<Voictent2Voque>,
  [],
  OutputVicken<[Voictent3Voque]>
> = {
  version: 2,
  name: 'forwardFrom2To3',
  leftInputAppreffinge: {
    gepp: 'voictent-2',
    isWibiz: true,
  },
  rightInputAppreffingeTuple: [],
  outputAppreffinge: {
    geppTuple: ['voictent-3'],
  },
  tropoig(input): OutputVicken<[Voictent3Voque]>['tropoignantOutput'] {
    return {
      'voictent-3': [input],
    };
  },
};

/**
 * Tests a transform that consumes an entire collection, but is triggered
 * multiple times
 */
digikikify2({
  inputVoictentList: [
    new InMemoryVoictent<Voictent1Voque>({
      gepp: 'voictent-1',
      initialHubblepupTuple: ['a', 'b', 'c', 'SKIP', 'd', 'e', 'f'],
    }),
    new InMemoryVoictent<Voictent2Voque>({
      gepp: 'voictent-2',
      initialHubblepupTuple: [],
    }),
    new InMemoryVoictent<Voictent3Voque>({
      gepp: 'voictent-3',
      initialHubblepupTuple: [],
    }),
    new SerializableVoictent<SerializedVoque>({
      nameSpace: 'test-releasing-a-left-voictent-multiple-times',
      gepp: 'serialized',
      initialHubblepupTuple: [],
    }),
  ],
  estinantTuple: [
    forwardFrom1To2AndSkipAValue,
    forwardFrom2To3,

    buildAddMetadataForSerialization<Voictent3Voque, SerializedVoque>({
      inputGepp: 'voictent-3',
      outputGepp: 'serialized',
    }),
  ],
});
