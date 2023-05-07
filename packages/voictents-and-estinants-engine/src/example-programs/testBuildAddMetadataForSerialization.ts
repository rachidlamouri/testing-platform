import { digikikify2 } from '../core/engine/digikikify';
import { InMemoryOdeshinVoictent } from '../core/engine/inMemoryOdeshinVoictent';
import {
  DATUM_TEST_CASE_INPUT_GEPP,
  DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
} from '../custom/programmable-units/datum-test-case-input/datumTestCaseInput';
import { buildAddMetadataForSerialization } from './buildAddMetadataForSerialization';
import {
  JsonSerializableVoictent,
  JsonSerializableVoque,
} from './jsonSerializableVoictent';

type SerializedConfiguration = JsonSerializableVoque<'serialized'>;

/**
 * Example program to test the "buildAddMetadataForSerialization" function.
 * Commit the output to get a signal when the functionality changes.
 */
digikikify2({
  inputVoictentList: [
    new InMemoryOdeshinVoictent({
      gepp: DATUM_TEST_CASE_INPUT_GEPP,
      initialHubblepupTuple: DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
    }),
    new JsonSerializableVoictent<SerializedConfiguration>({
      nameSpace: 'test-build-add-metadata-for-serialization',
      gepp: 'serialized',
      initialHubblepupTuple: [],
    }),
  ],
  estinantTuple: [
    buildAddMetadataForSerialization({
      inputGepp: DATUM_TEST_CASE_INPUT_GEPP,
      outputGepp: 'serialized',
    }),
  ],
});
