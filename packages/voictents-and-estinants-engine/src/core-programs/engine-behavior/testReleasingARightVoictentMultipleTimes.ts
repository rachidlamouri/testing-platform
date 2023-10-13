import { ProgrammedTransform2 } from '../../core/types/estinant/estinant';
import { LeftInputItemStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/leftInputStreamConnectionMetatype';
import { OutputStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/outputStreamConnectionMetatype';
import { RightInputCollectionStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/rightInputStreamConnectionMetatype';
import { digikikify2 } from '../../core/engine/digikikify';
import { InMemoryCollection } from '../../layer-agnostic-utilities/collection/inMemoryCollection';
import { StandardInMemoryStreamMetatype } from '../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import { AbstractSerializableStreamMetatype } from '../../layer-agnostic-utilities/collection/abstractSerializableCollection';
import { buildAddMetadataForSerialization } from '../../layer-agnostic-utilities/programmed-transform/buildAddMetadataForSerialization';
import { SerializableCollection } from '../../layer-agnostic-utilities/collection/serializableCollection';

type Voictent1Voque = StandardInMemoryStreamMetatype<'voictent-1', number>;
type Voictent2Voque = StandardInMemoryStreamMetatype<'voictent-2', string>;
type Voictent3Voque = StandardInMemoryStreamMetatype<'voictent-3', string>;
type Voictent4Voque = StandardInMemoryStreamMetatype<'voictent-4', string>;

type SerializedVoque = AbstractSerializableStreamMetatype<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-releasing-a-right-voictent-multiple-timesy',
});

const SKIP_INDEX = 2;

/**
 * Forwards each item in collection 2 to collecion 3 except for one item.
 * Skipping an item causes the third collection to stop accumulating twice.
 */
const forwardFrom2To3AndSkipAValue: ProgrammedTransform2<
  LeftInputItemStreamConnectionMetatype<Voictent2Voque>,
  [],
  OutputStreamConnectionMetatype<[Voictent3Voque]>
> = {
  version: 2,
  name: 'forwardFrom2To3AndSkipAValue',
  leftInputStreamConfiguration: {
    collectionId: 'voictent-2',
    isCollectionStream: false,
  },
  rightInputStreamConfigurationTuple: [],
  outputStreamConfiguration: {
    collectionIdTuple: ['voictent-3'],
  },
  transform(
    input,
  ): OutputStreamConnectionMetatype<[Voictent3Voque]>['coreTransformOutput'] {
    if (input.indexByName.listIndex === SKIP_INDEX) {
      return {
        'voictent-3': [],
      };
    }

    return {
      'voictent-3': [input.item],
    };
  },
};

/**
 * Joins each item in collection 1 to the entirety of collection 3. Since
 * collection 3 stops accumulating twice, this transform will trigger twice for
 * each item in collection 1
 */
const join1ToAllOf3: ProgrammedTransform2<
  LeftInputItemStreamConnectionMetatype<Voictent1Voque>,
  [RightInputCollectionStreamConnectionMetatype<Voictent3Voque>],
  OutputStreamConnectionMetatype<[Voictent4Voque]>
> = {
  version: 2,
  name: 'join1ToAllOf3',
  leftInputStreamConfiguration: {
    collectionId: 'voictent-1',
    isCollectionStream: false,
  },
  rightInputStreamConfigurationTuple: [
    {
      collectionId: 'voictent-3',
      isWibiz: true,
      croard: undefined,
      framate: undefined,
    },
  ],
  outputStreamConfiguration: {
    collectionIdTuple: ['voictent-4'],
  },
  transform(
    leftInput,
    rightInput,
  ): OutputStreamConnectionMetatype<[Voictent4Voque]>['coreTransformOutput'] {
    const serializedRightInput = `[${rightInput.join(', ')}]`;

    const output = `${leftInput.item}-${serializedRightInput}`;

    return {
      'voictent-4': [output],
    };
  },
};

/**
 * Tests a transform that consumes a right collection in which the right
 * collection causes the transform to trigger multiple times
 *
 * @canonicalComment
 *
 * @readableName testReleasingARightCollectionMultipleTimes
 */
digikikify2({
  inputVoictentList: [
    new InMemoryCollection<Voictent1Voque>({
      collectionId: 'voictent-1',
      initialItemEggTuple: [1, 2],
    }),
    new InMemoryCollection<Voictent2Voque>({
      collectionId: 'voictent-2',
      initialItemEggTuple: ['a', 'b', 'SKIP', 'c', 'd'],
    }),
    new InMemoryCollection<Voictent3Voque>({
      collectionId: 'voictent-3',
      initialItemEggTuple: [],
    }),
    new InMemoryCollection<Voictent4Voque>({
      collectionId: 'voictent-4',
      initialItemEggTuple: [],
    }),
    new SerializableCollection<SerializedVoque>({
      collectionId: 'serialized',
      programFileCache,
      initialItemEggTuple: [],
    }),
  ],
  estinantTuple: [
    forwardFrom2To3AndSkipAValue,
    join1ToAllOf3,

    buildAddMetadataForSerialization<Voictent4Voque, SerializedVoque>({
      inputCollectionId: 'voictent-4',
      outputCollectionId: 'serialized',
    }),
  ],
  onFinish: (runtimeStatistics) => {
    programFileCache.writeRuntimeSnapshot(runtimeStatistics);
  },
});
