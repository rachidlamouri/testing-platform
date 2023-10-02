import { StandardInMemoryVoque } from '../../../layer-agnostic-utilities/voque/inMemoryVoque';

export enum FileTypeName {
  Program = 'program',
  ProgrammedTransform = 'transform',
  Estinant = 'estinant',
  Streamable = 'streamable',
  Hubblepup = 'hubblepup',
}

const deprecatedFileTypeNameOptionTuple = [
  FileTypeName.Estinant,
  FileTypeName.Hubblepup,
] as const;

type DeprecatedFileTypeName = typeof deprecatedFileTypeNameOptionTuple[number];

export const fileTypeNameByDeprecatedFileTypeName: Record<
  DeprecatedFileTypeName,
  FileTypeName
> = {
  [FileTypeName.Estinant]: FileTypeName.ProgrammedTransform,
  [FileTypeName.Hubblepup]: FileTypeName.Streamable,
};

export const isDeprecatedFileTypeName = (
  name: FileTypeName,
): name is DeprecatedFileTypeName => {
  return (deprecatedFileTypeNameOptionTuple as readonly string[]).includes(
    name,
  );
};

export const validTypeNameList = Object.values(FileTypeName) as string[];

/**
 * The filePath to create a Voque outline within
 */
export type ScaffoldConfiguration = {
  typeName: FileTypeName;
  filePath: string;
};

export const SCAFFOLD_CONFIGURATION_GEPP = 'scaffold-configuration';

type ScaffoldConfigurationGepp = typeof SCAFFOLD_CONFIGURATION_GEPP;

export type ScaffoldConfigurationVoque = StandardInMemoryVoque<
  ScaffoldConfigurationGepp,
  ScaffoldConfiguration
>;
