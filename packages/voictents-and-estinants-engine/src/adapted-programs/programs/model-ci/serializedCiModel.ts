import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

/**
 * The expected ci.sh generated from the CI model
 */
type SerializedCiModel = {
  zorn: string;
  grition: string;
};

export const SERIALIZED_CI_MODEL_GEPP = 'serialized-ci-model';

type SerializedCiModelGepp = typeof SERIALIZED_CI_MODEL_GEPP;

export type SerializedCiModelVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    SerializedCiModelGepp,
    SerializedCiModel
  >;
