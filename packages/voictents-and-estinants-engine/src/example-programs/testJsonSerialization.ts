import { digikikify2 } from '../core/engine/digikikify';
import {
  DATUM_TEST_CASE_INPUT_GEPP,
  DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
} from '../adapted-programs/programmable-units/datum-test-case-input/datumTestCaseInput';
import { ProgramFileCache } from '../utilities/programFileCache';
import { JsonSerializableVoictent } from './jsonSerializableVoictent';
import { AbstractSerializableVoque } from './abstractSerializableVoictent';

type SerializedConfiguration = AbstractSerializableVoque<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-json-serialization',
});

/**
 * Tests the "JsonSerializableVoictent" by initializing it with data.
 *
 * @note Running the collection through the engine is technically unnecessary,
 * but it allows the program modeler to construct a snapshot digest of this file
 */
digikikify2({
  inputVoictentList: [
    new JsonSerializableVoictent<SerializedConfiguration>({
      gepp: 'serialized',
      programFileCache,
      initialHubblepupPelueTuple: DATUM_TEST_CASE_INPUT_ODESHIN_LIST.map<
        SerializedConfiguration['hubblepupPelue']
      >((datumTestCaseInput) => {
        return {
          sourceGepp: DATUM_TEST_CASE_INPUT_GEPP,
          serializableId: datumTestCaseInput.zorn,
          datum: datumTestCaseInput.grition,
        };
      }),
    }),
  ],
  estinantTuple: [],
});
