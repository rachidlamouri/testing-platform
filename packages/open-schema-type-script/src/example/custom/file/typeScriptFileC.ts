import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import { File } from '../../../utilities/file/file';
import { FileExtensionSuffixIdentifier } from '../../../utilities/file/fileExtensionSuffixIdentifier';
import { Grition } from '../../../custom-adapter/grition';
import { Odeshin } from '../../../custom-adapter/odeshin';
import { Plifal } from '../../../custom-adapter/plifal';
import {
  TypeScriptFileBPlifal,
  TYPE_SCRIPT_FILE_B_GEPP,
} from './typeScriptFileB';
import {
  Ankeler,
  buildOnamaHamletive,
} from '../../../type-script-adapter/hamletive/onama';
import { QuirmOptionTuple } from '../../../type-script-adapter/quirmOptionTuple';

type ImportDeclaration = TSESTree.ImportDeclaration;

type ExportDeclaration =
  | TSESTree.ExportNamedDeclaration
  | TSESTree.ExportAllDeclaration;

export type TypeScriptFileC = Grition<
  File<
    FileExtensionSuffixIdentifier.TypeScript,
    {
      program: TSESTree.Program;
      importDeclarationList: ImportDeclaration[];
      exportDeclarationList: ExportDeclaration[];
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

type InputOptionTuple = QuirmOptionTuple<[TypeScriptFileBPlifal]>;

const buildTypeScriptFileC: Ankeler<InputOptionTuple, TypeScriptFileCPlifal> = (
  input,
) => {
  const { program } = input.hubblepup.grition.additionalMetadata;

  const importDeclarations: ImportDeclaration[] = [];
  const exportDeclarations: ExportDeclaration[] = [];

  program.body.forEach((statement) => {
    if (statement.type === AST_NODE_TYPES.ImportDeclaration) {
      importDeclarations.push(statement);
    } else if (
      statement.type === AST_NODE_TYPES.ExportAllDeclaration ||
      statement.type === AST_NODE_TYPES.ExportNamedDeclaration
    ) {
      exportDeclarations.push(statement);
    }
  });

  const output: TypeScriptFileCPlifal = {
    geppTuple: [TYPE_SCRIPT_FILE_C_GEPP],
    hubblepup: {
      identifier: `type-script-file-c:${input.hubblepup.grition.filePath}`,
      grition: {
        ...input.hubblepup.grition,
        additionalMetadata: {
          program: input.hubblepup.grition.additionalMetadata.program,
          importDeclarationList: importDeclarations,
          exportDeclarationList: exportDeclarations,
        },
      },
    },
  };

  return output;
};

export const typeScriptFileCEstinant = buildOnamaHamletive({
  inputGepp: TYPE_SCRIPT_FILE_B_GEPP,
  ankel: buildTypeScriptFileC,
});
