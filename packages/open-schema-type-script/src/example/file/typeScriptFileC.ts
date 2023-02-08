import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { OnamaEstinant } from '../../core/estinant';
import { TropoignantTypeName } from '../../core/tropoignant';
import { File } from '../../utilities/file/file';
import { FileExtensionSuffixIdentifier } from '../../utilities/file/fileExtensionSuffixIdentifier';
import { Grition } from '../core/grition';
import { Odeshin, ODESHIN_GEPP } from '../core/odeshin';
import { Plifal } from '../core/plifal';
import {
  TypeScriptFileBOdeshin,
  TYPE_SCRIPT_FILE_B_GEPP,
} from './typeScriptFileB';

export type TypeScriptFileC = Grition<
  File<
    FileExtensionSuffixIdentifier.TypeScript,
    {
      declarations: (
        | TSESTree.ExportNamedDeclaration
        | TSESTree.ExportAllDeclaration
      )[];
    }
  >
>;

export type TypeScriptFileCIdentifier = `type-script-file-c:${string}`;

export type TypeScriptFileCOdeshin = Odeshin<
  TypeScriptFileCIdentifier,
  TypeScriptFileC
>;

export const TYPE_SCRIPT_FILE_C_GEPP = Symbol('type-script-file-c');

export type TypeScriptFileCGepp = typeof TYPE_SCRIPT_FILE_C_GEPP;

export type TypeScriptFileCPlifal = Plifal<
  [TypeScriptFileCGepp],
  TypeScriptFileCOdeshin
>;

export type TypeScriptFileCPlifalTuple = readonly TypeScriptFileCPlifal[];

export const typeScriptFileCEstinant: OnamaEstinant<
  TypeScriptFileBOdeshin,
  TypeScriptFileCPlifalTuple
> = {
  inputGepp: TYPE_SCRIPT_FILE_B_GEPP,
  tropoignant: {
    typeName: TropoignantTypeName.Onama,
    process: function createTypeScriptFileC(input) {
      const output: TypeScriptFileCPlifal = {
        geppTuple: [ODESHIN_GEPP, TYPE_SCRIPT_FILE_C_GEPP],
        hubblepup: {
          identifier: `type-script-file-c:${input.grition.filePath}`,
          grition: {
            ...input.grition,
            additionalMetadata: {
              declarations:
                input.grition.additionalMetadata.program.body.filter(
                  (
                    statement,
                  ): statement is
                    | TSESTree.ExportNamedDeclaration
                    | TSESTree.ExportAllDeclaration => {
                    return (
                      statement.type ===
                        AST_NODE_TYPES.ExportNamedDeclaration ||
                      statement.type === AST_NODE_TYPES.ExportAllDeclaration
                    );
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
