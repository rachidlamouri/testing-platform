import { InMemoryOdeshin2ListVoque } from '../../../core/engine/inMemoryOdeshinVoictent2';

/**
 * The expected ci.sh generated from the CI model
 */
type SerializedCiModel = {
  zorn: string;
  grition: string;
};

export const SERIALIZED_CI_MODEL_GEPP = 'serialized-ci-model';

type SerializedCiModelGepp = typeof SERIALIZED_CI_MODEL_GEPP;

export type SerializedCiModelVoque = InMemoryOdeshin2ListVoque<
  SerializedCiModelGepp,
  SerializedCiModel
>;
