import { ProgrammedTransform2 } from '../core/types/programmed-transform/programmedTransform';
import { LeftInputItemStreamConnectionMetatype } from '../core/types/stream-connection-metatype/leftInputStreamConnectionMetatype';
import { OutputStreamConnectionMetatype } from '../core/types/stream-connection-metatype/outputStreamConnectionMetatype';
import { runEngine2 } from '../core/engine/runEngine';
import { InMemoryIdentifiableItem3Collection } from '../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  DATUM_TEST_CASE_INPUT_COLLECTION_ID,
  DATUM_TEST_CASE_INPUT_IDENTIFIABLE_ITEM_LIST,
  DatumTestCaseInputStreamMetatype,
} from '../adapted-programs/programmable-units/datum-test-case-input/datumTestCaseInput';
import { ProgramFileCache } from '../layer-agnostic-utilities/program/programFileCache';
import { getTypeScriptTypedDatum } from '../package-agnostic-utilities/typed-datum/typeScriptTypedDatum';
import { AbstractSerializableStreamMetatype } from '../layer-agnostic-utilities/collection/abstractSerializableCollection';
import { buildAddMetadataForSerialization } from '../layer-agnostic-utilities/programmed-transform/buildAddMetadataForSerialization';
import { JsonSerializableCollection } from '../layer-agnostic-utilities/collection/jsonSerializableCollection';
import {
  SERIALIZABLE_TYPE_NAME_COLLECTION_ID,
  SerializableTypeNameStreamMetatype,
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
  LeftInputItemStreamConnectionMetatype<DatumTestCaseInputStreamMetatype>,
  [],
  OutputStreamConnectionMetatype<[SerializableTypeNameStreamMetatype]>
> = {
  name: 'getTypedTestCaseInputTypeName',
  leftInputStreamConfiguration: {
    collectionId: DATUM_TEST_CASE_INPUT_COLLECTION_ID,
    isCollectionStream: false,
  },
  rightInputStreamConfigurationTuple: [],
  outputStreamConfiguration: {
    collectionIdTuple: [SERIALIZABLE_TYPE_NAME_COLLECTION_ID],
  },
  transform: (input) => {
    const inputIdentifiableItem = input.item;
    const testCaseInput = inputIdentifiableItem.subitem;

    const typedDatum = getTypeScriptTypedDatum(testCaseInput);

    const output = {
      id: inputIdentifiableItem.id,
      subitem: {
        typeName: typedDatum.typeName,
      },
    };

    return {
      [SERIALIZABLE_TYPE_NAME_COLLECTION_ID]: [output],
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
    new InMemoryIdentifiableItem3Collection<DatumTestCaseInputStreamMetatype>({
      collectionId: DATUM_TEST_CASE_INPUT_COLLECTION_ID,
      initialItemEggTuple: DATUM_TEST_CASE_INPUT_IDENTIFIABLE_ITEM_LIST,
    }),
    new InMemoryIdentifiableItem3Collection<SerializableTypeNameStreamMetatype>(
      {
        collectionId: SERIALIZABLE_TYPE_NAME_COLLECTION_ID,
        initialItemEggTuple: [],
      },
    ),
    new JsonSerializableCollection<SerializedConfiguration>({
      collectionId: 'serialized',
      programFileCache,
      initialItemEggTuple: [],
    }),
  ],
  programmedTransformTuple: [
    getTypedTestCaseInputTypeName,

    buildAddMetadataForSerialization<
      SerializableTypeNameStreamMetatype,
      SerializedConfiguration
    >({
      inputCollectionId: SERIALIZABLE_TYPE_NAME_COLLECTION_ID,
      outputCollectionId: 'serialized',
    }),
  ],
});
