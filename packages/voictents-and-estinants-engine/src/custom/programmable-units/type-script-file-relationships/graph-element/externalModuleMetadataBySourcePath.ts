import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { ExternalModuleMetadata } from './externalModuleMetadata';

export type ExternalModuleMetadataBySourcePath = Map<
  string,
  ExternalModuleMetadata
>;

export type ExternalModuleMetadataBySourcePathGrition =
  Grition<ExternalModuleMetadataBySourcePath>;

export type ExternalModuleMetadataBySourcePathOdeshin =
  OdeshinFromGrition<ExternalModuleMetadataBySourcePathGrition>;

export const EXTERNAL_MODULE_METADATA_BY_SOURCE_PATH_GEPP =
  'external-module-metadata-by-source-path';

export type ExternalModuleMetadataBySourcePathGepp =
  typeof EXTERNAL_MODULE_METADATA_BY_SOURCE_PATH_GEPP;

export type ExternalModuleMetadataBySourcePathVoictent = Voictent<
  ExternalModuleMetadataBySourcePathGepp,
  ExternalModuleMetadataBySourcePathOdeshin
>;
