import { getTypeScriptTypedDatum } from '../../../utilities/typed-datum/type-script/typeScriptTypedDatum';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  DatumTestCaseInputVoictent,
  DATUM_TEST_CASE_INPUT_GEPP,
} from '../../programmable-units/datum-test-case-input/datumTestCaseInput';
import {
  TypeScriptDatumTypeNameVoictent,
  TYPE_SCRIPT_DATUM_TYPE_NAME_GEPP,
} from './typeScriptDatumTypeName';

export const datumTestCaseInputToTypeScriptDatumTypeName = buildEstinant({
  name: 'datumTestCaseInputToTypeScriptDatumTypeName',
})
  .fromGrition<DatumTestCaseInputVoictent>({
    gepp: DATUM_TEST_CASE_INPUT_GEPP,
  })
  .toGrition<TypeScriptDatumTypeNameVoictent>({
    gepp: TYPE_SCRIPT_DATUM_TYPE_NAME_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((input) => {
    const typedDatum = getTypeScriptTypedDatum(input);
    return typedDatum.typeName;
  })
  .assemble();
