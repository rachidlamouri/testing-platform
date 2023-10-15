import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

/**
 * The expected ci.sh generated from the CI model
 */
type SerializedCiModel = {
  id: string;
  subitem: string;
};

export const SERIALIZED_CI_MODEL_COLLECTION_ID = 'serialized-ci-model';

type SerializedCiModelCollectionId = typeof SERIALIZED_CI_MODEL_COLLECTION_ID;

export type SerializedCiModelStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    SerializedCiModelCollectionId,
    SerializedCiModel
  >;
