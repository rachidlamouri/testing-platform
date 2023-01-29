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
import { TypeScriptFileTypeScriptConfiguration } from './typeScriptFileA';

export type TypeScriptFileB = File<{
  FileExtensionSuffixSemanticsIdentifier: FileExtensionSuffixSemanticsIdentifier.TypeScript;
  AdditionalMetadata: {
    declarations: TSESTree.ExportNamedDeclaration[];
  };
}>;

type UnknownFilePath = UnknownString;

type TypeScriptFileBDatumInstanceIdentifier =
  `${FileTypeScriptSemanticsIdentifier.TypeScriptFileB}:${UnknownFilePath}`;

type TypeScriptFileADatumInstancAlias =
  `${FileExtensionSuffixSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.TypeScriptFileB}`;

export type TypeScriptFileBTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [
      FileTypeScriptSemanticsIdentifier.TypeScriptFileB,
    ];
    datumInstanceIdentifier: TypeScriptFileBDatumInstanceIdentifier;
    datumInstance: TypeScriptFileB;
    datumInstanceAliases: [TypeScriptFileADatumInstancAlias];
  }>;

export const buildTypeScriptFileB: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [TypeScriptFileTypeScriptConfiguration];
  OutputCollection: [TypeScriptFileBTypeScriptConfiguration];
}> = (inputConfiguration) => {
  const alias: TypeScriptFileADatumInstancAlias = `${FileExtensionSuffixSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.TypeScriptFileB}`;

  const outputConfiguration: DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<TypeScriptFileBTypeScriptConfiguration> =
    {
      instanceIdentifier: `${FileTypeScriptSemanticsIdentifier.TypeScriptFileB}:${inputConfiguration.datumInstance.filePath}`,
      datumInstance: {
        ...inputConfiguration.datumInstance,
        additionalMetadata: {
          declarations:
            inputConfiguration.datumInstance.additionalMetadata.ast.body.filter(
              (statement): statement is TSESTree.ExportNamedDeclaration => {
                return statement.type === AST_NODE_TYPES.ExportNamedDeclaration;
              },
            ),
        },
      },
      predicateIdentifiers: [FileTypeScriptSemanticsIdentifier.TypeScriptFileB],
      aliases: [alias],
    };

  return [outputConfiguration];
};
