import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { OnamaEstinant } from '../../../core/estinant';
import { TropoignantTypeName } from '../../../core/tropoignant';
import { File } from '../../../utilities/file/file';
import { FileExtensionSuffixIdentifier } from '../../../utilities/file/fileExtensionSuffixIdentifier';
import { Grition } from '../../../custom-adapter/grition';
import { Odeshin } from '../../../custom-adapter/odeshin';
import { Plifal } from '../../../custom-adapter/plifal';
import {
  TypeScriptFileCOdeshin,
  TYPE_SCRIPT_FILE_C_GEPP,
} from './typeScriptFileC';

export enum DeclarationReferenceTypeName {
  Code = 'Code',
  Type = 'Type',
  Hybrid = 'Hybrid',
}

export type EnhancedDeclaration = {
  referenceTypeName: DeclarationReferenceTypeName;
  identifier: string;
};

export type TypeScriptFileD = Grition<
  File<
    FileExtensionSuffixIdentifier.TypeScript,
    {
      declarations: EnhancedDeclaration[];
    }
  >
>;

export type TypeScriptFileDIdentifier = `type-script-file-d:${string}`;

export type TypeScriptFileDOdeshin = Odeshin<
  TypeScriptFileDIdentifier,
  TypeScriptFileD
>;

export const TYPE_SCRIPT_FILE_D_GEPP = Symbol('type-script-file-d');

export type TypeScriptFileDGepp = typeof TYPE_SCRIPT_FILE_D_GEPP;

export type TypeScriptFileDPlifal = Plifal<
  [TypeScriptFileDGepp],
  TypeScriptFileDOdeshin
>;

export type TypeScriptFileDPlifalTuple = readonly TypeScriptFileDPlifal[];

export const typeScriptFileDEstinant: OnamaEstinant<
  TypeScriptFileCOdeshin,
  TypeScriptFileDPlifalTuple
> = {
  inputGepp: TYPE_SCRIPT_FILE_C_GEPP,
  tropoignant: {
    typeName: TropoignantTypeName.Onama,
    process: function createTypeScriptFileD(input) {
      const output: TypeScriptFileDPlifal = {
        geppTuple: [TYPE_SCRIPT_FILE_D_GEPP],
        hubblepup: {
          identifier: `type-script-file-d:${input.grition.filePath}`,
          grition: {
            ...input.grition,
            additionalMetadata: {
              declarations:
                input.grition.additionalMetadata.exportDeclarationList.flatMap<EnhancedDeclaration>(
                  (statement) => {
                    if (
                      statement.type === AST_NODE_TYPES.ExportAllDeclaration
                    ) {
                      if (statement.exported === null) {
                        throw Error(
                          `Unhandled scenario: null exported in ${input.grition.filePath}`,
                        );
                      }

                      return {
                        referenceTypeName: DeclarationReferenceTypeName.Hybrid,
                        identifier: statement.exported.name,
                      };
                    }

                    if (statement.declaration === null) {
                      return statement.specifiers.map<EnhancedDeclaration>(
                        (specifier) => {
                          return {
                            referenceTypeName:
                              DeclarationReferenceTypeName.Hybrid,
                            identifier: specifier.exported.name,
                          };
                        },
                      );
                    }

                    switch (statement.declaration.type) {
                      case AST_NODE_TYPES.TSTypeAliasDeclaration:
                        return {
                          referenceTypeName: DeclarationReferenceTypeName.Type,
                          identifier: statement.declaration.id.name,
                        } satisfies EnhancedDeclaration;
                      case AST_NODE_TYPES.TSEnumDeclaration:
                      case AST_NODE_TYPES.ClassDeclaration:
                        if (statement.declaration.id === null) {
                          throw Error(
                            `Null identifier for ${statement.declaration.type} in ${input.grition.filePath}`,
                          );
                        }

                        return {
                          referenceTypeName:
                            DeclarationReferenceTypeName.Hybrid,
                          identifier: statement.declaration.id.name,
                        } satisfies EnhancedDeclaration;
                      case AST_NODE_TYPES.VariableDeclaration: {
                        return statement.declaration.declarations
                          .filter(
                            (
                              x,
                            ): x is typeof x & { id: TSESTree.Identifier } => {
                              return x.id.type === AST_NODE_TYPES.Identifier;
                            },
                          )
                          .map<EnhancedDeclaration>((declaration) => {
                            return {
                              referenceTypeName:
                                DeclarationReferenceTypeName.Code,
                              identifier: declaration.id.name,
                            };
                          });
                      }
                      default:
                        throw Error(
                          `Unhandled export named declaration declaration type: ${statement.declaration.type} for file: ${input.grition.filePath}`,
                        );
                    }
                  },
                ),
            },
          },
        },
      };

      return [output];
    },
  },
};
