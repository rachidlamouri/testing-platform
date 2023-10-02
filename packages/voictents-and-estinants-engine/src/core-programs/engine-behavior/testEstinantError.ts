import { Estinant2 } from '../../core/types/estinant/estinant';
import { LeftInputHubblepupVicken } from '../../core/types/vicken/leftInputVicken';
import { OutputVicken } from '../../core/types/vicken/outputVicken';
import { digikikify2 } from '../../core/engine/digikikify';
import { InMemoryVoictent } from '../../layer-agnostic-utilities/voictent/inMemoryVoictent';
import { StandardInMemoryVoque } from '../../layer-agnostic-utilities/voque/inMemoryVoque';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import {
  SerializableErrorVoictent,
  SerializableErrorVoque,
} from '../../layer-agnostic-utilities/voictent/serializableErrorVoictent';

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
 *
 * @canonicalComment
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
