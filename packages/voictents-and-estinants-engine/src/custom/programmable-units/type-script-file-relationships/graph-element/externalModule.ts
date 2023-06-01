import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../../adapter/voictent';

/**
 * Represents a first or third party node modules
 */
export type ExternalModule = {
  zorn: string;
  instanceId: string;
  sourcePath: string;
};

export const EXTERNAL_MODULE_GEPP = 'external-module';

export type ExternalModuleGepp = typeof EXTERNAL_MODULE_GEPP;

export type ExternalModuleVoictent = Voictent<
  ExternalModuleGepp,
  ExternalModule
>;

export type ExternalModuleVoque = InMemoryOdeshin2Voque<
  ExternalModuleGepp,
  ExternalModule
>;
