import { digikikify } from '../../type-script-adapter/digikikify';
import { buildBasicQuirmDebugger } from '../debugger/quirmDebugger';
import { fileMattomer } from '../programmable-units/file/fileMattomer';
import { fileMentursection } from '../programmable-units/file/fileMentursection';
import { FILE_MENTURSECTION_CONFIGURATION_GEPP } from '../programmable-units/file/fileMentursectionConfiguration';
import { DIRECTED_GRAPH_GEPP } from '../programmable-units/graph-visualization/directed-graph/directedGraph';
import { directedGraphToGraphvizCode } from '../programmable-units/graph-visualization/directedGraphToGraphvizCode';
import { graphvizCodeToSvgDocument } from '../programmable-units/graph-visualization/graphvizCodeToSvgDocument';
import { svgDocumentToInteractivePage } from '../programmable-units/graph-visualization/svgDocumentToInteractivePage';
import { typeScriptFileRelationshipWattlection } from '../programmable-units/type-script-file-relationships/typeScriptFileRelationshipList';
import { parsedTypeScriptFileMentursection } from '../programmable-units/type-script-file/parsedTypeScriptFile';
import { typeScriptFileConfigurationOnama } from '../programmable-units/type-script-file/typeScriptFileConfiguration';
import { typeScriptFileImportListOnama } from '../programmable-units/type-script-file/typeScriptFileImportList';

digikikify({
  initialVoictentsByGepp: {
    [FILE_MENTURSECTION_CONFIGURATION_GEPP]: [
      {
        directoryPath:
          'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization',
        ignoredNodePathConfigurationList: [],
      },
    ],
    [DIRECTED_GRAPH_GEPP]: [
      {
        zorn: 'my-graph',
        grition: {
          id: 'my graph',
          label: 'my graph',
          nodeList: [
            {
              id: 'a',
              label: 'node a',
            },
            {
              id: 'b',
              label: 'node b',
            },
          ],
          edgeList: [
            {
              tailId: 'a',
              headId: 'b',
            },
            {
              tailId: 'a',
              headId: 'c',
            },
          ],
          subgraphList: [
            {
              id: 'my subgraph',
              label: 'my subgraph',
              nodeList: [
                {
                  id: 'c',
                  label: 'node c',
                },
                {
                  id: 'd',
                  label: 'node d',
                },
              ],
              edgeList: [
                {
                  tailId: 'c',
                  headId: 'd',
                },
              ],
              subgraphList: [],
            },
          ],
        },
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

    directedGraphToGraphvizCode,
    graphvizCodeToSvgDocument,
    svgDocumentToInteractivePage,
  ],
  quirmDebugger: buildBasicQuirmDebugger('testGraphRender'),
});
