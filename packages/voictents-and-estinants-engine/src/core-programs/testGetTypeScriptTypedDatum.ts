import { ProgrammedTransform2 } from '../core/types/programmed-transform/programmedTransform';
import { LeftInputItemStreamConnectionMetatype } from '../core/types/stream-connection-metatype/leftInputStreamConnectionMetatype';
import { OutputStreamConnectionMetatype } from '../core/types/stream-connection-metatype/outputStreamConnectionMetatype';
import { runEngine2 } from '../core/engine/runEngine';
import { InMemoryOdeshin2ListVoictent } from '../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  DATUM_TEST_CASE_INPUT_GEPP,
  DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
  DatumTestCaseInputVoque,
} from '../adapted-programs/programmable-units/datum-test-case-input/datumTestCaseInput';
import { ProgramFileCache } from '../layer-agnostic-utilities/program/programFileCache';
import { getTypeScriptTypedDatum } from '../package-agnostic-utilities/typed-datum/typeScriptTypedDatum';
import { AbstractSerializableStreamMetatype } from '../layer-agnostic-utilities/collection/abstractSerializableCollection';
import { buildAddMetadataForSerialization } from '../layer-agnostic-utilities/programmed-transform/buildAddMetadataForSerialization';
import { JsonSerializableCollection } from '../layer-agnostic-utilities/collection/jsonSerializableCollection';
import {
  SERIALIZABLE_TYPE_NAME_GEPP,
  SerializableTypeNameVoque,
} from './serializableTypeName';

type SerializedConfiguration = AbstractSerializableStreamMetatype<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-get-type-script-typed-datum',
});

/**
 * Runs each datum test case input through "getTypescriptTypedDatum". It fowards
 * the resulting type name for manual verification, since the input datum and
 * output datum are the same.
 */
const getTypedTestCaseInputTypeName: ProgrammedTransform2<
  LeftInputItemStreamConnectionMetatype<DatumTestCaseInputVoque>,
  [],
  OutputStreamConnectionMetatype<[SerializableTypeNameVoque]>
> = {
  version: 2,
  name: 'getTypedTestCaseInputTypeName',
  leftInputStreamConfiguration: {
    collectionId: DATUM_TEST_CASE_INPUT_GEPP,
    isCollectionStream: false,
  },
  rightInputStreamConfigurationTuple: [],
  outputStreamConfiguration: {
    collectionIdTuple: [SERIALIZABLE_TYPE_NAME_GEPP],
  },
  transform: (input) => {
    const inputOdeshin = input.item;
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
 *
 * @canonicalComment
 */
runEngine2({
  inputCollectionList: [
    new InMemoryOdeshin2ListVoictent<DatumTestCaseInputVoque>({
      collectionId: DATUM_TEST_CASE_INPUT_GEPP,
      initialItemEggTuple: DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
    }),
    new InMemoryOdeshin2ListVoictent<SerializableTypeNameVoque>({
      collectionId: SERIALIZABLE_TYPE_NAME_GEPP,
      initialItemEggTuple: [],
    }),
    new JsonSerializableCollection<SerializedConfiguration>({
      collectionId: 'serialized',
      programFileCache,
      initialItemEggTuple: [],
    }),
  ],
  programmedTransformTuple: [
    getTypedTestCaseInputTypeName,

    buildAddMetadataForSerialization<
      SerializableTypeNameVoque,
      SerializedConfiguration
    >({
      inputCollectionId: SERIALIZABLE_TYPE_NAME_GEPP,
      outputCollectionId: 'serialized',
    }),
  ],
});
