import { digikikify } from '../core/engine/digikikify';
import {
  InMemoryVoictent,
  InMemoryVoictentConfiguration,
} from '../core/engine/inMemoryVoictent';
import { buildAddMetadataForSerialization } from './buildAddMetadataForSerialization';
import {
  SerializableVoictent,
  SerializableVoictentConfiguration,
} from './serializableVoictent';

type Voictent1Configuration = InMemoryVoictentConfiguration<
  'voictent-1',
  string
>;
type Voictent2Configuration = InMemoryVoictentConfiguration<
  'voictent-2',
  number
>;
type SerializedVoictentConfiguration =
  SerializableVoictentConfiguration<'serialized'>;

digikikify({
  inputVoictentList: [
    new InMemoryVoictent<Voictent1Configuration>({
      gepp: 'voictent-1',
      initialHubblepupTuple: ['a', 'b'],
    }),
    new InMemoryVoictent<Voictent2Configuration>({
      gepp: 'voictent-2',
      initialHubblepupTuple: [1, 2],
    }),
    new SerializableVoictent<SerializedVoictentConfiguration>({
      nameSpace: 'exampleInputVoictent',
      gepp: 'serialized',
      initialHubblepupTuple: [],
    }),
  ],
  initialQuirmTuple: [],
  estinantTuple: [
    buildAddMetadataForSerialization<
      Voictent1Configuration,
      SerializedVoictentConfiguration
    >({
      inputGepp: 'voictent-1',
      outputGepp: 'serialized',
    }),
    buildAddMetadataForSerialization<
      Voictent2Configuration,
      SerializedVoictentConfiguration
    >({
      inputGepp: 'voictent-2',
      outputGepp: 'serialized',
    }),
  ],
  onHubblepupAddedToVoictents: () => {},
});
