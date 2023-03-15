import { digikikify } from '../../../type-script-adapter/digikikify';
import {
  DATUM_TEST_CASE_INPUT_GEPP,
  DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
} from '../../programmable-units/datum-test-case-input/datumTestCaseInput';
import { datumTestCaseInputToTypeScriptDatumTypeName } from './datumTestCaseInputToTypeScriptDatumTypeName';
import { datumTestCaseInputToCustomDatumTypeName } from './datumTestCaseInputToCustomDatumTypeName';
import { datumTestCaseInputToSerializedDatum } from './datumTestCaseInputToSerializedDatum';
import { buildBasicQuirmDebugger } from '../../debugger/quirmDebugger';

digikikify({
  initialVoictentsByGepp: {
    [DATUM_TEST_CASE_INPUT_GEPP]: DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
  },
  estinantTuple: [
    datumTestCaseInputToTypeScriptDatumTypeName,
    datumTestCaseInputToCustomDatumTypeName,
    datumTestCaseInputToSerializedDatum,
  ],
  quirmDebugger: buildBasicQuirmDebugger('testTypedDatum'),
});
