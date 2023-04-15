import { getCustomTypedDatum } from '../../../utilities/typed-datum/customTypedDatum';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  DatumTestCaseInputVoictent,
  DATUM_TEST_CASE_INPUT_GEPP,
} from '../../programmable-units/datum-test-case-input/datumTestCaseInput';
import {
  CustomDatumTypeNameVoictent,
  CUSTOM_DATUM_TYPE_NAME_GEPP,
} from './customDatumTypeName';

export const datumTestCaseInputToCustomDatumTypeName = buildEstinant({
  name: 'datumTestCaseInputToCustomDatumTypeName',
})
  .fromGrition<DatumTestCaseInputVoictent>({
    gepp: DATUM_TEST_CASE_INPUT_GEPP,
  })
  .toGrition<CustomDatumTypeNameVoictent>({
    gepp: CUSTOM_DATUM_TYPE_NAME_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((input) => {
    const typedDatum = getCustomTypedDatum(input);
    return typedDatum.typeName;
  })
  .assemble();
