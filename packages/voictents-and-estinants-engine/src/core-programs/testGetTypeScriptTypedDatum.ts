import { Estinant2 } from '../core/types/estinant/estinant';
import { LeftInputHubblepupVicken } from '../core/types/vicken/leftInputVicken';
import { OutputVicken } from '../core/types/vicken/outputVicken';
import { digikikify2 } from '../core/engine/digikikify';
import { InMemoryOdeshin2ListVoictent } from '../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import {
  DATUM_TEST_CASE_INPUT_GEPP,
  DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
  DatumTestCaseInputVoque,
} from '../adapted-programs/programmable-units/datum-test-case-input/datumTestCaseInput';
import { ProgramFileCache } from '../layer-agnostic-utilities/program/programFileCache';
import { getTypeScriptTypedDatum } from '../package-agnostic-utilities/typed-datum/typeScriptTypedDatum';
import { AbstractSerializableVoque } from '../layer-agnostic-utilities/voictent/abstractSerializableVoictent';
import { buildAddMetadataForSerialization } from '../layer-agnostic-utilities/estinant/buildAddMetadataForSerialization';
import { JsonSerializableVoictent } from '../layer-agnostic-utilities/voictent/jsonSerializableVoictent';
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
const getTypedTestCaseInputTypeName: Estinant2<
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
    new InMemoryOdeshin2ListVoictent<DatumTestCaseInputVoque>({
      gepp: DATUM_TEST_CASE_INPUT_GEPP,
      initialHubblepupPelueTuple: DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
    }),
    new InMemoryOdeshin2ListVoictent<SerializableTypeNameVoque>({
      gepp: SERIALIZABLE_TYPE_NAME_GEPP,
      initialHubblepupPelueTuple: [],
    }),
    new JsonSerializableVoictent<SerializedConfiguration>({
      gepp: 'serialized',
      programFileCache,
      initialHubblepupPelueTuple: [],
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
