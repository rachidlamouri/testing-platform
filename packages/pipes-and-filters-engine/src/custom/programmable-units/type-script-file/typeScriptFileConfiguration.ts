import { posix } from 'path';
import fs from 'fs';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import {
  TypeScriptFileVoictent,
  TYPE_SCRIPT_FILE_GEPP,
} from './typeScriptFile';
import { buildOnama } from '../../adapter/estinant/onama';

export type TypeScriptFileConfiguration = {
  sourceFilePath: string;
  filePath: string;
  rootDirectory: string;
};

export type TypeScriptFileConfigurationGrition =
  Grition<TypeScriptFileConfiguration>;

export type TypeScriptFileConfigurationOdeshin =
  OdeshinFromGrition<TypeScriptFileConfigurationGrition>;

export const TYPE_SCRIPT_FILE_CONFIGURATION_GEPP =
  'type-script-file-configuration';

export type TypeScriptFileConfigurationGepp =
  typeof TYPE_SCRIPT_FILE_CONFIGURATION_GEPP;

export type TypeScriptFileConfigurationVoictent = Voictent<
  TypeScriptFileConfigurationGepp,
  TypeScriptFileConfigurationOdeshin
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

export const typeScriptFileConfigurationOnama = buildOnama<
  TypeScriptFileVoictent,
  TypeScriptFileConfigurationVoictent
>({
  inputGepp: TYPE_SCRIPT_FILE_GEPP,
  outputGepp: TYPE_SCRIPT_FILE_CONFIGURATION_GEPP,
  pinbe: (input) => {
    const configurationFilePath = getConfigurationFilePath(input.filePath);
    const configurationRootDirectory = posix.dirname(configurationFilePath);

    const configuration: TypeScriptFileConfiguration = {
      sourceFilePath: input.filePath,
      filePath: configurationFilePath,
      rootDirectory: configurationRootDirectory,
    };

    return configuration;
  },
});
