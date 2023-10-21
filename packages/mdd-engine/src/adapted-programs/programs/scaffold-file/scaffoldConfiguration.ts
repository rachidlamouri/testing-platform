import { StandardInMemoryStreamMetatype } from '../../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';

export enum FileTypeName {
  Program = 'program',
  ProgrammedTransform = 'transform',
  Item = 'item',
  Function = 'function',
}

export const validTypeNameList = Object.values(FileTypeName) as string[];

/**
 * The filePath that will receive the generated text
 */
export type ScaffoldConfiguration = {
  typeName: FileTypeName;
  filePath: string;
};

export const SCAFFOLD_CONFIGURATION_COLLECTION_ID = 'scaffold-configuration';

type ScaffoldConfigurationCollectionId =
  typeof SCAFFOLD_CONFIGURATION_COLLECTION_ID;

export type ScaffoldConfigurationStreamMetatype =
  StandardInMemoryStreamMetatype<
    ScaffoldConfigurationCollectionId,
    ScaffoldConfiguration
  >;
