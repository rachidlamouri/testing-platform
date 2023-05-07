import { digikikify2 } from '../core/engine/digikikify';
import { InMemoryOdeshinVoictent } from '../core/engine/inMemoryOdeshinVoictent';
import { InMemoryVoque } from '../core/engine/inMemoryVoictent';
import {
  DATUM_TEST_CASE_INPUT_GEPP,
  DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
} from '../custom/programmable-units/datum-test-case-input/datumTestCaseInput';
import { buildAddMetadataForSerialization } from './buildAddMetadataForSerialization';
import { getCustomTypedTestCaseInputTypeName } from './getCustomTypedTestCaseInputTypeName';
import {
  JsonSerializableVoictent,
  JsonSerializableVoque,
} from './jsonSerializableVoictent';

type SerializedConfiguration = JsonSerializableVoque<'serialized'>;
type TypedDatumVoque = InMemoryVoque<'typed-datum', unknown>;

/**
 * Tests the "getCustomTypedDatum" function. Commit the output to get a signal
 * whenever the behavior of this function changes
 */
digikikify2({
  inputVoictentList: [
    new InMemoryOdeshinVoictent({
      gepp: DATUM_TEST_CASE_INPUT_GEPP,
      initialHubblepupTuple: DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
    }),
    new InMemoryOdeshinVoictent({
      gepp: 'typed-datum',
      initialHubblepupTuple: [],
    }),
    new JsonSerializableVoictent<SerializedConfiguration>({
      nameSpace: 'test-get-custom-typed-datum',
      gepp: 'serialized',
      initialHubblepupTuple: [],
    }),
  ],
  estinantTuple: [
    getCustomTypedTestCaseInputTypeName,

    buildAddMetadataForSerialization<TypedDatumVoque, SerializedConfiguration>({
      inputGepp: 'typed-datum',
      outputGepp: 'serialized',
    }),
  ],
});
