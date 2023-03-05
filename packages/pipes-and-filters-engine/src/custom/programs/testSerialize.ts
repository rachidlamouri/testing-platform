import { digikikify } from '../../type-script-adapter/digikikify';
import { fileUtilities } from '../../utilities/debugger/fileUtilities';
import { debugHubblepup } from '../debugger/debugHubblepup';
import {
  serializeTestCaseResultEstinant,
  SERIALIZE_TEST_CASE_RESULT_GEPP,
} from '../serialize-test-case/serializeTestCaseResult';
import {
  SERIALIZE_TEST_CASE_INPUT_GEPP,
  SERIALIZE_TEST_CASE_INPUT_TUPLE,
} from '../serialize-test-case/serializeTestCaseInput';

digikikify({
  initialVoictentsByGepp: {
    [SERIALIZE_TEST_CASE_INPUT_GEPP]: SERIALIZE_TEST_CASE_INPUT_TUPLE,
  },
  estinantTuple: [serializeTestCaseResultEstinant] as const,
  onHubblepupAddedToVoictents: (quirm) => {
    if (quirm.gepp === SERIALIZE_TEST_CASE_RESULT_GEPP) {
      fileUtilities.writeCacheFile({
        directoryName: quirm.gepp,
        fileName: quirm.hubblepup.identifier,
        text: quirm.hubblepup.grition,
        fileExtensionSuffix: 'json',
      });

      return;
    }

    debugHubblepup(quirm);
  },
});
