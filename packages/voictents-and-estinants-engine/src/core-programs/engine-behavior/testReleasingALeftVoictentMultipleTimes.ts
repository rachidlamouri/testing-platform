import { Estinant2 } from '../../core/types/estinant/estinant';
import {
  LeftInputHubblepupVicken,
  LeftInputVoictentVicken,
} from '../../core/types/vicken/leftInputVicken';
import { OutputVicken } from '../../core/types/vicken/outputVicken';
import { digikikify2 } from '../../core/engine/digikikify';
import { InMemoryCollection } from '../../layer-agnostic-utilities/collection/inMemoryCollection';
import { StandardInMemoryStreamMetatype } from '../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import { AbstractSerializableStreamMetatype } from '../../layer-agnostic-utilities/collection/abstractSerializableCollection';
import { buildAddMetadataForSerialization } from '../../layer-agnostic-utilities/estinant/buildAddMetadataForSerialization';
import { SerializableCollection } from '../../layer-agnostic-utilities/collection/serializableCollection';

type Voictent1Voque = StandardInMemoryStreamMetatype<'voictent-1', string>;
type Voictent2Voque = StandardInMemoryStreamMetatype<'voictent-2', string>;
type Voictent3Voque = StandardInMemoryStreamMetatype<'voictent-3', string[]>;
type SerializedVoque = AbstractSerializableStreamMetatype<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-releasing-a-left-voictent-multiple-times',
});

const SKIP_INDEX = 3;

/**
 * Transfers items from the first collection to the second. This causes the
 * second collection to accumulate items. One item is skipped to cause the
 * second collection to stop accumulating twice, which will currently trigger
 * the next transform twice
 */
const forwardFrom1To2AndSkipAValue: Estinant2<
  LeftInputHubblepupVicken<Voictent1Voque>,
  [],
  OutputVicken<[Voictent2Voque]>
> = {
  version: 2,
  name: 'forwardFrom1To2AndSkipAValue',
  leftInputAppreffinge: {
    gepp: 'voictent-1',
    isWibiz: false,
  },
  rightInputAppreffingeTuple: [],
  outputAppreffinge: {
    geppTuple: ['voictent-2'],
  },
  tropoig(input): OutputVicken<[Voictent2Voque]>['tropoignantOutput'] {
    if (input.indexByName.listIndex === SKIP_INDEX) {
      return {
        'voictent-2': [],
      };
    }

    return {
      'voictent-2': [input.item],
    };
  },
};

/**
 * Sends the entire second collection to the third collection. Since the second
 * collection stops accumulating twice this transform is expected to run twice
 */
const forwardFrom2To3: Estinant2<
  LeftInputVoictentVicken<Voictent2Voque>,
  [],
  OutputVicken<[Voictent3Voque]>
> = {
  version: 2,
  name: 'forwardFrom2To3',
  leftInputAppreffinge: {
    gepp: 'voictent-2',
    isWibiz: true,
  },
  rightInputAppreffingeTuple: [],
  outputAppreffinge: {
    geppTuple: ['voictent-3'],
  },
  tropoig(input): OutputVicken<[Voictent3Voque]>['tropoignantOutput'] {
    return {
      'voictent-3': [input],
    };
  },
};

/**
 * Tests a transform that consumes an entire collection, but is triggered
 * multiple times
 *
 * @canonicalComment
 *
 * @readableName testReleasingALeftCollectionMultipleTimes
 */
digikikify2({
  inputVoictentList: [
    new InMemoryCollection<Voictent1Voque>({
      collectionId: 'voictent-1',
      initialItemEggTuple: ['a', 'b', 'c', 'SKIP', 'd', 'e', 'f'],
    }),
    new InMemoryCollection<Voictent2Voque>({
      collectionId: 'voictent-2',
      initialItemEggTuple: [],
    }),
    new InMemoryCollection<Voictent3Voque>({
      collectionId: 'voictent-3',
      initialItemEggTuple: [],
    }),
    new SerializableCollection<SerializedVoque>({
      collectionId: 'serialized',
      programFileCache,
      initialItemEggTuple: [],
    }),
  ],
  estinantTuple: [
    forwardFrom1To2AndSkipAValue,
    forwardFrom2To3,

    buildAddMetadataForSerialization<Voictent3Voque, SerializedVoque>({
      inputGepp: 'voictent-3',
      outputGepp: 'serialized',
    }),
  ],
  onFinish: (runtimeStatistics) => {
    programFileCache.writeRuntimeSnapshot(runtimeStatistics);
  },
});
