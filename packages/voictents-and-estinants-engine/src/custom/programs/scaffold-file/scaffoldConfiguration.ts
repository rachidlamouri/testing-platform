import { StandardInMemoryVoque } from '../../../core/engine/inMemoryVoque';

/**
 * The filePath to create a Voque outline within
 */
type ScaffoldConfiguration = {
  filePath: string;
};

export const SCAFFOLD_CONFIGURATION_GEPP = 'scaffold-configuration';

type ScaffoldConfigurationGepp = typeof SCAFFOLD_CONFIGURATION_GEPP;

export type ScaffoldConfigurationVoque = StandardInMemoryVoque<
  ScaffoldConfigurationGepp,
  ScaffoldConfiguration
>;
