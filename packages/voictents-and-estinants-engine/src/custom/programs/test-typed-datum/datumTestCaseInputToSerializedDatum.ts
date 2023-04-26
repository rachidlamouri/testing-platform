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

/**
 * Tests converting a datum to its serialized representation using a custom
 * serializer.
 *
 * @todo The QuirmDebugger currently uses the serialization function to
 * serialize the output for readability. That means this program depends on the
 * serialize function that it's testing. So we should fix that, and I'm
 * currently not sure how. Good luck future me.
 */
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
