import { digikikify2 } from '../core/engine/digikikify';
import { InMemoryOdeshin2ListVoictent } from '../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  DATUM_TEST_CASE_INPUT_GEPP,
  DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
  DatumTestCaseInputVoque,
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
digikikify2({
  inputVoictentList: [
    new InMemoryOdeshin2ListVoictent<DatumTestCaseInputVoque>({
      collectionId: DATUM_TEST_CASE_INPUT_GEPP,
      initialItemEggTuple: DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
    }),
    new JsonSerializableCollection<SerializedConfiguration>({
      collectionId: 'serialized',
      programFileCache,
      initialItemEggTuple: [],
    }),
  ],
  estinantTuple: [
    buildAddMetadataForSerialization<
      DatumTestCaseInputVoque,
      SerializedConfiguration
    >({
      inputCollectionId: DATUM_TEST_CASE_INPUT_GEPP,
      outputCollectionId: 'serialized',
    }),
  ],
});
