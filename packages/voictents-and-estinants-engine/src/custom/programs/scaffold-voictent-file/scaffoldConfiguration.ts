import { Hubblepup } from '../../adapter/hubblepup';
import { Voictent } from '../../adapter/voictent';

export type ScaffoldConfiguration = {
  filePath: string;
};

export type ScaffoldConfigurationHubblepup = Hubblepup<ScaffoldConfiguration>;

export const SCAFFOLD_CONFIGURATION_GEPP = 'scaffold-configuration';

export type ScaffoldConfigurationGepp = typeof SCAFFOLD_CONFIGURATION_GEPP;

export type ScaffoldConfigurationVoictent = Voictent<
  ScaffoldConfigurationGepp,
  ScaffoldConfigurationHubblepup
>;
