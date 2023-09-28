import { LintAssertionZorn } from '../../programmable-units/linting/lintAssertion';
import {
  LintAssertionOmission,
  LintAssertionOmissionInstance,
} from '../../programmable-units/linting/lintAssertionOmission';
import { ExportedIdentifierSourceInstance } from '../../programmable-units/linting/source/exportedIdentifierSource';
import { FileSourceInstance } from '../../programmable-units/linting/source/fileSource';
import { noUnusedExportRule } from './markUnusedExports';

const omitterSource = new FileSourceInstance({
  filePath: __filename,
});

// TODO: audit this list
export const omittedUnusedExportList: LintAssertionOmission[] = [
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/file/fileSystemObjectEnumeratorConfiguration.ts',
    importedIdentifierName: 'FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/file/fileSystemObjectEnumeratorConfiguration.ts',
    importedIdentifierName:
      'CI_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/package-agnostic-utilities/strif/strif.ts',
    importedIdentifierName: 'Strif',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/package-agnostic-utilities/strif/strif.ts',
    importedIdentifierName: 'createStrif',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/package-agnostic-utilities/type-script-ast/isIdentifiableTypeScriptTypeReference.ts',
    importedIdentifierName: 'isSpecificIdentifiableTypeScriptTypeReference',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/package-agnostic-utilities/type-script-ast/isMemberExpressionCallExpression.ts',
    importedIdentifierName: 'isMemberExpressionCallExpression',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/package-agnostic-utilities/type-script-ast/isParameterizedCallExpression.ts',
    importedIdentifierName: 'isParameterizedCallExpression',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/package-agnostic-utilities/typed-datum/customTypedDatum.ts',
    importedIdentifierName: 'CustomTypedDatum',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/layer-agnostic-utilities/deprecated-zorn/zornable.ts',
    importedIdentifierName: 'ZornableVoque',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/graph-visualization/directed-graph/directedGraphElement2.ts',
    importedIdentifierName: 'DirectedGraphElement2',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/graph-visualization/directed-graph/directedGraphElement2.ts',
    importedIdentifierName: 'DIRECTED_GRAPH_ELEMENT_2_GEPP',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/graph-visualization/directed-graph/directedGraphElement2.ts',
    importedIdentifierName: 'DirectedGraphElement2Voque',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/graph-visualization/directed-graph/graphContext.ts',
    importedIdentifierName: 'GraphContext',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/graph-visualization/directed-graph/rootGraphLocator.ts',
    importedIdentifierName: 'RootGraphLocator',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/graph-visualization/directed-graph/rootGraphLocator.ts',
    importedIdentifierName: 'RootGraphLocatorInstance',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/graph-visualization/directed-graph/directedCluster2.ts',
    importedIdentifierName: 'DirectedCluster2Instance',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/graph-visualization/directed-graph/directedGraph2.ts',
    importedIdentifierName: 'DirectedGraph2Instance',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/graph-visualization/directed-graph/directedGraphEdge2.ts',
    importedIdentifierName: 'DirectedGraphEdge2Instance',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/graph-visualization/directed-graph/directedGraphNode2.ts',
    importedIdentifierName: 'DirectedGraphNode2Instance',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/graph-visualization/directed-graph/directedSubgraph2.ts',
    importedIdentifierName: 'DirectedSubgraph2Instance',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-knowledge-graph/app/browser/dynamicComponentTypes.ts',
    importedIdentifierName: 'SvgWrapperComponent',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-knowledge-graph/app/browser/dynamicComponentTypes.ts',
    importedIdentifierName: 'GeneratedIndex',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-knowledge-graph/app/browser/theme.ts',
    importedIdentifierName: 'THEME',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-knowledge-graph/app/browser/dynamicComponentTypes.ts',
    importedIdentifierName: 'MetadataField',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-knowledge-graph/app/browser/dynamicComponentTypes.ts',
    importedIdentifierName: 'MetadataById',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/package-agnostic-utilities/type/simplify.ts',
    importedIdentifierName: 'Simplify',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/linting/source/fileLineSource.ts',
    importedIdentifierName: 'FileLineSourceInstance',
  },
  {
    importedFilePath:
      'packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-knowledge-graph/app/browser/left-panel/constants.ts',
    importedIdentifierName: 'EDGE_WIDTH',
  },
].map(({ importedFilePath, importedIdentifierName }) => {
  return new LintAssertionOmissionInstance({
    omitterSource,
    omittedAssertionZorn: new LintAssertionZorn({
      rule: noUnusedExportRule,
      lintSource: new ExportedIdentifierSourceInstance({
        filePath: importedFilePath,
        exportedIdentifier: importedIdentifierName,
      }),
    }),
  });
});
