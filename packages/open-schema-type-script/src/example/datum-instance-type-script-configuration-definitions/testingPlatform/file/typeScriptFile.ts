import * as parser from '@typescript-eslint/parser';
import type { TSESTree } from '@typescript-eslint/types';
import fs from 'fs';
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

export const buildTypeScriptFile: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [FileATypeScriptConfiguration];
  OutputCollection: [TypeScriptFileTypeScriptConfiguration];
}> = (inputFileConfiguration) => {
  const { filePath } = inputFileConfiguration.datumInstance;
  const fileContents = fs.readFileSync(filePath, 'utf8');

  let ast: TSESTree.Program | Error;
  try {
    ast = parser.parse(fileContents);
  } catch (error) {
    ast = error as Error;
  }

  const outputConfiguration: DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<TypeScriptFileTypeScriptConfiguration> =
    {
      instanceIdentifier: `TS:${filePath}`,
      datumInstance: {
        fileSemanticsIdentifier: FileSemanticsIdentifier.TypeScript,
        filePath,
        ast,
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
