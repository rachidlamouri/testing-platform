import { Estinant2 } from '../../core/engine-shell/estinant/estinant';
import { LeftInputHubblepupVicken } from '../../core/engine-shell/vicken/leftInputVicken';
import { OutputVicken } from '../../core/engine-shell/vicken/outputVicken';
import { RightInputHubblepupTupleVicken } from '../../core/engine-shell/vicken/rightInputVicken';
import { digikikify2 } from '../../core/engine/digikikify';
import { InMemoryVoictent } from '../../core/engine/inMemoryVoictent';
import { StandardInMemoryVoque } from '../../core/engine/inMemoryVoque';
import { ProgramFileCache } from '../../utilities/programFileCache';
import {
  SerializableErrorVoictent,
  SerializableErrorVoque,
} from './serializableErrorVoictent';

const programFileCache = new ProgramFileCache({
  namespace: 'test-untriggered-cology-error',
});

type Input1Voque = StandardInMemoryVoque<'input-1', number>;
type Input2Voque = StandardInMemoryVoque<'input-2', number>;
type OutputVoque = StandardInMemoryVoque<
  'output',
  { leftInput: number; rightInput: number }
>;
type EngineErrorVoque = SerializableErrorVoque<'engine-error'>;

/**
 * Joins items from a left and right collection by the value of each item. In
 * this test case, the right collection purposefully has less items than needed
 * so this transform won't trigger for every left input
 */
const joinCollectionsByValue: Estinant2<
  LeftInputHubblepupVicken<Input1Voque>,
  [RightInputHubblepupTupleVicken<Input2Voque, [number]>],
  OutputVicken<[OutputVoque]>
> = {
  version: 2,
  name: 'joinCollections',
  leftInputAppreffinge: {
    gepp: 'input-1',
    isWibiz: false,
  },
  rightInputAppreffingeTuple: [
    {
      gepp: 'input-2',
      isWibiz: false,
      framate: (input1) => [input1.hubblepup],
      croard: (input2) => input2.hubblepup,
    },
  ],
  outputAppreffinge: {
    geppTuple: ['output'],
  },
  tropoig: (indexedInput1, [indexedInput2]) => {
    return {
      output: [
        {
          leftInput: indexedInput1.hubblepup,
          rightInput: indexedInput2.hubblepup,
        },
      ],
    };
  },
};

/**
 * Expects the engine to emit an error when it encounters a set of transform
 * inputs that is incomplete, and therefore was not processed. The Input2
 * collection is designed to have less inputs than needed. Emitted errors should
 * be sent to the designated error collection, which in this case serializes the
 * error. The serialized error is committed to the git repo.
 */
digikikify2({
  inputVoictentList: [
    new InMemoryVoictent<Input1Voque>({
      gepp: 'input-1',
      initialHubblepupTuple: [1, 2, 3],
    }),
    new InMemoryVoictent<Input2Voque>({
      gepp: 'input-2',
      initialHubblepupTuple: [
        // this list intentionally has less items than required to properly join the collections
        2,
      ],
    }),
    new InMemoryVoictent<OutputVoque>({
      gepp: 'output',
      initialHubblepupTuple: [],
    }),
    new SerializableErrorVoictent<EngineErrorVoque>({
      gepp: 'engine-error',
      initialHubblepupTuple: [],
      programFileCache,
    }),
  ],
  errorGepp: 'engine-error',
  estinantTuple: [joinCollectionsByValue],
  failForEncounteredError: false,
});