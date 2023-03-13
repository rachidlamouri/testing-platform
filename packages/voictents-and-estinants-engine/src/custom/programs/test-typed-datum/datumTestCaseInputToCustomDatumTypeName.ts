import { getCustomTypedDatum } from '../../../utilities/typed-datum/customTypedDatum';
import { buildOnama } from '../../adapter/estinant/onama';
import {
  DatumTestCaseInputVoictent,
  DATUM_TEST_CASE_INPUT_GEPP,
} from '../../programmable-units/datum-test-case-input/datumTestCaseInput';
import {
  CustomDatumTypeNameVoictent,
  CUSTOM_DATUM_TYPE_NAME_GEPP,
} from './customDatumTypeName';

export const datumTestCaseInputToCustomDatumTypeName = buildOnama<
  DatumTestCaseInputVoictent,
  CustomDatumTypeNameVoictent
>({
  inputGepp: DATUM_TEST_CASE_INPUT_GEPP,
  outputGepp: CUSTOM_DATUM_TYPE_NAME_GEPP,
  pinbe: (input) => {
    const typedDatum = getCustomTypedDatum(input);
    return typedDatum.typeName;
  },
});
