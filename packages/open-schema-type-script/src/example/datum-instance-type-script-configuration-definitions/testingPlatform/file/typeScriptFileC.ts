// TODO: map the named export declarations to a data structure that's easier to lint
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
import { TypeScriptFileBTypeScriptConfiguration } from './typeScriptFileB';

type ReferenceTypeName = 'code' | 'type' | 'hybrid';

type EnhancedDeclaration = {
  typeName: ReferenceTypeName | null;
  identifier: string;
};

export type TypeScriptFileC = File<{
  FileExtensionSuffixSemanticsIdentifier: FileExtensionSuffixSemanticsIdentifier.TypeScript;
  AdditionalMetadata: {
    declarations: EnhancedDeclaration[];
  };
}>;

type UnknownFilePath = UnknownString;

type TypeScriptFileCDatumInstanceIdentifier =
  `${FileTypeScriptSemanticsIdentifier.TypeScriptFileC}:${UnknownFilePath}`;

type TypeScriptFileCDatumInstancAlias =
  `${FileExtensionSuffixSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.TypeScriptFileC}`;

export type TypeScriptFileCTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [
      FileTypeScriptSemanticsIdentifier.TypeScriptFileC,
    ];
    datumInstanceIdentifier: TypeScriptFileCDatumInstanceIdentifier;
    datumInstance: TypeScriptFileC;
    datumInstanceAliases: [TypeScriptFileCDatumInstancAlias];
  }>;

export const buildTypeScriptFileC: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [TypeScriptFileBTypeScriptConfiguration];
  OutputCollection: [TypeScriptFileCTypeScriptConfiguration];
}> = (inputConfiguration) => {
  const alias: TypeScriptFileCDatumInstancAlias = `${FileExtensionSuffixSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.TypeScriptFileC}`;

  const outputConfiguration: DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<TypeScriptFileCTypeScriptConfiguration> =
    {
      instanceIdentifier: `${FileTypeScriptSemanticsIdentifier.TypeScriptFileC}:${inputConfiguration.datumInstance.filePath}`,
      datumInstance: {
        ...inputConfiguration.datumInstance,
        additionalMetadata: {
          declarations:
            inputConfiguration.datumInstance.additionalMetadata.declarations.flatMap<EnhancedDeclaration>(
              (statement) => {
                if (statement.type === AST_NODE_TYPES.ExportAllDeclaration) {
                  if (statement.exported === null) {
                    throw Error(
                      `Unhandled scenario: null exported in ${inputConfiguration.datumInstance.filePath}`,
                    );
                  }

                  return {
                    typeName: null,
                    identifier: statement.exported.name,
                  };
                }

                if (statement.declaration === null) {
                  return statement.specifiers.map<EnhancedDeclaration>(
                    (specifier) => {
                      return {
                        typeName: null,
                        identifier: specifier.exported.name,
                      };
                    },
                  );
                }

                switch (statement.declaration.type) {
                  case AST_NODE_TYPES.TSTypeAliasDeclaration:
                    return {
                      typeName: 'type',
                      identifier: statement.declaration.id.name,
                    } satisfies EnhancedDeclaration;
                  case AST_NODE_TYPES.TSEnumDeclaration:
                  case AST_NODE_TYPES.ClassDeclaration:
                    if (statement.declaration.id === null) {
                      throw Error(
                        `Null identifier for ${statement.declaration.type} in ${inputConfiguration.datumInstance.filePath}`,
                      );
                    }

                    return {
                      typeName: 'hybrid',
                      identifier: statement.declaration.id.name,
                    } satisfies EnhancedDeclaration;
                  case AST_NODE_TYPES.VariableDeclaration: {
                    return statement.declaration.declarations
                      .filter(
                        (x): x is typeof x & { id: TSESTree.Identifier } => {
                          return x.id.type === AST_NODE_TYPES.Identifier;
                        },
                      )
                      .map<EnhancedDeclaration>((declaration) => {
                        return {
                          typeName: 'code',
                          identifier: declaration.id.name,
                        };
                      });
                  }
                  default:
                    throw Error(
                      `Unhandled export named declaration declaration type: ${statement.declaration.type} for file: ${inputConfiguration.datumInstance.filePath}`,
                    );
                }
              },
            ),
        },
      },
      predicateIdentifiers: [FileTypeScriptSemanticsIdentifier.TypeScriptFileC],
      aliases: [alias],
    };

  return [outputConfiguration];
};
