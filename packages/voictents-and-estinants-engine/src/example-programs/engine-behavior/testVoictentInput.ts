import { Estinant2 } from '../../core/engine-shell/estinant/estinant';
import { LeftInputVoictentVicken } from '../../core/engine-shell/vicken/leftInputVicken';
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
type Voque2 = InMemoryVoque<'voictent-2', string[]>;
type SerializedVoque = SerializableVoque<'serialized'>;

digikikify2({
  inputVoictentList: [
    new InMemoryVoictent<Voque1>({
      gepp: 'voictent-1',
      initialHubblepupTuple: ['a', 'b', 'c', 'd'],
    }),
    new InMemoryVoictent<Voque2>({
      gepp: 'voictent-2',
      initialHubblepupTuple: [],
    }),
    new SerializableVoictent<SerializedVoque>({
      nameSpace: 'test-voictent-input',
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
      rightInputAppreffingeTuple: [],
      outputAppreffinge: {
        geppTuple: ['voictent-2'],
      },
      tropoig: (input): OutputVicken<[Voque2]>['tropoignantOutput'] => {
        return {
          'voictent-2': [input],
        };
      },
    } satisfies Estinant2<
      LeftInputVoictentVicken<Voque1>,
      [],
      OutputVicken<[Voque2]>
    >,

    buildAddMetadataForSerialization<Voque2, SerializedVoque>({
      inputGepp: 'voictent-2',
      outputGepp: 'serialized',
    }),
  ],
});
