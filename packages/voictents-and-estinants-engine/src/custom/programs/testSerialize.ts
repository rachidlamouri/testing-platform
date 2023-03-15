import { digikikify } from '../../type-script-adapter/digikikify';
import { serializeTestCaseResultEstinant } from '../serialize-test-case/serializeTestCaseResult';
import {
  SERIALIZE_TEST_CASE_INPUT_GEPP,
  SERIALIZE_TEST_CASE_INPUT_TUPLE,
} from '../serialize-test-case/serializeTestCaseInput';
import { buildBasicQuirmDebugger } from '../debugger/quirmDebugger';

digikikify({
  initialVoictentsByGepp: {
    [SERIALIZE_TEST_CASE_INPUT_GEPP]: SERIALIZE_TEST_CASE_INPUT_TUPLE,
  },
  estinantTuple: [serializeTestCaseResultEstinant],
  quirmDebugger: buildBasicQuirmDebugger('testSerialize'),
});
