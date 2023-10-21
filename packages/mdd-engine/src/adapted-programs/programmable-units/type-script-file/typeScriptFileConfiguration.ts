import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { FilePath } from '../file/filePath';

/**
 * Corresponds to a tsconfig.json file paired with a source TypeScript file path
 * that is part of the project defined by the config file
 */
export type TypeScriptFileConfiguration = {
  id: string;
  // TODO: remove string sourceFilePath and rename this to sourceFilePath
  sourceFilePathObject: FilePath;
  /** @deprecated */
  sourceFilePath: string;
  filePath: string;
  rootDirectory: string;
};

export const TYPE_SCRIPT_FILE_CONFIGURATION_COLLECTION_ID =
  'type-script-file-configuration';

type TypeScriptFileConfigurationCollectionId =
  typeof TYPE_SCRIPT_FILE_CONFIGURATION_COLLECTION_ID;

export type TypeScriptFileConfigurationStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    TypeScriptFileConfigurationCollectionId,
    TypeScriptFileConfiguration
  >;
