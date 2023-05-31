import { StandardInMemoryVoque } from '../../../core/engine/inMemoryVoque';
import { Voictent } from '../../adapter/voictent';

/**
 * The filePath to create a Voque outline within
 */
export type ScaffoldConfiguration = {
  filePath: string;
};

export const SCAFFOLD_CONFIGURATION_GEPP = 'scaffold-configuration';

export type ScaffoldConfigurationGepp = typeof SCAFFOLD_CONFIGURATION_GEPP;

export type ScaffoldConfigurationVoictent = Voictent<
  ScaffoldConfigurationGepp,
  ScaffoldConfiguration
>;

export type ScaffoldConfigurationVoque = StandardInMemoryVoque<
  ScaffoldConfigurationGepp,
  ScaffoldConfiguration
>;
