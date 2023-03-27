import { posix } from 'path';
import { resolveModuleFilePath } from '../../../utilities/file/resolveModuleFilePath';
import { isImportDeclaration } from '../../../utilities/type-script-ast/isImportDeclaration';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ParsedTypeScriptFileVoictent,
  PARSED_TYPE_SCRIPT_FILE_GEPP,
} from './parsedTypeScriptFile';
import {
  TypeScriptFileImportListVoictent,
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImport,
  TypeScriptFileImportTypeName,
  LocalTypeScriptFileImport,
  ExternalTypeScriptFileImport,
} from './typeScriptFileImportList';

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
