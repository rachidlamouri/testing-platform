import { runEngine2 } from '../core/engine/runEngine';
import { InMemoryIdentifiableItem3Collection } from '../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  DATUM_TEST_CASE_INPUT_COLLECTION_ID,
  DATUM_TEST_CASE_INPUT_IDENTIFIABLE_ITEM_LIST,
  DatumTestCaseInputStreamMetatype,
} from '../adapted-programs/programmable-units/datum-test-case-input/datumTestCaseInput';
import { ProgramFileCache } from '../layer-agnostic-utilities/program/programFileCache';
import { buildAddMetadataForSerialization } from '../layer-agnostic-utilities/programmed-transform/buildAddMetadataForSerialization';
import { JsonSerializableCollection } from '../layer-agnostic-utilities/collection/jsonSerializableCollection';
import { AbstractSerializableStreamMetatype } from '../layer-agnostic-utilities/collection/abstractSerializableCollection';

type SerializedConfiguration = AbstractSerializableStreamMetatype<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-build-add-metadata-for-serialization',
});

/**
 * Example program to test the "buildAddMetadataForSerialization" function.
 * Commit the output to get a signal when the functionality changes.
 *
 * @canonicalComment
 */
runEngine2({
  inputCollectionList: [
    new InMemoryIdentifiableItem3Collection<DatumTestCaseInputStreamMetatype>({
      collectionId: DATUM_TEST_CASE_INPUT_COLLECTION_ID,
      initialItemEggTuple: DATUM_TEST_CASE_INPUT_IDENTIFIABLE_ITEM_LIST,
    }),
    new JsonSerializableCollection<SerializedConfiguration>({
      collectionId: 'serialized',
      programFileCache,
      initialItemEggTuple: [],
    }),
  ],
  programmedTransformTuple: [
    buildAddMetadataForSerialization<
      DatumTestCaseInputStreamMetatype,
      SerializedConfiguration
    >({
      inputCollectionId: DATUM_TEST_CASE_INPUT_COLLECTION_ID,
      outputCollectionId: 'serialized',
    }),
  ],
});
