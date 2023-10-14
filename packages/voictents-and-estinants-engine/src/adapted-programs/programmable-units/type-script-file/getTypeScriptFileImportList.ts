import { posix } from 'path';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import { resolveModuleFilePath } from '../../../package-agnostic-utilities/file/resolveModuleFilePath';
import { isImportDeclaration } from '../../../package-agnostic-utilities/type-script-ast/isImportDeclaration';
import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
import {
  PARSED_TYPE_SCRIPT_FILE_GEPP,
  ParsedTypeScriptFileVoque,
} from './parsedTypeScriptFile';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImport,
  TypeScriptFileImportListVoque,
} from './typeScriptFileImportList';
import { splitList } from '../../../package-agnostic-utilities/array/splitList';
import {
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  GenericProgramErrorVoque,
  ReportedProgramError,
  ReportingEstinantLocator,
} from '../error/programError';
import { isRelativeFilePath } from '../../../package-agnostic-utilities/file/isRelativeFilePath';

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
export const getTypeScriptFileImportList = buildProgrammedTransform({
  name: ESTINANT_NAME,
})
  .fromItem2<ParsedTypeScriptFileVoque>({
    collectionId: PARSED_TYPE_SCRIPT_FILE_GEPP,
  })
  .toItem2<TypeScriptFileImportListVoque>({
    collectionId: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  })
  .toItemTuple2<GenericProgramErrorVoque>({
    collectionId: PROGRAM_ERROR_GEPP,
  })
  .onTransform((parsedTypeScriptFile) => {
    const importAndErrorList = parsedTypeScriptFile.program.body
      .filter(isImportDeclaration)
      .map<TypeScriptFileImport | ReportedProgramError<ReportingLocator>>(
        (inputImportDeclaration) => {
          const sourcePath = inputImportDeclaration.source.value;

          const isRelative = isRelativeFilePath(sourcePath);

          const specifierList: string[] = inputImportDeclaration.specifiers.map(
            (specifier) => {
              if (specifier.type === AST_NODE_TYPES.ImportSpecifier) {
                return specifier.imported.name;
              }

              return specifier.local.name;
            },
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
        filePath: parsedTypeScriptFile.filePath,
        list: importList,
      },
    };
  })
  .assemble();
