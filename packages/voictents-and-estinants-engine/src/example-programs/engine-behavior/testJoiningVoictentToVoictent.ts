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

type Voque1 = InMemoryVoque<'voictent-1', number>;
type Voque2 = InMemoryVoque<'voictent-2', string>;
type Voque3 = InMemoryVoque<'voictent-3', string>;
type SerializedVoque = SerializableVoque<'serialized'>;

digikikify2({
  inputVoictentList: [
    new InMemoryVoictent<Voque1>({
      gepp: 'voictent-1',
      initialHubblepupTuple: [1, 2],
    }),
    new InMemoryVoictent<Voque2>({
      gepp: 'voictent-2',
      initialHubblepupTuple: ['a', 'b', 'c', 'd'],
    }),
    new InMemoryVoictent<Voque3>({
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
    {
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
      ): OutputVicken<[Voque3]>['tropoignantOutput'] => {
        const serializedLeftInput = `[${leftInput.join(', ')}]`;
        const serializedRightInput = `[${rightInput.join(', ')}]`;

        const output = `${serializedLeftInput}-${serializedRightInput}`;

        return {
          'voictent-3': [output],
        };
      },
    } satisfies Estinant2<
      LeftInputVoictentVicken<Voque1>,
      [RightInputVoictentVicken<Voque2>],
      OutputVicken<[Voque3]>
    >,

    buildAddMetadataForSerialization<Voque3, SerializedVoque>({
      inputGepp: 'voictent-3',
      outputGepp: 'serialized',
    }),
  ],
});
