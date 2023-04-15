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
} from './typeScriptFileImportList';
import {
  ErrorLocatorTypeName,
  PROGRAM_ERROR_GEPP,
  ProgramErrorOdeshin,
  ProgramErrorVoictent,
} from '../error/programError';
import { splitList } from '../../../utilities/splitList';

type EstinantName = 'getTypeScriptFileImportList';

const ESTINANT_NAME: EstinantName = 'getTypeScriptFileImportList';

export const getTypeScriptFileImportList = buildEstinant({
  name: 'getTypeScriptFileImportList',
})
  .fromGrition<ParsedTypeScriptFileVoictent>({
    gepp: PARSED_TYPE_SCRIPT_FILE_GEPP,
  })
  .toGrition<TypeScriptFileImportListVoictent>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .toHubblepupTuple<ProgramErrorVoictent<EstinantName>>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((input) => {
    const importAndErrorList = input.program.body
      .filter(isImportDeclaration)
      .map<TypeScriptFileImport | ProgramErrorOdeshin<EstinantName>>(
        (inputImportDeclaration, index) => {
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

            if (sourceFilePath instanceof Error) {
              return {
                zorn: `${ESTINANT_NAME}/${input.filePath}/${index}`,
                grition: {
                  errorId: `getTypeScriptFileImportList/unresolveable-import`,
                  message: `Unable to resolve imported filepath: ${sourcePath}`,
                  locator: {
                    typeName: ErrorLocatorTypeName.FileErrorLocator,
                    filePath: input.filePath,
                  },
                  metadata: null,
                },
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
    const errorList: ProgramErrorOdeshin<EstinantName>[] = [];
    splitList({
      list: importAndErrorList,
      isElementA: (element): element is TypeScriptFileImport =>
        'isInternal' in element,
      accumulatorA: importList,
      accumulatorB: errorList,
    });

    return {
      [PROGRAM_ERROR_GEPP]: errorList,
      [TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP]: importList,
    };
  })
  .assemble();
