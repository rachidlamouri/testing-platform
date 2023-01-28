import * as parser from '@typescript-eslint/typescript-estree';
import type { TSESTree } from '@typescript-eslint/types';
import fs from 'fs';
import { posix } from 'path';
import { UnknownCollectionLocator } from '../../../../core/collectionLocator';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { Merge } from '../../../../utilities/types/merge/merge';
import { File, FileSemanticsIdentifier } from './file';
import { FileATypeScriptConfiguration } from './fileA';

export type TypeScriptFile = Merge<
  File<FileSemanticsIdentifier.TypeScript>,
  {
    ast: TSESTree.Program | Error;
    configFilePath: string;
    tsconfigRootDir: string;
  }
>;

export type TypeScriptFileTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [
      FileSemanticsIdentifier.TypeScript,
      FileSemanticsIdentifier.A,
    ];
    datumInstanceIdentifier: UnknownCollectionLocator;
    datumInstance: TypeScriptFile;
    datumInstanceAliases: [FileSemanticsIdentifier.TypeScript];
  }>;

const getConfigFilePath = (filePath: string): string => {
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

export const buildTypeScriptFile: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [FileATypeScriptConfiguration];
  OutputCollection: [TypeScriptFileTypeScriptConfiguration];
}> = (inputFileConfiguration) => {
  const { filePath } = inputFileConfiguration.datumInstance;
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const configFilePath = getConfigFilePath(filePath);
  const tsconfigRootDir = posix.dirname(configFilePath);

  let ast: TSESTree.Program | Error;
  try {
    ast = parser.parse(fileContents, {
      project: './tsconfig.json',
      tsconfigRootDir,
    });
  } catch (error) {
    ast = error as Error;
    throw error;
  }

  const outputConfiguration: DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<TypeScriptFileTypeScriptConfiguration> =
    {
      instanceIdentifier: `TS:${filePath}`,
      datumInstance: {
        fileSemanticsIdentifier: FileSemanticsIdentifier.TypeScript,
        filePath,
        configFilePath,
        ast,
        tsconfigRootDir,
      },
      predicateIdentifiers: [
        FileSemanticsIdentifier.TypeScript,
        FileSemanticsIdentifier.A,
      ],
      // TODO: figure out how to tie this alias to the one from FileA, so you can just do inputFileConfiguration.aliases
      aliases: [FileSemanticsIdentifier.TypeScript],
    };

  return [outputConfiguration];
};
