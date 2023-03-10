import { digikikify } from '../../type-script-adapter/digikikify';
import { debugOdeshin } from '../debugger/debugOdeshin';
import { serializeTestCaseResultEstinant } from '../serialize-test-case/serializeTestCaseResult';
import {
  SERIALIZE_TEST_CASE_INPUT_GEPP,
  SERIALIZE_TEST_CASE_INPUT_TUPLE,
} from '../serialize-test-case/serializeTestCaseInput';

digikikify({
  initialVoictentsByGepp: {
    [SERIALIZE_TEST_CASE_INPUT_GEPP]: SERIALIZE_TEST_CASE_INPUT_TUPLE,
  },
  estinantTuple: [serializeTestCaseResultEstinant],
  onHubblepupAddedToVoictents: debugOdeshin,
});
