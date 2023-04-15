import { serialize } from '../../../utilities/typed-datum/serializer/serialize';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  DatumTestCaseInputVoictent,
  DATUM_TEST_CASE_INPUT_GEPP,
} from '../../programmable-units/datum-test-case-input/datumTestCaseInput';
import {
  SerializedDatumVoictent,
  SERIALIZED_DATUM_GEPP,
} from './serializedDatum';

export const datumTestCaseInputToSerializedDatum = buildEstinant({
  name: 'datumTestCaseInputToSerializedDatum',
})
  .fromGrition<DatumTestCaseInputVoictent>({
    gepp: DATUM_TEST_CASE_INPUT_GEPP,
  })
  .toGrition<SerializedDatumVoictent>({
    gepp: SERIALIZED_DATUM_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((input) => {
    const text = serialize(input);
    return text;
  })
  .assemble();
