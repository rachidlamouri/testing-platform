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
import { getCustomTypedDatum } from '../package-agnostic-utilities/typed-datum/customTypedDatum';
import { AbstractSerializableStreamMetatype } from '../layer-agnostic-utilities/collection/abstractSerializableCollection';
import { buildAddMetadataForSerialization } from '../layer-agnostic-utilities/programmed-transform/buildAddMetadataForSerialization';
import { JsonSerializableCollection } from '../layer-agnostic-utilities/collection/jsonSerializableCollection';
import {
  SerializableTypeNameStreamMetatype,
  SERIALIZABLE_TYPE_NAME_COLLECTION_ID,
} from './serializableTypeName';

type SerializedConfiguration = AbstractSerializableStreamMetatype<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-get-custom-typed-datum',
});

/**
 * Runs each datum test case input through
 * "getCustomTypedTestCaseInputTypeName". It fowards the resulting type name for
 * manual verification, since the input datum and output datum are the same.
 */
const getCustomTypedTestCaseInputTypeName: ProgrammedTransform2<
  LeftInputItemStreamConnectionMetatype<DatumTestCaseInputStreamMetatype>,
  [],
  OutputStreamConnectionMetatype<[SerializableTypeNameStreamMetatype]>
> = {
  version: 2,
  name: 'getCustomTypedTestCaseInputTypeName',
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

    const typedDatum = getCustomTypedDatum(testCaseInput);

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
 * Tests the "getCustomTypedDatum" function. Commit the output to get a signal
 * whenever the behavior of this function changes
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
    getCustomTypedTestCaseInputTypeName,

    buildAddMetadataForSerialization<
      SerializableTypeNameStreamMetatype,
      SerializedConfiguration
    >({
      inputCollectionId: SERIALIZABLE_TYPE_NAME_COLLECTION_ID,
      outputCollectionId: 'serialized',
    }),
  ],
});
