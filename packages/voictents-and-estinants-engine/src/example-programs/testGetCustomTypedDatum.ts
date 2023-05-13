import { Estinant2 } from '../core/engine-shell/estinant/estinant';
import { LeftInputHubblepupVicken } from '../core/engine-shell/vicken/leftInputVicken';
import { OutputVicken } from '../core/engine-shell/vicken/outputVicken';
import { digikikify2 } from '../core/engine/digikikify';
import { InMemoryOdeshinVoictent } from '../core/engine/inMemoryOdeshinVoictent';
import {
  DATUM_TEST_CASE_INPUT_GEPP,
  DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
  DatumTestCaseInputVoque,
} from '../custom/programmable-units/datum-test-case-input/datumTestCaseInput';
import { getCustomTypedDatum } from '../utilities/typed-datum/customTypedDatum';
import { buildAddMetadataForSerialization } from './buildAddMetadataForSerialization';
import {
  JsonSerializableVoictent,
  JsonSerializableVoque,
} from './jsonSerializableVoictent';
import {
  SerializableTypeNameVoque,
  SERIALIZABLE_TYPE_NAME_GEPP,
} from './serializableTypeName';

type SerializedConfiguration = JsonSerializableVoque<'serialized'>;

/**
 * Runs each datum test case input through
 * "getCustomTypedTestCaseInputTypeName". It fowards the resulting type name for
 * manual verification, since the input datum and output datum are the same.
 */
const getCustomTypedTestCaseInputTypeName: Estinant2<
  LeftInputHubblepupVicken<DatumTestCaseInputVoque>,
  [],
  OutputVicken<[SerializableTypeNameVoque]>
> = {
  version: 2,
  name: 'getCustomTypedTestCaseInputTypeName',
  leftInputAppreffinge: {
    gepp: DATUM_TEST_CASE_INPUT_GEPP,
    isWibiz: false,
  },
  rightInputAppreffingeTuple: [],
  outputAppreffinge: {
    geppTuple: [SERIALIZABLE_TYPE_NAME_GEPP],
  },
  tropoig: (input) => {
    const inputOdeshin = input.hubblepup;
    const testCaseInput = inputOdeshin.grition;

    const typedDatum = getCustomTypedDatum(testCaseInput);

    const output = {
      zorn: inputOdeshin.zorn,
      grition: {
        typeName: typedDatum.typeName,
      },
    };

    return {
      [SERIALIZABLE_TYPE_NAME_GEPP]: [output],
    };
  },
};

/**
 * Tests the "getCustomTypedDatum" function. Commit the output to get a signal
 * whenever the behavior of this function changes
 */
digikikify2({
  inputVoictentList: [
    new InMemoryOdeshinVoictent<DatumTestCaseInputVoque>({
      gepp: DATUM_TEST_CASE_INPUT_GEPP,
      initialHubblepupTuple: DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
    }),
    new InMemoryOdeshinVoictent<SerializableTypeNameVoque>({
      gepp: SERIALIZABLE_TYPE_NAME_GEPP,
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

    buildAddMetadataForSerialization<
      SerializableTypeNameVoque,
      SerializedConfiguration
    >({
      inputGepp: SERIALIZABLE_TYPE_NAME_GEPP,
      outputGepp: 'serialized',
    }),
  ],
});
