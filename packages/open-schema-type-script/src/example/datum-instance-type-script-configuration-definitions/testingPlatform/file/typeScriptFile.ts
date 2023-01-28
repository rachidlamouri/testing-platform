import * as parser from '@typescript-eslint/typescript-estree';
import type { TSESTree } from '@typescript-eslint/types';
import fs from 'fs';
import { posix } from 'path';
import {
  UnknownCollectionLocator,
  UnknownCollectionLocatorPart,
} from '../../../../core/collectionLocator';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { Merge } from '../../../../utilities/types/merge/merge';
import { File } from './file';
import { FileATypeScriptConfiguration } from './fileA';
import { FileTypeScriptSemanticsIdentifier } from './fileTypeScriptSemanticsIdentifier';
import { FileExtensionSemanticsIdentifier } from './fileExtensionSemanticsIdentifier';

export type TypeScriptFile = Merge<
  File<FileExtensionSemanticsIdentifier.TypeScript>,
  {
    ast: TSESTree.Program | Error;
    configFilePath: string;
    tsconfigRootDir: string;
  }
>;

export type TypeScriptFileADatumInstanceIdentifier =
  `${FileTypeScriptSemanticsIdentifier.TypeScriptFileA}:${UnknownCollectionLocatorPart}`;

export type TypeScriptFileADatumInstancAlias =
  `${FileExtensionSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.TypeScriptFileA}`;

export type TypeScriptFileTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [
      FileTypeScriptSemanticsIdentifier.TypeScriptFileA,
    ];
    datumInstanceIdentifier: UnknownCollectionLocator;
    datumInstance: TypeScriptFile;
    datumInstanceAliases: [TypeScriptFileADatumInstancAlias];
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

  const alias: TypeScriptFileADatumInstancAlias = `${FileExtensionSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.TypeScriptFileA}`;

  const outputConfiguration: DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<TypeScriptFileTypeScriptConfiguration> =
    {
      instanceIdentifier: `${FileTypeScriptSemanticsIdentifier.TypeScriptFileA}:${filePath}`,
      datumInstance: {
        fileExtensionSemanticsIdentifier:
          FileExtensionSemanticsIdentifier.TypeScript,
        filePath,
        configFilePath,
        ast,
        tsconfigRootDir,
      },
      predicateIdentifiers: [FileTypeScriptSemanticsIdentifier.TypeScriptFileA],
      aliases: [alias],
    };

  return [outputConfiguration];
};
