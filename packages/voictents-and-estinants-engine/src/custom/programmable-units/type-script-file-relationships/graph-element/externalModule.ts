import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';

export type ExternalModule = {
  instanceId: string;
  sourcePath: string;
};

export type ExternalModuleGrition = Grition<ExternalModule>;

export type ExternalModuleOdeshin = OdeshinFromGrition<ExternalModuleGrition>;

export const EXTERNAL_MODULE_GEPP = 'external-module';

export type ExternalModuleGepp = typeof EXTERNAL_MODULE_GEPP;

export type ExternalModuleVoictent = Voictent<
  ExternalModuleGepp,
  ExternalModuleOdeshin
>;
