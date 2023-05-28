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
import { splitList } from '../../../utilities/splitList';
import {
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  GenericProgramErrorVoque,
  ReportedProgramError,
  ReportingEstinantLocator,
} from '../error/programError';

const ESTINANT_NAME = 'getTypeScriptFileImportList' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

/**
 * Gets useful metadata about the import statements in a TypeScript file. For
 * example it gets the full file path for relative imports so later transforms
 * don't need to resolve file paths.
 */
export const getTypeScriptFileImportList = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<ParsedTypeScriptFileVoque>({
    gepp: PARSED_TYPE_SCRIPT_FILE_GEPP,
  })
  .toHubblepup2<TypeScriptFileImportListVoque>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((parsedTypeScriptFile) => {
    const importAndErrorList = parsedTypeScriptFile.program.body
      .filter(isImportDeclaration)
      .map<TypeScriptFileImport | ReportedProgramError<ReportingLocator>>(
        (inputImportDeclaration) => {
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
                name: 'unresolveable-import',
                error: new Error(
                  `Unable to resolve imported filepath: ${sourcePath}`,
                ),
                reporterLocator,
                sourceLocator: {
                  typeName:
                    ProgramErrorElementLocatorTypeName.SourceFileLocator,
                  filePath: parsedTypeScriptFile.filePath,
                },
                context: null,
              } satisfies ReportedProgramError<ReportingLocator>;
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
    const errorList: ReportedProgramError<ReportingLocator>[] = [];
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
