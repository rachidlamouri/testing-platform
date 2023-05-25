import { Estinant2 } from '../../core/engine-shell/estinant/estinant';
import { LeftInputHubblepupVicken } from '../../core/engine-shell/vicken/leftInputVicken';
import { OutputVicken } from '../../core/engine-shell/vicken/outputVicken';
import { RightInputHubblepupTupleVicken } from '../../core/engine-shell/vicken/rightInputVicken';
import { digikikify2 } from '../../core/engine/digikikify';
import { InMemoryVoictent } from '../../core/engine/inMemoryVoictent';
import { StandardInMemoryVoque } from '../../core/engine/inMemoryVoque';
import { ProgramFileCache } from '../../utilities/programFileCache';
import { AbstractSerializableVoque } from '../abstractSerializableVoictent';
import { buildAddMetadataForSerialization } from '../buildAddMetadataForSerialization';
import { SerializableVoictent } from '../serializableVoictent';

type Voictent1Voque = StandardInMemoryVoque<'voictent-1', number>;
type Voictent2Voque = StandardInMemoryVoque<'voictent-2', string>;
type Voictent3Voque = StandardInMemoryVoque<'voictent-3', string>;
type SerializedVoque = AbstractSerializableVoque<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-joining-one-to-one',
});

/**
 * Joins each item in the left collection to one item in the right collection
 */
const joinCollections: Estinant2<
  LeftInputHubblepupVicken<Voictent1Voque>,
  [RightInputHubblepupTupleVicken<Voictent2Voque, [number]>],
  OutputVicken<[Voictent3Voque]>
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

/**
 * Tests a transform that consumes one item in the right collection for each
 * item in the left collection.
 */
digikikify2({
  inputVoictentList: [
    new InMemoryVoictent<Voictent1Voque>({
      gepp: 'voictent-1',
      initialHubblepupTuple: [1, 2, 3],
    }),
    new InMemoryVoictent<Voictent2Voque>({
      gepp: 'voictent-2',
      initialHubblepupTuple: ['a', 'b', 'c'],
    }),
    new InMemoryVoictent<Voictent3Voque>({
      gepp: 'voictent-3',
      initialHubblepupTuple: [],
    }),
    new SerializableVoictent<SerializedVoque>({
      gepp: 'serialized',
      programFileCache,
      initialHubblepupTuple: [],
    }),
  ],
  estinantTuple: [
    joinCollections,

    buildAddMetadataForSerialization<Voictent3Voque, SerializedVoque>({
      inputGepp: 'voictent-3',
      outputGepp: 'serialized',
    }),
  ],
});
