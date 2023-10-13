import { runEngine2 } from '../core/engine/runEngine';
import { ProgramFileCache } from '../layer-agnostic-utilities/program/programFileCache';
import {
  SerializableErrorCollection,
  SerializableErrorStreamMetatype,
} from '../layer-agnostic-utilities/collection/serializableErrorCollection';

type ErrorVoque = SerializableErrorStreamMetatype<'error'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-error-serialization',
});

/**
 * Tests the "ErrorVoictent" by initializing it with data.
 *
 * @note Running the collection through the engine is technically unnecessary,
 * but it allows the program modeler to construct a snapshot digest of this file
 *
 * @canonicalComment
 */
runEngine2({
  inputCollectionList: [
    // TODO: make the type parameter a voque
    new SerializableErrorCollection<ErrorVoque>({
      collectionId: 'error',
      programFileCache,
      initialItemEggTuple: [
        new Error('Example error message 1'),
        new Error('Example error message 2'),
      ],
    }),
  ],
  programmedTransformTuple: [],
});
