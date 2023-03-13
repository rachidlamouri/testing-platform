import { serialize } from '../../../utilities/typed-datum/serializer/serialize';
import { buildOnama } from '../../adapter/estinant/onama';
import {
  DatumTestCaseInputVoictent,
  DATUM_TEST_CASE_INPUT_GEPP,
} from '../../programmable-units/datum-test-case-input/datumTestCaseInput';
import {
  SerializedDatumVoictent,
  SERIALIZED_DATUM_GEPP,
} from './serializedDatum';

export const datumTestCaseInputToSerializedDatum = buildOnama<
  DatumTestCaseInputVoictent,
  SerializedDatumVoictent
>({
  inputGepp: DATUM_TEST_CASE_INPUT_GEPP,
  outputGepp: SERIALIZED_DATUM_GEPP,
  pinbe: (input) => {
    const text = serialize(input);
    return text;
  },
});
