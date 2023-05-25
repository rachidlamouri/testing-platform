import { Estinant2 } from '../core/engine-shell/estinant/estinant';
import { LeftInputHubblepupVicken } from '../core/engine-shell/vicken/leftInputVicken';
import { OutputVicken } from '../core/engine-shell/vicken/outputVicken';
import { digikikify2 } from '../core/engine/digikikify';
import { InMemoryOdeshin2Voictent } from '../core/engine/inMemoryOdeshinVoictent2';
import {
  DATUM_TEST_CASE_INPUT_GEPP,
  DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
  DatumTestCaseInputVoque,
} from '../custom/programmable-units/datum-test-case-input/datumTestCaseInput';
import { ProgramFileCache } from '../utilities/programFileCache';
import { getTypeScriptTypedDatum } from '../utilities/typed-datum/type-script/typeScriptTypedDatum';
import { AbstractSerializableVoque } from './abstractSerializableVoictent';
import { buildAddMetadataForSerialization } from './buildAddMetadataForSerialization';
import { JsonSerializableVoictent } from './jsonSerializableVoictent';
import {
  SERIALIZABLE_TYPE_NAME_GEPP,
  SerializableTypeNameVoque,
} from './serializableTypeName';

type SerializedConfiguration = AbstractSerializableVoque<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-get-type-script-typed-datum',
});

/**
 * Runs each datum test case input through "getTypescriptTypedDatum". It fowards
 * the resulting type name for manual verification, since the input datum and
 * output datum are the same.
 */
export const getTypedTestCaseInputTypeName: Estinant2<
  LeftInputHubblepupVicken<DatumTestCaseInputVoque>,
  [],
  OutputVicken<[SerializableTypeNameVoque]>
> = {
  version: 2,
  name: 'getTypedTestCaseInputTypeName',
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

    const typedDatum = getTypeScriptTypedDatum(testCaseInput);

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
 * Tests the "getTypeScriptTypedDatum" function. Commit the output to keep track
 * of when the function's behavior changes (which it shouldn't)
 */
digikikify2({
  inputVoictentList: [
    new InMemoryOdeshin2Voictent<DatumTestCaseInputVoque>({
      gepp: DATUM_TEST_CASE_INPUT_GEPP,
      initialHubblepupTuple: DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
    }),
    new InMemoryOdeshin2Voictent<SerializableTypeNameVoque>({
      gepp: SERIALIZABLE_TYPE_NAME_GEPP,
      initialHubblepupTuple: [],
    }),
    new JsonSerializableVoictent<SerializedConfiguration>({
      gepp: 'serialized',
      programFileCache,
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
