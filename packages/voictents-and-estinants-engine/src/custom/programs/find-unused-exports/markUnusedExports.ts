import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  GenericProgramErrorVoque,
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  ReceivedProgramError,
  ReportingEstinantLocator,
} from '../../programmable-units/error/programError';
import {
  TYPE_SCRIPT_FILE_EXPORT_LIST_GEPP,
  TypeScriptFileExportListVoque,
} from '../../programmable-units/type-script-file/typeScriptFileExportList';
import {
  TYPE_SCRIPT_FILE_IMPORT_LIST_GEPP,
  TypeScriptFileImportListVoque,
} from '../../programmable-units/type-script-file/typeScriptFileImportList';

const ESTINANT_NAME = 'markUnusedExports' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

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
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
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

    const errorList: ReceivedProgramError<ReportingLocator>[] = [];

    const haphazardouslyProtectedFromBeingMarkedAsUnusedList: typeof importItemList[number][] =
      [
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/custom/programmable-units/file/fileSystemObjectEnumeratorConfiguration.ts',
          importedIdentifierName:
            'FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/custom/programmable-units/file/fileSystemObjectEnumeratorConfiguration.ts',
          importedIdentifierName:
            'CI_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/utilities/filterTuple.ts',
          importedIdentifierName: 'FilterTupleByAcceptanceUnion',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/utilities/semantic-types/strif/strif.ts',
          importedIdentifierName: 'Strif',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/utilities/semantic-types/strif/strif.ts',
          importedIdentifierName: 'createStrif',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/utilities/type-script-ast/isIdentifiableTypeScriptTypeReference.ts',
          importedIdentifierName:
            'isSpecificIdentifiableTypeScriptTypeReference',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/utilities/type-script-ast/isMemberExpressionCallExpression.ts',
          importedIdentifierName: 'isMemberExpressionCallExpression',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/utilities/type-script-ast/isParameterizedCallExpression.ts',
          importedIdentifierName: 'isParameterizedCallExpression',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/utilities/typed-datum/customTypedDatum.ts',
          importedIdentifierName: 'CustomTypedDatum',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/custom/programmable-units/in-memory-cache/zornable.ts',
          importedIdentifierName: 'ZornableVoque',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/directed-graph/directedGraphElement2.ts',
          importedIdentifierName: 'DirectedGraphElement2',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/directed-graph/directedGraphElement2.ts',
          importedIdentifierName: 'DIRECTED_GRAPH_ELEMENT_2_GEPP',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/directed-graph/directedGraphElement2.ts',
          importedIdentifierName: 'DirectedGraphElement2Voque',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/directed-graph/graphContext.ts',
          importedIdentifierName: 'GraphContext',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/directed-graph/rootGraphLocator.ts',
          importedIdentifierName: 'RootGraphLocator',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/directed-graph/rootGraphLocator.ts',
          importedIdentifierName: 'RootGraphLocatorInstance',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/directed-graph/directedCluster2.ts',
          importedIdentifierName: 'DirectedCluster2Instance',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/directed-graph/directedGraph2.ts',
          importedIdentifierName: 'DirectedGraph2Instance',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/directed-graph/directedGraphEdge2.ts',
          importedIdentifierName: 'DirectedGraphEdge2Instance',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/directed-graph/directedGraphNode2.ts',
          importedIdentifierName: 'DirectedGraphNode2Instance',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization/directed-graph/directedSubgraph2.ts',
          importedIdentifierName: 'DirectedSubgraph2Instance',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/custom/programs/render-knowledge-graph/app/browser/dynamicComponentTypes.ts',
          importedIdentifierName: 'GeneratedComponent',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/custom/programs/render-knowledge-graph/app/browser/dynamicComponentTypes.ts',
          importedIdentifierName: 'GeneratedItem',
        },
        {
          importingFilePath: '',
          importedFilePath:
            'packages/voictents-and-estinants-engine/src/custom/programs/render-knowledge-graph/app/browser/dynamicComponentTypes.ts',
          importedIdentifierName: 'GeneratedCollection',
        },
      ];

    [
      ...haphazardouslyProtectedFromBeingMarkedAsUnusedList,
      ...importItemList,
    ].forEach((importItem) => {
      const innerMap = outerMap.get(importItem.importedFilePath);
      const mutableState = innerMap?.get(importItem.importedIdentifierName);

      if (mutableState !== undefined) {
        mutableState.isImported = true;
      } else {
        errorList.push({
          name: 'unlocatable-import',
          error: new Error(
            `Unable to find file corresponding to import "${importItem.importedIdentifierName}"`,
          ),
          reporterLocator,
          sourceLocator: {
            typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
            filePath: importItem.importingFilePath,
          },
          context: {
            importItem,
            innerMap,
          },
        });
      }
    });

    const exportStateList = [...outerMap.values()].flatMap((innerMap) => {
      return [...innerMap.values()];
    });

    const unusedExportList = exportStateList.filter((state) => {
      return !state.isImported;
    });

    unusedExportList.forEach((exportState) => {
      errorList.push({
        name: 'unused-export',
        error: new Error(
          `Export "${exportState.identifierName}" is not imported by anything`,
        ),
        reporterLocator,
        sourceLocator: {
          typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
          filePath: exportState.filePath,
        },
        context: {
          exportState,
        },
      });
    });

    return errorList;
  })
  .assemble();
