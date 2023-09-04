import { StandardInMemoryVoque } from '../../../core/engine/inMemoryVoque';

export enum FileTypeName {
  Estinant = 'estinant',
  Hubblepup = 'hubblepup',
}
export const validTypeNameList = Object.values(FileTypeName) as string[];

/**
 * The filePath to create a Voque outline within
 */
export type ScaffoldConfiguration = {
  filePath: string;
  typeName: FileTypeName;
};

export const SCAFFOLD_CONFIGURATION_GEPP = 'scaffold-configuration';

type ScaffoldConfigurationGepp = typeof SCAFFOLD_CONFIGURATION_GEPP;

export type ScaffoldConfigurationVoque = StandardInMemoryVoque<
  ScaffoldConfigurationGepp,
  ScaffoldConfiguration
>;
