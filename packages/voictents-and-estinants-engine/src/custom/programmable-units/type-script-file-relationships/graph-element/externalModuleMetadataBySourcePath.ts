import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../../adapter/voictent';
import { ExternalModuleMetadata } from './externalModuleMetadata';

/**
 * Mapping of external modules by source path for easier lookups
 */
export type ExternalModuleMetadataBySourcePath = {
  zorn: string;
  grition: Map<string, ExternalModuleMetadata>;
};

export const EXTERNAL_MODULE_METADATA_BY_SOURCE_PATH_GEPP =
  'external-module-metadata-by-source-path';

export type ExternalModuleMetadataBySourcePathGepp =
  typeof EXTERNAL_MODULE_METADATA_BY_SOURCE_PATH_GEPP;

export type ExternalModuleMetadataBySourcePathVoictent = Voictent<
  ExternalModuleMetadataBySourcePathGepp,
  ExternalModuleMetadataBySourcePath
>;

export type ExternalModuleMetadataBySourcePathVoque = InMemoryOdeshin2Voque<
  ExternalModuleMetadataBySourcePathGepp,
  ExternalModuleMetadataBySourcePath
>;
