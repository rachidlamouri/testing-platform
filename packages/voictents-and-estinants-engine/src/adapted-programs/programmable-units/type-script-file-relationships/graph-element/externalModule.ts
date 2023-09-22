import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';

/**
 * Represents a first or third party node modules
 */
export type ExternalModule = {
  zorn: string;
  instanceId: string;
  sourcePath: string;
};

export const EXTERNAL_MODULE_GEPP = 'external-module';

type ExternalModuleGepp = typeof EXTERNAL_MODULE_GEPP;

export type ExternalModuleVoque = InMemoryOdeshin2ListVoque<
  ExternalModuleGepp,
  ExternalModule
>;
