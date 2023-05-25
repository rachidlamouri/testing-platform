import { digikikify2 } from '../core/engine/digikikify';
import { InMemoryOdeshin2Voictent } from '../core/engine/inMemoryOdeshinVoictent2';
import {
  DATUM_TEST_CASE_INPUT_GEPP,
  DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
  DatumTestCaseInputVoque,
} from '../custom/programmable-units/datum-test-case-input/datumTestCaseInput';
import { ProgramFileCache } from '../utilities/programFileCache';
import { buildAddMetadataForSerialization } from './buildAddMetadataForSerialization';
import { JsonSerializableVoictent } from './jsonSerializableVoictent';
import { AbstractSerializableVoque } from './abstractSerializableVoictent';

type SerializedConfiguration = AbstractSerializableVoque<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-build-add-metadata-for-serialization',
});

/**
 * Example program to test the "buildAddMetadataForSerialization" function.
 * Commit the output to get a signal when the functionality changes.
 */
digikikify2({
  inputVoictentList: [
    new InMemoryOdeshin2Voictent<DatumTestCaseInputVoque>({
      gepp: DATUM_TEST_CASE_INPUT_GEPP,
      initialHubblepupTuple: DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
    }),
    new JsonSerializableVoictent<SerializedConfiguration>({
      gepp: 'serialized',
      programFileCache,
      initialHubblepupTuple: [],
    }),
  ],
  estinantTuple: [
    buildAddMetadataForSerialization<
      DatumTestCaseInputVoque,
      SerializedConfiguration
    >({
      inputGepp: DATUM_TEST_CASE_INPUT_GEPP,
      outputGepp: 'serialized',
    }),
  ],
});
