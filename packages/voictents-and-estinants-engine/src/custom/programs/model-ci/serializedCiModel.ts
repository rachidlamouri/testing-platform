import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../adapter/voictent';

/**
 * The expected ci.sh generated from the CI model
 */
export type SerializedCiModel = {
  zorn: string;
  grition: string;
};

export const SERIALIZED_CI_MODEL_GEPP = 'serialized-ci-model';

export type SerializedCiModelGepp = typeof SERIALIZED_CI_MODEL_GEPP;

export type SerializedCiModelVoictent = Voictent<
  SerializedCiModelGepp,
  SerializedCiModel
>;

export type SerializedCiModelVoque = InMemoryOdeshin2Voque<
  SerializedCiModelGepp,
  SerializedCiModel
>;
