import { digikikify } from '../../type-script-adapter/digikikify';
import { buildQuirmDebugger } from '../debugger/quirmDebugger';
import { fileMattomer } from '../programmable-units/file/fileMattomer';
import { fileMentursection } from '../programmable-units/file/fileMentursection';
import { FILE_MENTURSECTION_CONFIGURATION_GEPP } from '../programmable-units/file/fileMentursectionConfiguration';
import { DIRECTED_GRAPH_GEPP } from '../programmable-units/graph-visualization/directed-graph/directedGraph';
import { directedGraphToGraphvizCode } from '../programmable-units/graph-visualization/directedGraphToGraphvizCode';
import { graphvizCodeToSvgDocument } from '../programmable-units/graph-visualization/graphvizCodeToSvgDocument';
import { svgDocumentToInteractivePage } from '../programmable-units/graph-visualization/svgDocumentToInteractivePage';

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
          isRoot: true,
          attributeByKey: {
            id: 'my graph',
            label: 'my graph',
          },
          nodeList: [
            {
              attributeByKey: {
                id: 'a',
                label: 'node a',
              },
            },
            {
              attributeByKey: {
                id: 'b',
                label: 'node b',
              },
            },
          ],
          edgeList: [
            {
              tailId: 'a',
              headId: 'b',
              attributeByKey: {
                id: 'a:b',
              },
            },
            {
              tailId: 'a',
              headId: 'c',
              attributeByKey: {
                id: 'a:c',
              },
            },
          ],
          subgraphList: [
            {
              isRoot: false,
              attributeByKey: {
                id: 'cluster_my_subgraph',
                label: 'my subgraph',
              },
              nodeList: [
                {
                  attributeByKey: {
                    id: 'c',
                    label: 'node c',
                  },
                },
                {
                  attributeByKey: {
                    id: 'd',
                    label: 'node d',
                  },
                },
              ],
              edgeList: [
                {
                  tailId: 'c',
                  headId: 'd',
                  attributeByKey: {
                    id: 'c:d',
                  },
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

    directedGraphToGraphvizCode,
    graphvizCodeToSvgDocument,
    svgDocumentToInteractivePage,
  ],
  quirmDebugger: buildQuirmDebugger('testGraphRender'),
});
