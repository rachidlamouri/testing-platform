import { ProgrammedTransform2 } from '../../core/types/programmed-transform/programmedTransform';
import { LeftInputCollectionStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/leftInputStreamConnectionMetatype';
import { OutputStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/outputStreamConnectionMetatype';
import { digikikify2 } from '../../core/engine/digikikify';
import { InMemoryCollection } from '../../layer-agnostic-utilities/collection/inMemoryCollection';
import { StandardInMemoryStreamMetatype } from '../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import { AbstractSerializableStreamMetatype } from '../../layer-agnostic-utilities/collection/abstractSerializableCollection';
import { buildAddMetadataForSerialization } from '../../layer-agnostic-utilities/programmed-transform/buildAddMetadataForSerialization';
import { SerializableCollection } from '../../layer-agnostic-utilities/collection/serializableCollection';

type Voictent1Voque = StandardInMemoryStreamMetatype<'voictent-1', string>;
type Voictent2Voque = StandardInMemoryStreamMetatype<'voictent-2', string[]>;
type SerializedVoque = AbstractSerializableStreamMetatype<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-voictent-input',
});

/**
 * Forwards collection 1 as a whole to collection 2.
 */
const gatherCollection: ProgrammedTransform2<
  LeftInputCollectionStreamConnectionMetatype<Voictent1Voque>,
  [],
  OutputStreamConnectionMetatype<[Voictent2Voque]>
> = {
  version: 2,
  name: 'gatherCollection',
  leftInputStreamConfiguration: {
    collectionId: 'voictent-1',
    isCollectionStream: true,
  },
  rightInputStreamConfigurationTuple: [],
  outputStreamConfiguration: {
    collectionIdTuple: ['voictent-2'],
  },
  transform: (
    input,
  ): OutputStreamConnectionMetatype<
    [Voictent2Voque]
  >['coreTransformOutput'] => {
    return {
      'voictent-2': [input],
    };
  },
};

/**
 * Tests a transform that consumes a collection as a whole.
 *
 * @canonicalComment
 *
 * @readableName testCollectionInput
 */
digikikify2({
  inputVoictentList: [
    new InMemoryCollection<Voictent1Voque>({
      collectionId: 'voictent-1',
      initialItemEggTuple: ['a', 'b', 'c', 'd'],
    }),
    new InMemoryCollection<Voictent2Voque>({
      collectionId: 'voictent-2',
      initialItemEggTuple: [],
    }),
    new SerializableCollection<SerializedVoque>({
      collectionId: 'serialized',
      programFileCache,
      initialItemEggTuple: [],
    }),
  ],
  estinantTuple: [
    gatherCollection,

    buildAddMetadataForSerialization<Voictent2Voque, SerializedVoque>({
      inputCollectionId: 'voictent-2',
      outputCollectionId: 'serialized',
    }),
  ],
  onFinish: (runtimeStatistics) => {
    programFileCache.writeRuntimeSnapshot(runtimeStatistics);
  },
});
