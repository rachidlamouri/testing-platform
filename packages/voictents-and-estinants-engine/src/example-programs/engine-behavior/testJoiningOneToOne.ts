import { Estinant2 } from '../../core/engine-shell/estinant/estinant';
import { LeftInputHubblepupVicken } from '../../core/engine-shell/vicken/leftInputVicken';
import { OutputVicken } from '../../core/engine-shell/vicken/outputVicken';
import { RightInputHubblepupTupleVicken } from '../../core/engine-shell/vicken/rightInputVicken';
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

const joinCollections: Estinant2<
  LeftInputHubblepupVicken<Voque1>,
  [RightInputHubblepupTupleVicken<Voque2, [number]>],
  OutputVicken<[Voque3]>
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

    const output = `${leftInput.hubblepup}-${rightInput.hubblepup}`;

    return {
      'voictent-3': [output],
    };
  },
};

digikikify2({
  inputVoictentList: [
    new InMemoryVoictent<Voque1>({
      gepp: 'voictent-1',
      initialHubblepupTuple: [1, 2, 3],
    }),
    new InMemoryVoictent<Voque2>({
      gepp: 'voictent-2',
      initialHubblepupTuple: ['a', 'b', 'c'],
    }),
    new InMemoryVoictent<Voque3>({
      gepp: 'voictent-3',
      initialHubblepupTuple: [],
    }),
    new SerializableVoictent<SerializedVoque>({
      nameSpace: 'test-joining-one-to-one',
      gepp: 'serialized',
      initialHubblepupTuple: [],
    }),
  ],
  estinantTuple: [
    joinCollections,

    buildAddMetadataForSerialization<Voque3, SerializedVoque>({
      inputGepp: 'voictent-3',
      outputGepp: 'serialized',
    }),
  ],
});
