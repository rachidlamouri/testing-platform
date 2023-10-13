import { ProgrammedTransform2 } from '../../core/types/estinant/estinant';
import { LeftInputItemStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/leftInputStreamConnectionMetatype';
import { OutputStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/outputStreamConnectionMetatype';
import { digikikify2 } from '../../core/engine/digikikify';
import { InMemoryCollection } from '../../layer-agnostic-utilities/collection/inMemoryCollection';
import { StandardInMemoryStreamMetatype } from '../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import {
  SerializableErrorCollection,
  SerializableErrorStreamMetatype,
} from '../../layer-agnostic-utilities/collection/serializableErrorCollection';

type InputErrorVoque = StandardInMemoryStreamMetatype<'input-error', Error>;
type EngineErrorVoque = SerializableErrorStreamMetatype<'engine-error'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-estinant-error',
});

/** Throws the input error */
const throwError: ProgrammedTransform2<
  LeftInputItemStreamConnectionMetatype<InputErrorVoque>,
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
digikikify2({
  inputVoictentList: [
    new InMemoryCollection<InputErrorVoque>({
      collectionId: 'input-error',
      initialItemEggTuple: [new Error('Custom error')],
    }),
    new SerializableErrorCollection<EngineErrorVoque>({
      collectionId: 'engine-error',
      initialItemEggTuple: [],
      programFileCache,
    }),
  ],
  errorGepp: 'engine-error',
  estinantTuple: [throwError],
  failForEncounteredError: false,
});
