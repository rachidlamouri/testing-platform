import { Estinant2 } from '../../core/engine-shell/estinant/estinant';
import { LeftInputHubblepupVicken } from '../../core/engine-shell/vicken/leftInputVicken';
import { OutputVicken } from '../../core/engine-shell/vicken/outputVicken';
import { digikikify2 } from '../../core/engine/digikikify';
import { InMemoryVoictent } from '../../core/engine/inMemoryVoictent';
import { StandardInMemoryVoque } from '../../core/engine/inMemoryVoque';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import {
  SerializableErrorVoictent,
  SerializableErrorVoque,
} from './serializableErrorVoictent';

type InputErrorVoque = StandardInMemoryVoque<'input-error', Error>;
type EngineErrorVoque = SerializableErrorVoque<'engine-error'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-estinant-error',
});

/** Throws the input error */
const throwError: Estinant2<
  LeftInputHubblepupVicken<InputErrorVoque>,
  [],
  OutputVicken<[]>
> = {
  version: 2,
  name: 'throwError',
  leftInputAppreffinge: {
    isWibiz: false,
    gepp: 'input-error',
  },
  rightInputAppreffingeTuple: [],
  outputAppreffinge: {
    geppTuple: [],
  },
  tropoig: (indexedError) => {
    throw indexedError.hubblepup;
  },
};

/**
 * Expects the engine to forward an error thrown in a transform to the
 * designated error collection. The error collection's serialized output is
 * checked into git to detect if the behavior changes
 */
digikikify2({
  inputVoictentList: [
    new InMemoryVoictent<InputErrorVoque>({
      gepp: 'input-error',
      initialHubblepupPelueTuple: [new Error('Custom error')],
    }),
    new SerializableErrorVoictent<EngineErrorVoque>({
      gepp: 'engine-error',
      initialHubblepupPelueTuple: [],
      programFileCache,
    }),
  ],
  errorGepp: 'engine-error',
  estinantTuple: [throwError],
  failForEncounteredError: false,
});
