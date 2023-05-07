import { digikikify2 } from '../core/engine/digikikify';
import {
  InMemoryVoictent,
  InMemoryVoque,
} from '../core/engine/inMemoryVoictent';
import { buildAddMetadataForSerialization } from './buildAddMetadataForSerialization';
import {
  SerializableVoictent,
  SerializableVoque,
} from './serializableVoictent';

type Voictent1Configuration = InMemoryVoque<'voictent-1', string>;
type Voictent2Configuration = InMemoryVoque<'voictent-2', number>;
type SerializedVoque = SerializableVoque<'serialized'>;

/**
 * An example program using a Voictent that is derived from a Voque
 */
digikikify2({
  inputVoictentList: [
    new InMemoryVoictent<Voictent1Configuration>({
      gepp: 'voictent-1',
      initialHubblepupTuple: ['a', 'b'],
    }),
    new InMemoryVoictent<Voictent2Configuration>({
      gepp: 'voictent-2',
      initialHubblepupTuple: [1, 2],
    }),
    new SerializableVoictent<SerializedVoque>({
      nameSpace: 'exampleInputVoictent',
      gepp: 'serialized',
      initialHubblepupTuple: [],
    }),
  ],
  estinantTuple: [
    buildAddMetadataForSerialization<Voictent1Configuration, SerializedVoque>({
      inputGepp: 'voictent-1',
      outputGepp: 'serialized',
    }),
    buildAddMetadataForSerialization<Voictent2Configuration, SerializedVoque>({
      inputGepp: 'voictent-2',
      outputGepp: 'serialized',
    }),
  ],
});
