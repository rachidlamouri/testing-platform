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
import { getCustomTypedDatum } from '../package-agnostic-utilities/typed-datum/customTypedDatum';
import { AbstractSerializableVoque } from './abstractSerializableVoictent';
import { buildAddMetadataForSerialization } from './buildAddMetadataForSerialization';
import { JsonSerializableVoictent } from './jsonSerializableVoictent';
import {
  SerializableTypeNameVoque,
  SERIALIZABLE_TYPE_NAME_GEPP,
} from './serializableTypeName';

type SerializedConfiguration = AbstractSerializableVoque<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-get-custom-typed-datum',
});

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
