import { posix } from 'path';
import { resolveModuleFilePath } from '../../../utilities/file/resolveModuleFilePath';
import { Merge } from '../../../utilities/merge';
import { isImportDeclaration } from '../../../utilities/type-script-ast/isImportDeclaration';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import {
  ParsedTypeScriptFileVoictent,
  PARSED_TYPE_SCRIPT_FILE_GEPP,
} from './parsedTypeScriptFile';

export enum TypeScriptFileImportTypeName {
  Local = 'Local',
  External = 'External',
}

type BaseTypeScriptFileImport<
  TTypeName extends TypeScriptFileImportTypeName,
  TProperties extends object,
> = Merge<{ typeName: TTypeName; specifierList: string[] }, TProperties>;

export type LocalTypeScriptFileImport = BaseTypeScriptFileImport<
  TypeScriptFileImportTypeName.Local,
  { filePath: string }
>;

export type ExternalTypeScriptFileImport = BaseTypeScriptFileImport<
  TypeScriptFileImportTypeName.External,
  { moduleName: string }
>;

export type TypeScriptFileImport =
  | LocalTypeScriptFileImport
  | ExternalTypeScriptFileImport;

export const getSourcePath = (importItem: TypeScriptFileImport): string =>
  importItem.typeName === TypeScriptFileImportTypeName.Local
    ? importItem.filePath
    : importItem.moduleName;

export type TypeScriptFileImportList = TypeScriptFileImport[];

export type TypeScriptFileImportListGrition = Grition<TypeScriptFileImportList>;

export type TypeScriptFileImportListOdeshin =
  OdeshinFromGrition<TypeScriptFileImportListGrition>;

export const TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP = 'type-script-file-import-list';

export type TypeScriptFileImportListGepp =
  typeof TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP;

export type TypeScriptFileImportListVoictent = Voictent<
  TypeScriptFileImportListGepp,
  TypeScriptFileImportListOdeshin
>;

export const getTypeScriptFileImportList = buildEstinant()
  .fromGrition<ParsedTypeScriptFileVoictent>({
    gepp: PARSED_TYPE_SCRIPT_FILE_GEPP,
  })
  .toGrition<TypeScriptFileImportListVoictent>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((input) => {
    const importList = input.program.body
      .filter(isImportDeclaration)
      .map<TypeScriptFileImport>((inputImportDeclaration) => {
        const sourcePath = inputImportDeclaration.source.value;

        const isRelative =
          sourcePath.startsWith('./') || sourcePath.startsWith('../');

        const specifierList: string[] = inputImportDeclaration.specifiers.map(
          (specifier) => specifier.local.name,
        );

        if (isRelative) {
          const extensionlessSourceFilePath = posix.join(
            posix.dirname(input.filePath),
            sourcePath,
          );

          const sourceFilePath = resolveModuleFilePath(
            extensionlessSourceFilePath,
          );

          return {
            typeName: TypeScriptFileImportTypeName.Local,
            filePath: sourceFilePath,
            specifierList,
          } satisfies LocalTypeScriptFileImport;
        }

        return {
          typeName: TypeScriptFileImportTypeName.External,
          moduleName: sourcePath,
          specifierList,
        } satisfies ExternalTypeScriptFileImport;
      });

    return importList;
  })
  .assemble();
