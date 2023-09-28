import { Estinant2 } from '../../core/engine-shell/estinant/estinant';
import { LeftInputHubblepupVicken } from '../../core/engine-shell/vicken/leftInputVicken';
import { OutputVicken } from '../../core/engine-shell/vicken/outputVicken';
import { RightInputVoictentVicken } from '../../core/engine-shell/vicken/rightInputVicken';
import { digikikify2 } from '../../core/engine/digikikify';
import { InMemoryVoictent } from '../../core/engine/inMemoryVoictent';
import { StandardInMemoryVoque } from '../../core/engine/inMemoryVoque';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import { AbstractSerializableVoque } from '../abstractSerializableVoictent';
import { buildAddMetadataForSerialization } from '../buildAddMetadataForSerialization';
import { SerializableVoictent } from '../serializableVoictent';

type Voictent1Voque = StandardInMemoryVoque<'voictent-1', number>;
type Voictent2Voque = StandardInMemoryVoque<'voictent-2', string>;
type Voictent3Voque = StandardInMemoryVoque<'voictent-3', string>;
type Voictent4Voque = StandardInMemoryVoque<'voictent-4', string>;

type SerializedVoque = AbstractSerializableVoque<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-releasing-a-right-voictent-multiple-timesy',
});

const SKIP_INDEX = 2;

/**
 * Forwards each item in collection 2 to collecion 3 except for one item.
 * Skipping an item causes the third collection to stop accumulating twice.
 */
const forwardFrom2To3AndSkipAValue: Estinant2<
  LeftInputHubblepupVicken<Voictent2Voque>,
  [],
  OutputVicken<[Voictent3Voque]>
> = {
  version: 2,
  name: 'forwardFrom2To3AndSkipAValue',
  leftInputAppreffinge: {
    gepp: 'voictent-2',
    isWibiz: false,
  },
  rightInputAppreffingeTuple: [],
  outputAppreffinge: {
    geppTuple: ['voictent-3'],
  },
  tropoig(input): OutputVicken<[Voictent3Voque]>['tropoignantOutput'] {
    if (input.indexByName.listIndex === SKIP_INDEX) {
      return {
        'voictent-3': [],
      };
    }

    return {
      'voictent-3': [input.hubblepup],
    };
  },
};

/**
 * Joins each item in collection 1 to the entirety of collection 3. Since
 * collection 3 stops accumulating twice, this transform will trigger twice for
 * each item in collection 1
 */
const join1ToAllOf3: Estinant2<
  LeftInputHubblepupVicken<Voictent1Voque>,
  [RightInputVoictentVicken<Voictent3Voque>],
  OutputVicken<[Voictent4Voque]>
> = {
  version: 2,
  name: 'join1ToAllOf3',
  leftInputAppreffinge: {
    gepp: 'voictent-1',
    isWibiz: false,
  },
  rightInputAppreffingeTuple: [
    {
      gepp: 'voictent-3',
      isWibiz: true,
      croard: undefined,
      framate: undefined,
    },
  ],
  outputAppreffinge: {
    geppTuple: ['voictent-4'],
  },
  tropoig(
    leftInput,
    rightInput,
  ): OutputVicken<[Voictent4Voque]>['tropoignantOutput'] {
    const serializedRightInput = `[${rightInput.join(', ')}]`;

    const output = `${leftInput.hubblepup}-${serializedRightInput}`;

    return {
      'voictent-4': [output],
    };
  },
};

/**
 * Tests a transform that consumes a right collection in which the right
 * collection causes the transform to trigger multiple times
 */
digikikify2({
  inputVoictentList: [
    new InMemoryVoictent<Voictent1Voque>({
      gepp: 'voictent-1',
      initialHubblepupPelueTuple: [1, 2],
    }),
    new InMemoryVoictent<Voictent2Voque>({
      gepp: 'voictent-2',
      initialHubblepupPelueTuple: ['a', 'b', 'SKIP', 'c', 'd'],
    }),
    new InMemoryVoictent<Voictent3Voque>({
      gepp: 'voictent-3',
      initialHubblepupPelueTuple: [],
    }),
    new InMemoryVoictent<Voictent4Voque>({
      gepp: 'voictent-4',
      initialHubblepupPelueTuple: [],
    }),
    new SerializableVoictent<SerializedVoque>({
      gepp: 'serialized',
      programFileCache,
      initialHubblepupPelueTuple: [],
    }),
  ],
  estinantTuple: [
    forwardFrom2To3AndSkipAValue,
    join1ToAllOf3,

    buildAddMetadataForSerialization<Voictent4Voque, SerializedVoque>({
      inputGepp: 'voictent-4',
      outputGepp: 'serialized',
    }),
  ],
  onFinish: (runtimeStatistics) => {
    programFileCache.writeRuntimeSnapshot(runtimeStatistics);
  },
});
