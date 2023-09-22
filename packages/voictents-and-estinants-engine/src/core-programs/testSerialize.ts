import { digikikify2 } from '../core/engine/digikikify';
import {
  DATUM_TEST_CASE_INPUT_GEPP,
  DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
} from '../adapted-programs/programmable-units/datum-test-case-input/datumTestCaseInput';
import { ProgramFileCache } from '../utilities/programFileCache';
import { SerializableVoictent } from './serializableVoictent';
import { AbstractSerializableVoque } from './abstractSerializableVoictent';

type SerializedConfiguration = AbstractSerializableVoque<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-serialize',
});

/**
 * Tests the "SerializableVoictent" by initializing it with data.
 *
 * @note Running the collection through the engine is technically unnecessary,
 * but it allows the program modeler to construct a snapshot digest of this file
 */
digikikify2({
  inputVoictentList: [
    // eslint-disable-next-line no-new
    new SerializableVoictent<SerializedConfiguration>({
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
