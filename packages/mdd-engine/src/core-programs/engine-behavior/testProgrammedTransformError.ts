import { ProgrammedTransform2 } from '../../core/types/programmed-transform/programmedTransform';
import { LeftInputItemStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/leftInputStreamConnectionMetatype';
import { OutputStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/outputStreamConnectionMetatype';
import { runEngine2 } from '../../core/engine/runEngine';
import { InMemoryCollection } from '../../layer-agnostic-utilities/collection/inMemoryCollection';
import { StandardInMemoryStreamMetatype } from '../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import {
  SerializableErrorCollection,
  SerializableErrorStreamMetatype,
} from '../../layer-agnostic-utilities/collection/serializableErrorCollection';

type InputErrorStreamMetatype = StandardInMemoryStreamMetatype<
  'input-error',
  Error
>;
type EngineErrorStreamMetatype =
  SerializableErrorStreamMetatype<'engine-error'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-programmed-transform-error',
});

/** Throws the input error */
const throwError: ProgrammedTransform2<
  LeftInputItemStreamConnectionMetatype<InputErrorStreamMetatype>,
  [],
  OutputStreamConnectionMetatype<[]>
> = {
  version: 2,
  name: 'throwError',
  leftInputStreamConfiguration: {
    isCollectionStream: false,
    collectionId: 'input-error',
  },
  rightInputStreamConfigurationTuple: [],
  outputStreamConfiguration: {
    collectionIdTuple: [],
  },
  transform: (indexedError) => {
    throw indexedError.item;
  },
};

/**
 * Expects the engine to forward an error thrown in a transform to the
 * designated error collection. The error collection's serialized output is
 * checked into git to detect if the behavior changes
 *
 * @canonicalComment
 *
 * @readableName testProgrammedTransformError
 */
runEngine2({
  inputCollectionList: [
    new InMemoryCollection<InputErrorStreamMetatype>({
      collectionId: 'input-error',
      initialItemEggTuple: [new Error('Custom error')],
    }),
    new SerializableErrorCollection<EngineErrorStreamMetatype>({
      collectionId: 'engine-error',
      initialItemEggTuple: [],
      programFileCache,
    }),
  ],
  errorCollectionId: 'engine-error',
  programmedTransformTuple: [throwError],
  failForEncounteredError: false,
});
