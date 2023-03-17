import { digikikify } from '../../type-script-adapter/digikikify';
import { buildQuirmDebugger } from '../debugger/quirmDebugger';
import { customDirectedGraphToDirectedGraph } from '../programmable-units/custom-directed-graph/customDirectedGraphToDirectedGraph';
import { fileMattomer } from '../programmable-units/file/fileMattomer';
import { fileMentursection } from '../programmable-units/file/fileMentursection';
import {
  FILE_MENTURSECTION_CONFIGURATION_GEPP,
  VOICTENTS_AND_ESTINANTS_FILE_MENTURSECTION_CONFIGURATION,
} from '../programmable-units/file/fileMentursectionConfiguration';
import { GRAPH_BOUNDARY_GEPP } from '../programmable-units/graph-boundary/graphBoundary';
import { directedGraphToGraphvizCode } from '../programmable-units/graph-visualization/directedGraphToGraphvizCode';
import { graphvizCodeToSvgDocument } from '../programmable-units/graph-visualization/graphvizCodeToSvgDocument';
import { svgDocumentToInteractivePage } from '../programmable-units/graph-visualization/svgDocumentToInteractivePage';
import { typeScriptFileRelationshipWattlection } from '../programmable-units/type-script-file-relationships/typeScriptFileRelationshipList';
import { typeScriptFileRelationshipListToCustomGraph } from '../programmable-units/type-script-file-relationships/typeScriptFileRelationshipListToCustomGraph';
import { parsedTypeScriptFileMentursection } from '../programmable-units/type-script-file/parsedTypeScriptFile';
import { typeScriptFileConfigurationOnama } from '../programmable-units/type-script-file/typeScriptFileConfiguration';
import { typeScriptFileImportListOnama } from '../programmable-units/type-script-file/typeScriptFileImportList';

digikikify({
  initialVoictentsByGepp: {
    [FILE_MENTURSECTION_CONFIGURATION_GEPP]: [
      VOICTENTS_AND_ESTINANTS_FILE_MENTURSECTION_CONFIGURATION,
    ],
    [GRAPH_BOUNDARY_GEPP]: [
      {
        directoryPath: 'packages/voictents-and-estinants-engine/src/core',
      },
      {
        directoryPath:
          'packages/voictents-and-estinants-engine/src/custom/adapter',
      },
      {
        directoryPath:
          'packages/voictents-and-estinants-engine/src/custom/debugger',
      },
      {
        directoryPath:
          'packages/voictents-and-estinants-engine/src/custom/programmable-units',
      },
      {
        directoryPath:
          'packages/voictents-and-estinants-engine/src/custom/programs',
      },
      {
        directoryPath:
          'packages/voictents-and-estinants-engine/src/custom/serialize-test-case',
      },
      {
        directoryPath:
          'packages/voictents-and-estinants-engine/src/example-programs',
      },
      {
        directoryPath:
          'packages/voictents-and-estinants-engine/src/type-script-adapter',
      },
      {
        directoryPath: 'packages/voictents-and-estinants-engine/src/utilities',
      },
    ],
  },
  estinantTuple: [
    fileMentursection,
    fileMattomer,

    typeScriptFileConfigurationOnama,
    parsedTypeScriptFileMentursection,
    typeScriptFileImportListOnama,

    typeScriptFileRelationshipWattlection,

    typeScriptFileRelationshipListToCustomGraph,
    customDirectedGraphToDirectedGraph,
    directedGraphToGraphvizCode,
    graphvizCodeToSvgDocument,
    svgDocumentToInteractivePage,
  ],
  quirmDebugger: buildQuirmDebugger('renderTypeScriptFileRelationships'),
});
