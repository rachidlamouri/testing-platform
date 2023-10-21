import { posix } from 'path';
import fs from 'fs';
import {
  TYPE_SCRIPT_FILE_COLLECTION_ID,
  TypeScriptFileStreamMetatype,
} from './typeScriptFile';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  TypeScriptFileConfigurationStreamMetatype,
  TYPE_SCRIPT_FILE_CONFIGURATION_COLLECTION_ID,
  TypeScriptFileConfiguration,
} from './typeScriptConfiguration';

const getConfigurationFilePath = (filePath: string): string => {
  let configFilePath: string | null = null;

  let nextPath = filePath;
  while (configFilePath === null && nextPath !== '.') {
    nextPath = posix.dirname(nextPath);

    const files = fs.readdirSync(nextPath);
    configFilePath = files.find((x) => x === 'tsconfig.json') ?? null;
    if (configFilePath !== null) {
      configFilePath = posix.join(nextPath, configFilePath);
    }
  }

  if (configFilePath === null) {
    throw Error('No config found');
  }

  return configFilePath;
};

/**
 * Given a TypeScript file, it traverses back up the file tree until it
 * encounters a tsconfig.json file, and it assumes they are related. It's great.
 * Super robust logic.
 */
export const associateTypeScriptFileToTypescriptConfiguration =
  buildProgrammedTransform({
    name: 'associateTypeScriptFileToTypescriptConfiguration',
  })
    .fromItem2<TypeScriptFileStreamMetatype>({
      collectionId: TYPE_SCRIPT_FILE_COLLECTION_ID,
    })
    .toItem2<TypeScriptFileConfigurationStreamMetatype>({
      collectionId: TYPE_SCRIPT_FILE_CONFIGURATION_COLLECTION_ID,
    })
    .onTransform((input) => {
      const configurationFilePath = getConfigurationFilePath(
        input.filePath.serialized,
      );
      const configurationRootDirectory = posix.dirname(configurationFilePath);

      const configuration: TypeScriptFileConfiguration = {
        id: input.filePath.serialized,
        sourceFilePath: input.filePath.serialized,
        sourceFilePathObject: input.filePath,
        filePath: configurationFilePath,
        rootDirectory: configurationRootDirectory,
      };

      return configuration;
    })
    .assemble();
