import { posix } from 'path';
import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import {
  GenericLintAssertion,
  LINT_ASSERTION_GEPP,
  LintAssertion,
  LintAssertionVoque,
} from '../../programmable-units/linting/lintAssertion';
import { TypedRule } from '../../programmable-units/linting/rule';
import { EstinantSourceInstance } from '../../programmable-units/linting/source/estinantSource';
import { ExportedIdentifierSourceInstance } from '../../programmable-units/linting/source/exportedIdentifierSource';
import { ImportedIdentifierSourceInstance } from '../../programmable-units/linting/source/importedIdentifierSource';
import {
  TYPE_SCRIPT_FILE_EXPORT_LIST_GEPP,
  TypeScriptFileExportListVoque,
} from '../../programmable-units/type-script-file/typeScriptFileExportList';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImportListVoque,
} from '../../programmable-units/type-script-file/typeScriptFileImportList';

const ESTINANT_NAME = 'markUnusedExports' as const;
const ruleSource = new EstinantSourceInstance({
  estinantName: ESTINANT_NAME,
  filePath: posix.relative('', __filename),
});

type LocatableImportRuleMessageContext = { importedIdentifierName: string };
const locatableImportRule = new TypedRule<LocatableImportRuleMessageContext>({
  source: ruleSource,
  name: 'import-is-locatable',
  description: 'All imports must have a resolvable source',
  getErrorMessage: ({ importedIdentifierName }): string => {
    return `Unable to find file corresponding to import "${importedIdentifierName}"`;
  },
});

type NoUnusedExportRuleMessageContext = { exportedIdentifierName: string };
export const noUnusedExportRule =
  new TypedRule<NoUnusedExportRuleMessageContext>({
    source: ruleSource,
    name: 'export-is-imported',
    description: 'All exports must be imported somewhere',
    getErrorMessage: ({ exportedIdentifierName }): string => {
      return `Export "${exportedIdentifierName}" is not imported by anything`;
    },
  });

/**
 * Produces an error for every named export that is not imported by any other
 * file
 *
 * @todo export { x } from  'y' is not being seen as "import" syntax and isn't counting as an import
 */
export const markUnusedExports = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromVoictent2<TypeScriptFileImportListVoque>({
    gepp: TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  })
  .andFromVoictent2<TypeScriptFileExportListVoque>({
    gepp: TYPE_SCRIPT_FILE_EXPORT_LIST_GEPP,
  })
  .toHubblepupTuple2<LintAssertionVoque>({
    gepp: LINT_ASSERTION_GEPP,
  })
  .onPinbe((importListList, exportListList) => {
    type FilePath = string;
    type IdentifierName = string;

    type MutableExportState = {
      filePath: string;
      identifierName: string;
      isImported: boolean;
    };

    class InnerMap extends Map<IdentifierName, MutableExportState> {}

    class OuterMap extends Map<FilePath, InnerMap> {}

    const outerMap = new OuterMap(
      exportListList.map((exportList) => {
        const filePath = exportList.zorn;
        const stateList: MutableExportState[] = exportList.list.map(
          (exportItem) => {
            return {
              filePath: exportList.zorn,
              identifierName: exportItem.identifierName,
              isImported: false,
            };
          },
        );

        const innerMap = new InnerMap(
          stateList.map((state) => {
            return [state.identifierName, state] as const;
          }),
        );

        return [filePath, innerMap] as const;
      }),
    );

    const importItemList = importListList.flatMap((importList) => {
      return importList.list
        .filter((importItem) => importItem.isInternal)
        .flatMap((importItem) => {
          return importItem.specifierList.map((identifierName) => {
            return {
              importingFilePath: importList.zorn,
              importedFilePath: importItem.sourcePath,
              importedIdentifierName: identifierName,
            };
          });
        });
    });

    const lintAssertionList: GenericLintAssertion[] = [];

    importItemList.forEach((importItem) => {
      const innerMap = outerMap.get(importItem.importedFilePath);
      const mutableState = innerMap?.get(importItem.importedIdentifierName);

      const isLocatableImport = mutableState !== undefined;

      lintAssertionList.push(
        new LintAssertion({
          rule: locatableImportRule,
          lintSource: new ImportedIdentifierSourceInstance({
            importingFilePath: importItem.importingFilePath,
            importedIdentifierName: importItem.importedIdentifierName,
          }),
          isValid: isLocatableImport,
          errorMessageContext: {
            importedIdentifierName: importItem.importedIdentifierName,
          },
          context: {
            importItem,
            innerMap,
          },
        }),
      );

      if (isLocatableImport) {
        mutableState.isImported = true;
      }
    });

    const exportStateList = [...outerMap.values()].flatMap((innerMap) => {
      return [...innerMap.values()];
    });

    exportStateList.forEach((exportState) => {
      lintAssertionList.push(
        new LintAssertion({
          rule: noUnusedExportRule,
          lintSource: new ExportedIdentifierSourceInstance({
            filePath: exportState.filePath,
            exportedIdentifier: exportState.identifierName,
          }),
          errorMessageContext: {
            exportedIdentifierName: exportState.identifierName,
          },
          context: {
            exportState,
          },
          isValid: exportState.isImported,
        }),
      );
    });

    return lintAssertionList;
  })
  .assemble();
