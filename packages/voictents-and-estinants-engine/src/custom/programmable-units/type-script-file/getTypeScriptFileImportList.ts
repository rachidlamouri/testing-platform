import { posix } from 'path';
import { resolveModuleFilePath } from '../../../utilities/file/resolveModuleFilePath';
import { isImportDeclaration } from '../../../utilities/type-script-ast/isImportDeclaration';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  PARSED_TYPE_SCRIPT_FILE_GEPP,
  ParsedTypeScriptFileVoque,
} from './parsedTypeScriptFile';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImport,
  TypeScriptFileImportListVoque,
} from './typeScriptFileImportList';
import {
  ErrorLocatorTypeName,
  PROGRAM_ERROR_GEPP,
  ProgramError,
  ProgramErrorVoque,
} from '../error/programError';
import { splitList } from '../../../utilities/splitList';

type EstinantName = 'getTypeScriptFileImportList';

const ESTINANT_NAME: EstinantName = 'getTypeScriptFileImportList';

/**
 * Gets useful metadata about the import statements in a TypeScript file. For
 * example it gets the full file path for relative imports so later transforms
 * don't need to resolve file paths.
 */
export const getTypeScriptFileImportList = buildEstinant({
  name: 'getTypeScriptFileImportList',
})
  .fromHubblepup2<ParsedTypeScriptFileVoque>({
    gepp: PARSED_TYPE_SCRIPT_FILE_GEPP,
  })
  .toHubblepup2<TypeScriptFileImportListVoque>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  })
  .toHubblepupTuple2<ProgramErrorVoque<EstinantName>>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((parsedTypeScriptFile) => {
    const importAndErrorList = parsedTypeScriptFile.program.body
      .filter(isImportDeclaration)
      .map<TypeScriptFileImport | ProgramError<EstinantName>>(
        (inputImportDeclaration, index) => {
          const sourcePath = inputImportDeclaration.source.value;

          const isRelative =
            sourcePath.startsWith('./') || sourcePath.startsWith('../');

          const specifierList: string[] = inputImportDeclaration.specifiers.map(
            (specifier) => specifier.local.name,
          );

          if (isRelative) {
            const extensionlessSourceFilePath = posix.join(
              posix.dirname(parsedTypeScriptFile.filePath),
              sourcePath,
            );

            const sourceFilePath = resolveModuleFilePath(
              extensionlessSourceFilePath,
            );

            if (sourceFilePath instanceof Error) {
              return {
                zorn: `${ESTINANT_NAME}/${parsedTypeScriptFile.filePath}/${index}`,
                errorId: `getTypeScriptFileImportList/unresolveable-import`,
                message: `Unable to resolve imported filepath: ${sourcePath}`,
                locator: {
                  typeName: ErrorLocatorTypeName.FileErrorLocator,
                  filePath: parsedTypeScriptFile.filePath,
                },
                metadata: null,
              };
            }

            return {
              isInternal: true,
              sourcePath: sourceFilePath,
              specifierList,
            };
          }

          return {
            isInternal: false,
            sourcePath,
            specifierList,
          };
        },
      );

    const importList: TypeScriptFileImport[] = [];
    const errorList: ProgramError<EstinantName>[] = [];
    splitList({
      list: importAndErrorList,
      isElementA: (element): element is TypeScriptFileImport =>
        'isInternal' in element,
      accumulatorA: importList,
      accumulatorB: errorList,
    });

    return {
      [PROGRAM_ERROR_GEPP]: errorList,
      [TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP]: {
        zorn: parsedTypeScriptFile.zorn,
        list: importList,
      },
    };
  })
  .assemble();
