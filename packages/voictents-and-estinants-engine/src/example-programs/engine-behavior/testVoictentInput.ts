import { Estinant2 } from '../../core/engine-shell/estinant/estinant';
import { LeftInputVoictentVicken } from '../../core/engine-shell/vicken/leftInputVicken';
import { OutputVicken } from '../../core/engine-shell/vicken/outputVicken';
import { digikikify2 } from '../../core/engine/digikikify';
import {
  InMemoryVoictent,
  InMemoryVoque,
} from '../../core/engine/inMemoryVoictent';
import { buildAddMetadataForSerialization } from '../buildAddMetadataForSerialization';
import {
  SerializableVoictent,
  SerializableVoque,
} from '../serializableVoictent';

type Voictent1Voque = InMemoryVoque<'voictent-1', string>;
type Voictent2Voque = InMemoryVoque<'voictent-2', string[]>;
type SerializedVoque = SerializableVoque<'serialized'>;

/**
 * Forwards collection 1 as a whole to collection 2.
 */
const gatherCollection: Estinant2<
  LeftInputVoictentVicken<Voictent1Voque>,
  [],
  OutputVicken<[Voictent2Voque]>
> = {
  version: 2,
  name: 'gatherCollection',
  leftInputAppreffinge: {
    gepp: 'voictent-1',
    isWibiz: true,
  },
  rightInputAppreffingeTuple: [],
  outputAppreffinge: {
    geppTuple: ['voictent-2'],
  },
  tropoig: (input): OutputVicken<[Voictent2Voque]>['tropoignantOutput'] => {
    return {
      'voictent-2': [input],
    };
  },
};

/**
 * Tests a transform that consumes a collection as a whole.
 */
digikikify2({
  inputVoictentList: [
    new InMemoryVoictent<Voictent1Voque>({
      gepp: 'voictent-1',
      initialHubblepupTuple: ['a', 'b', 'c', 'd'],
    }),
    new InMemoryVoictent<Voictent2Voque>({
      gepp: 'voictent-2',
      initialHubblepupTuple: [],
    }),
    new SerializableVoictent<SerializedVoque>({
      nameSpace: 'test-voictent-input',
      gepp: 'serialized',
      initialHubblepupTuple: [],
    }),
  ],
  estinantTuple: [
    gatherCollection,

    buildAddMetadataForSerialization<Voictent2Voque, SerializedVoque>({
      inputGepp: 'voictent-2',
      outputGepp: 'serialized',
    }),
  ],
});
