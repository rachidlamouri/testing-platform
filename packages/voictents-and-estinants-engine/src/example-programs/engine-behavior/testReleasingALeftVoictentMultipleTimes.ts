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

type Voque1 = InMemoryVoque<'voictent-1', string>;
type Voque2 = InMemoryVoque<'voictent-2', string>;
type Voque3 = InMemoryVoque<'voictent-3', string[]>;
type SerializedVoque = SerializableVoque<'serialized'>;

const SKIP_INDEX = 3;

digikikify2({
  inputVoictentList: [
    new InMemoryVoictent<Voque1>({
      gepp: 'voictent-1',
      initialHubblepupTuple: ['a', 'b', 'c', 'SKIP', 'd', 'e', 'f'],
    }),
    new InMemoryVoictent<Voque2>({
      gepp: 'voictent-2',
      initialHubblepupTuple: [],
    }),
    new InMemoryVoictent<Voque3>({
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
    {
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
      tropoig(input): OutputVicken<[Voque2]>['tropoignantOutput'] {
        if (input.indexByName.listIndex === SKIP_INDEX) {
          return {
            'voictent-2': [],
          };
        }

        return {
          'voictent-2': [input.hubblepup],
        };
      },
    } satisfies Estinant2<
      LeftInputHubblepupVicken<Voque1>,
      [],
      OutputVicken<[Voque2]>
    >,
    {
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
      tropoig(input): OutputVicken<[Voque3]>['tropoignantOutput'] {
        return {
          'voictent-3': [input],
        };
      },
    } satisfies Estinant2<
      LeftInputVoictentVicken<Voque2>,
      [],
      OutputVicken<[Voque3]>
    >,

    buildAddMetadataForSerialization<Voque3, SerializedVoque>({
      inputGepp: 'voictent-3',
      outputGepp: 'serialized',
    }),
  ],
});
