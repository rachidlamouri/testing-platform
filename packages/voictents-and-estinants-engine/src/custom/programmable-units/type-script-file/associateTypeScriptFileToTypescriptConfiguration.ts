import { posix } from 'path';
import fs from 'fs';
import { TYPE_SCRIPT_FILE_GEPP, TypeScriptFileVoque } from './typeScriptFile';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { InMemoryOdeshin2ListVoque } from '../../../core/engine/inMemoryOdeshinVoictent2';

/**
 * Corresponds to a tsconfig.json file paired with a source TypeScript file path
 * that is part of the project defined by the config file
 */
type TypeScriptFileConfiguration = {
  zorn: string;
  sourceFilePath: string;
  filePath: string;
  rootDirectory: string;
};

export const TYPE_SCRIPT_FILE_CONFIGURATION_GEPP =
  'type-script-file-configuration';

type TypeScriptFileConfigurationGepp =
  typeof TYPE_SCRIPT_FILE_CONFIGURATION_GEPP;

export type TypeScriptFileConfigurationVoque = InMemoryOdeshin2ListVoque<
  TypeScriptFileConfigurationGepp,
  TypeScriptFileConfiguration
>;

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
export const associateTypeScriptFileToTypescriptConfiguration = buildEstinant({
  name: 'associateTypeScriptFileToTypescriptConfiguration',
})
  .fromHubblepup2<TypeScriptFileVoque>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .toHubblepup2<TypeScriptFileConfigurationVoque>({
    gepp: TYPE_SCRIPT_FILE_CONFIGURATION_GEPP,
  })
  .onPinbe((input) => {
    const configurationFilePath = getConfigurationFilePath(
      input.filePath.serialized,
    );
    const configurationRootDirectory = posix.dirname(configurationFilePath);

    const configuration: TypeScriptFileConfiguration = {
      zorn: input.filePath.serialized,
      sourceFilePath: input.filePath.serialized,
      filePath: configurationFilePath,
      rootDirectory: configurationRootDirectory,
    };

    return configuration;
  })
  .assemble();
