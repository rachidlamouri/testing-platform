import { digikikify2 } from '../core/engine/digikikify';
import { InMemoryOdeshinVoictent } from '../core/engine/inMemoryOdeshinVoictent';
import {
  DATUM_TEST_CASE_INPUT_GEPP,
  DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
} from '../custom/programmable-units/datum-test-case-input/datumTestCaseInput';
import { buildAddMetadataForSerialization } from './buildAddMetadataForSerialization';
import { getTypedTestCaseInputTypeName } from './getTypedTestCaseInputTypeName';
import {
  JsonSerializableVoictent,
  JsonSerializableVoque,
} from './jsonSerializableVoictent';
import {
  SERIALIZABLE_TYPE_NAME_GEPP,
  SerializableTypeNameVoque,
} from './serializableTypeName';

type SerializedConfiguration = JsonSerializableVoque<'serialized'>;

/**
 * Tests the "getTypeScriptTypedDatum" function. Commit the output to keep track
 * of when the function's behavior changes (which it shouldn't)
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
      nameSpace: 'test-get-type-script-typed-datum',
      gepp: 'serialized',
      initialHubblepupTuple: [],
    }),
  ],
  estinantTuple: [
    getTypedTestCaseInputTypeName,

    buildAddMetadataForSerialization<
      SerializableTypeNameVoque,
      SerializedConfiguration
    >({
      inputGepp: SERIALIZABLE_TYPE_NAME_GEPP,
      outputGepp: 'serialized',
    }),
  ],
});
