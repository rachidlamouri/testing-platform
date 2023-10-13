import { ProgrammedTransform2 } from '../../core/types/programmed-transform/programmedTransform';
import { LeftInputItemStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/leftInputStreamConnectionMetatype';
import { OutputStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/outputStreamConnectionMetatype';
import { RightInputCollectionStreamConnectionMetatype } from '../../core/types/stream-connection-metatype/rightInputStreamConnectionMetatype';
import { runEngine2 } from '../../core/engine/runEngine';
import { InMemoryCollection } from '../../layer-agnostic-utilities/collection/inMemoryCollection';
import { StandardInMemoryStreamMetatype } from '../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { ProgramFileCache } from '../../layer-agnostic-utilities/program/programFileCache';
import { AbstractSerializableStreamMetatype } from '../../layer-agnostic-utilities/collection/abstractSerializableCollection';
import { buildAddMetadataForSerialization } from '../../layer-agnostic-utilities/programmed-transform/buildAddMetadataForSerialization';
import { SerializableCollection } from '../../layer-agnostic-utilities/collection/serializableCollection';

type Voictent1Voque = StandardInMemoryStreamMetatype<'voictent-1', number>;
type Voictent2Voque = StandardInMemoryStreamMetatype<'voictent-2', string>;
type Voictent3Voque = StandardInMemoryStreamMetatype<'voictent-3', string>;
type SerializedVoque = AbstractSerializableStreamMetatype<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-joining-one-to-voictent',
});

/**
 * Joins each item in the left collection to the entire right collection
 */
const gatherCollection: ProgrammedTransform2<
  LeftInputItemStreamConnectionMetatype<Voictent1Voque>,
  [RightInputCollectionStreamConnectionMetatype<Voictent2Voque>],
  OutputStreamConnectionMetatype<[Voictent3Voque]>
> = {
  version: 2,
  name: 'gatherCollection',
  leftInputStreamConfiguration: {
    collectionId: 'voictent-1',
    isCollectionStream: false,
  },
  rightInputStreamConfigurationTuple: [
    {
      collectionId: 'voictent-2',
      isCollectionStream: true,
      getRightKeyTuple: undefined,
      getRightKey: undefined,
    },
  ],
  outputStreamConfiguration: {
    collectionIdTuple: ['voictent-3'],
  },
  transform: (leftInput, rightInput) => {
    const serializedRightInput = `[${rightInput.join(', ')}]`;

    const output = `${leftInput.item}-${serializedRightInput}`;

    return {
      'voictent-3': [output],
    };
  },
};

/**
 * Tests joining each item in the left collection to the entire right collection
 *
 * @todo debug the program snapshot for this one. The output collection appears to be out of the expected order (1, 2). Which is ok, but I want to know why.
 *
 * @canonicalComment
 *
 * @readableName testJoiningOneItemToCollection
 */
runEngine2({
  inputCollectionList: [
    new InMemoryCollection<Voictent1Voque>({
      collectionId: 'voictent-1',
      initialItemEggTuple: [1, 2],
    }),
    new InMemoryCollection<Voictent2Voque>({
      collectionId: 'voictent-2',
      initialItemEggTuple: ['a', 'b', 'c', 'd'],
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
  programmedTransformTuple: [
    gatherCollection,

    buildAddMetadataForSerialization<Voictent3Voque, SerializedVoque>({
      inputCollectionId: 'voictent-3',
      outputCollectionId: 'serialized',
    }),
  ],
  onFinish: (runtimeStatistics) => {
    programFileCache.writeRuntimeSnapshot(runtimeStatistics);
  },
});
