import { ProgrammedTransform2 } from '../../core/types/programmed-transform/programmedTransform';
import { LeftInputItemStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/leftInputStreamConnectionMetatype';
import { OutputStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/outputStreamConnectionMetatype';
import { RightInputItemTupleStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/rightInputStreamConnectionMetatype';
import { digikikify2 } from '../../core/engine/digikikify';
import { InMemoryCollection } from '../../layer-agnostic-utilities/collection/inMemoryCollection';
import { StandardInMemoryStreamMetatype } from '../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import {
  SerializableErrorCollection,
  SerializableErrorStreamMetatype,
} from '../../layer-agnostic-utilities/collection/serializableErrorCollection';

const programFileCache = new ProgramFileCache({
  namespace: 'test-untriggered-cology-error',
});

type Input1Voque = StandardInMemoryStreamMetatype<'input-1', number>;
type Input2Voque = StandardInMemoryStreamMetatype<'input-2', number>;
type OutputVoque = StandardInMemoryStreamMetatype<
  'output',
  { leftInput: number; rightInput: number }
>;
type EngineErrorVoque = SerializableErrorStreamMetatype<'engine-error'>;

/**
 * Joins items from a left and right collection by the value of each item. In
 * this test case, the right collection purposefully has less items than needed
 * so this transform won't trigger for every left input
 */
const joinCollectionsByValue: ProgrammedTransform2<
  LeftInputItemStreamConnectionMetatype<Input1Voque>,
  [RightInputItemTupleStreamConnectionMetatype<Input2Voque, [number]>],
  OutputStreamConnectionMetatype<[OutputVoque]>
> = {
  version: 2,
  name: 'joinCollections',
  leftInputStreamConfiguration: {
    collectionId: 'input-1',
    isCollectionStream: false,
  },
  rightInputStreamConfigurationTuple: [
    {
      collectionId: 'input-2',
      isCollectionStream: false,
      getRightKeyTuple: (input1) => [input1.item],
      getRightKey: (input2) => input2.item,
    },
  ],
  outputStreamConfiguration: {
    collectionIdTuple: ['output'],
  },
  transform: (indexedInput1, [indexedInput2]) => {
    return {
      output: [
        {
          leftInput: indexedInput1.item,
          rightInput: indexedInput2.item,
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
 *
 * @canonicalComment
 *
 * @readableName testUntriggeredTransformInputKeyGroupError
 */
digikikify2({
  inputVoictentList: [
    new InMemoryCollection<Input1Voque>({
      collectionId: 'input-1',
      initialItemEggTuple: [1, 2, 3],
    }),
    new InMemoryCollection<Input2Voque>({
      collectionId: 'input-2',
      initialItemEggTuple: [
        // this list intentionally has less items than required to properly join the collections
        2,
      ],
    }),
    new InMemoryCollection<OutputVoque>({
      collectionId: 'output',
      initialItemEggTuple: [],
    }),
    new SerializableErrorCollection<EngineErrorVoque>({
      collectionId: 'engine-error',
      initialItemEggTuple: [],
      programFileCache,
    }),
  ],
  errorGepp: 'engine-error',
  estinantTuple: [joinCollectionsByValue],
  failForEncounteredError: false,
});
