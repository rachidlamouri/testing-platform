import { getTypeScriptTypedDatum } from '../../../utilities/typed-datum/type-script/typeScriptTypedDatum';
import { buildOnama } from '../../adapter/estinant/onama';
import {
  DatumTestCaseInputVoictent,
  DATUM_TEST_CASE_INPUT_GEPP,
} from '../../programmable-units/datum-test-case-input/datumTestCaseInput';
import {
  TypeScriptDatumTypeNameVoictent,
  TYPE_SCRIPT_DATUM_TYPE_NAME_GEPP,
} from './typeScriptDatumTypeName';

export const datumTestCaseInputToTypeScriptDatumTypeName = buildOnama<
  DatumTestCaseInputVoictent,
  TypeScriptDatumTypeNameVoictent
>({
  inputGepp: DATUM_TEST_CASE_INPUT_GEPP,
  outputGepp: TYPE_SCRIPT_DATUM_TYPE_NAME_GEPP,
  pinbe: (input) => {
    const typedDatum = getTypeScriptTypedDatum(input);
    return typedDatum.typeName;
  },
});
