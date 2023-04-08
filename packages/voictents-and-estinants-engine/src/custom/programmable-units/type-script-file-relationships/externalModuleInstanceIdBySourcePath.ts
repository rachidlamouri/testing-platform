import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type ExternalModuleInstanceIdBySourcePath = Map<string, string>;

export type ExternalModuleInstanceIdBySourcePathGrition =
  Grition<ExternalModuleInstanceIdBySourcePath>;

export type ExternalModuleInstanceIdBySourcePathOdeshin =
  OdeshinFromGrition<ExternalModuleInstanceIdBySourcePathGrition>;

export const EXTERNAL_MODULE_INSTANCE_ID_BY_SOURCE_PATH_GEPP =
  'external-module-instance-id-by-source-path';

export type ExternalModuleInstanceIdBySourcePathGepp =
  typeof EXTERNAL_MODULE_INSTANCE_ID_BY_SOURCE_PATH_GEPP;

export type ExternalModuleInstanceIdBySourcePathVoictent = Voictent<
  ExternalModuleInstanceIdBySourcePathGepp,
  ExternalModuleInstanceIdBySourcePathOdeshin
>;
