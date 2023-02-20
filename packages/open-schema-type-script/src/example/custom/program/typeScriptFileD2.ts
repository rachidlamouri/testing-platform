import { TSESTree } from '@typescript-eslint/typescript-estree';
import { posix } from 'path';
import { Grition } from '../../../custom-adapter/grition';
import { Odeshin } from '../../../custom-adapter/odeshin';
import { Plifal } from '../../../custom-adapter/plifal';
import {
  Ankeler,
  buildOnamaHamletive,
} from '../../../type-script-adapter/hamletive/onama';
import { QuirmOptionTuple } from '../../../type-script-adapter/quirmOptionTuple';
import { File } from '../../../utilities/file/file';
import { FileExtensionSuffixIdentifier } from '../../../utilities/file/fileExtensionSuffixIdentifier';
import { Merge } from '../../../utilities/merge';
import {
  TypeScriptFileCPlifal,
  TYPE_SCRIPT_FILE_C_GEPP,
} from '../file/typeScriptFileC';
import { resolveModuleFilePath } from '../../../utilities/file/resolveModuleFilePath';

export enum CustomImportDeclarationTypeName {
  Local = 'Local',
  External = 'External',
}

type BaseCustomImportDeclaration<
  TTypeName extends CustomImportDeclarationTypeName,
  TProperties extends object,
> = Merge<{ typeName: TTypeName; specifierList: string[] }, TProperties>;

export type LocalImportDeclaration = BaseCustomImportDeclaration<
  CustomImportDeclarationTypeName.Local,
  { filePath: string }
>;

export type ExternalImportDeclaration = BaseCustomImportDeclaration<
  CustomImportDeclarationTypeName.External,
  { moduleName: string }
>;

export type CustomImportDeclaration =
  | LocalImportDeclaration
  | ExternalImportDeclaration;

export type TypeScriptFileD2 = File<
  FileExtensionSuffixIdentifier.TypeScript,
  {
    importDeclarationList: CustomImportDeclaration[];
    typeScriptProgram: TSESTree.Program;
  }
>;

export type TypeScriptFileD2Grition = Grition<TypeScriptFileD2>;

export const TYPE_SCRIPT_FILE_D2_GEPP = 'type-script-file-d2';

export type TypeScritpFileD2Gepp = typeof TYPE_SCRIPT_FILE_D2_GEPP;

export type TypeScriptFileD2Identifier = `${TypeScritpFileD2Gepp}:${string}`;

export type TypeScriptFileD2Odeshin = Odeshin<
  TypeScriptFileD2Identifier,
  TypeScriptFileD2Grition
>;

export type TypeScriptFileD2Plifal = Plifal<
  [TypeScritpFileD2Gepp],
  TypeScriptFileD2Odeshin
>;

type InputOptionTuple = QuirmOptionTuple<[TypeScriptFileCPlifal]>;

const buildTypeScriptFileD2: Ankeler<
  InputOptionTuple,
  TypeScriptFileD2Plifal
> = (input) => {
  const output: TypeScriptFileD2Plifal = {
    geppTuple: [TYPE_SCRIPT_FILE_D2_GEPP],
    hubblepup: {
      identifier: `${TYPE_SCRIPT_FILE_D2_GEPP}:${input.hubblepup.grition.filePath}`,
      grition: {
        ...input.hubblepup.grition,
        additionalMetadata: {
          typeScriptProgram: input.hubblepup.grition.additionalMetadata.program,
          importDeclarationList:
            input.hubblepup.grition.additionalMetadata.importDeclarationList.map<CustomImportDeclaration>(
              (inputImportDeclaration) => {
                const sourcePath = inputImportDeclaration.source.value;

                const isRelative =
                  sourcePath.startsWith('./') || sourcePath.startsWith('../');

                const specifierList: string[] =
                  inputImportDeclaration.specifiers.map(
                    (specifier) => specifier.local.name,
                  );

                if (isRelative) {
                  const extensionlessSourceFilePath = posix.join(
                    posix.dirname(input.hubblepup.grition.filePath),
                    sourcePath,
                  );

                  const sourceFilePath = resolveModuleFilePath(
                    extensionlessSourceFilePath,
                  );

                  return {
                    typeName: CustomImportDeclarationTypeName.Local,
                    filePath: sourceFilePath,
                    specifierList,
                  } satisfies LocalImportDeclaration;
                }

                return {
                  typeName: CustomImportDeclarationTypeName.External,
                  moduleName: sourcePath,
                  specifierList,
                } satisfies ExternalImportDeclaration;
              },
            ),
        },
      },
    },
  };

  return output;
};

export const typeScriptFileD2Estinant = buildOnamaHamletive<
  InputOptionTuple,
  TypeScriptFileD2Plifal
>({
  inputGepp: TYPE_SCRIPT_FILE_C_GEPP,
  ankel: buildTypeScriptFileD2,
});
