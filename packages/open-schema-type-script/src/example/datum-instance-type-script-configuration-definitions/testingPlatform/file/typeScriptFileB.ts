// DatumInstanceTypeScriptConfiguration

import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { File } from './file';
import { FileTypeScriptSemanticsIdentifier } from './fileTypeScriptSemanticsIdentifier';
import { FileExtensionSuffixSemanticsIdentifier } from './fileExtensionSuffixSemanticsIdentifier';
import { UnknownString } from '../../../../utilities/types/unknownHelpers';
import { TypeScriptFileATypeScriptConfiguration } from './typeScriptFileA';

export type TypeScriptFileB = File<{
  FileExtensionSuffixSemanticsIdentifier: FileExtensionSuffixSemanticsIdentifier.TypeScript;
  AdditionalMetadata: {
    declarations: (
      | TSESTree.ExportNamedDeclaration
      | TSESTree.ExportAllDeclaration
    )[];
  };
}>;

type UnknownFilePath = UnknownString;

export type TypeScriptFileBDatumInstanceIdentifier =
  `${FileTypeScriptSemanticsIdentifier.TypeScriptFileB}:${UnknownFilePath}`;

export type TypeScriptFileBDatumInstanceAlias =
  `${FileExtensionSuffixSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.TypeScriptFileB}`;

export type TypeScriptFileBTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [
      FileTypeScriptSemanticsIdentifier.TypeScriptFileB,
    ];
    datumInstanceIdentifier: TypeScriptFileBDatumInstanceIdentifier;
    datumInstance: TypeScriptFileB;
    datumInstanceAliases: [TypeScriptFileBDatumInstanceAlias];
  }>;

export const buildTypeScriptFileB: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [TypeScriptFileATypeScriptConfiguration];
  OutputCollection: [TypeScriptFileBTypeScriptConfiguration];
}> = (inputConfiguration) => {
  const alias: TypeScriptFileBDatumInstanceAlias = `${FileExtensionSuffixSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.TypeScriptFileB}`;

  const outputConfiguration: DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<TypeScriptFileBTypeScriptConfiguration> =
    {
      instanceIdentifier: `${FileTypeScriptSemanticsIdentifier.TypeScriptFileB}:${inputConfiguration.datumInstance.filePath}`,
      datumInstance: {
        ...inputConfiguration.datumInstance,
        additionalMetadata: {
          declarations:
            inputConfiguration.datumInstance.additionalMetadata.ast.body.filter(
              (
                statement,
              ): statement is
                | TSESTree.ExportNamedDeclaration
                | TSESTree.ExportAllDeclaration => {
                return (
                  statement.type === AST_NODE_TYPES.ExportNamedDeclaration ||
                  statement.type === AST_NODE_TYPES.ExportAllDeclaration
                );
              },
            ),
        },
      },
      predicateIdentifiers: [FileTypeScriptSemanticsIdentifier.TypeScriptFileB],
      aliases: [alias],
    };

  return [outputConfiguration];
};
