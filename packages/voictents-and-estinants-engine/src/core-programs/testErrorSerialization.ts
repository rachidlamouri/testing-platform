import { digikikify2 } from '../core/engine/digikikify';
import { ProgramFileCache } from '../layer-agnostic-utilities/program/programFileCache';
import {
  SerializableErrorVoictent,
  SerializableErrorVoque,
} from '../layer-agnostic-utilities/voictent/serializableErrorVoictent';

type ErrorVoque = SerializableErrorVoque<'error'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-error-serialization',
});

/**
 * Tests the "ErrorVoictent" by initializing it with data.
 *
 * @note Running the collection through the engine is technically unnecessary,
 * but it allows the program modeler to construct a snapshot digest of this file
 */
digikikify2({
  inputVoictentList: [
    // TODO: make the type parameter a voque
    new SerializableErrorVoictent<ErrorVoque>({
      gepp: 'error',
      programFileCache,
      initialHubblepupPelueTuple: [
        new Error('Example error message 1'),
        new Error('Example error message 2'),
      ],
    }),
  ],
  estinantTuple: [],
});
