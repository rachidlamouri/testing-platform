import { runEngine2 } from '../core/engine/runEngine';
import {
  DATUM_TEST_CASE_INPUT_COLLECTION_ID,
  DATUM_TEST_CASE_INPUT_IDENTIFIABLE_ITEM_LIST,
} from '../adapted-programs/programmable-units/datum-test-case-input/datumTestCaseInput';
import { ProgramFileCache } from '../layer-agnostic-utilities/program/programFileCache';
import { SerializableCollection } from '../layer-agnostic-utilities/collection/serializableCollection';
import { AbstractSerializableStreamMetatype } from '../layer-agnostic-utilities/collection/abstractSerializableCollection';

type SerializedConfiguration = AbstractSerializableStreamMetatype<'serialized'>;

const programFileCache = new ProgramFileCache({
  namespace: 'test-serialize',
});

/**
 * Tests the "SerializableCollection" by initializing it with data.
 *
 * @note Running the collection through the engine is technically unnecessary,
 * but it allows the program modeler to construct a snapshot digest of this file
 *
 * @canonicalComment
 */
runEngine2({
  inputCollectionList: [
    // eslint-disable-next-line no-new
    new SerializableCollection<SerializedConfiguration>({
      collectionId: 'serialized',
      programFileCache,
      initialItemEggTuple: DATUM_TEST_CASE_INPUT_IDENTIFIABLE_ITEM_LIST.map<
        SerializedConfiguration['itemEggStreamable']
      >((datumTestCaseInput) => {
        return {
          sourceCollectionId: DATUM_TEST_CASE_INPUT_COLLECTION_ID,
          serializableId: datumTestCaseInput.id,
          datum: datumTestCaseInput.subitem,
        };
      }),
    }),
  ],
  programmedTransformTuple: [],
});
