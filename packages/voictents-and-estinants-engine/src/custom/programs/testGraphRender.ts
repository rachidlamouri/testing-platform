import { digikikify } from '../../type-script-adapter/digikikify';
import { buildQuirmDebugger } from '../debugger/quirmDebugger';
import { categorizeFiles } from '../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../programmable-units/file/enumerateFileSystemObjects';
import { FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP } from '../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { DIRECTED_GRAPH_GEPP } from '../programmable-units/graph-visualization/directed-graph/directedGraph';
import { encodeDirectedGraphAsGraphvizCode } from '../programmable-units/graph-visualization/encodeDirectedGraphAsGraphvizCode';
import { renderGraphvizCodeToSvgDocument } from '../programmable-units/graph-visualization/renderGraphvizCodeToSvgDocument';
import { addInteractivityToSvgDocument } from '../programmable-units/graph-visualization/addInteractivityToSvgDocument';
import { DIRECTED_GRAPH_METADATA_BY_ID_GEPP } from '../programmable-units/graph-visualization/directedGraphMetadataById';

digikikify({
  initialVoictentsByGepp: {
    [FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP]: [
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
    [DIRECTED_GRAPH_METADATA_BY_ID_GEPP]: [
      {
        cluster_my_subgraph: 'My Subgraph is the best',
        a: 'My Node A',
        b: 'My Node B',
        c: 'My Node C',
        d: 'My Node D',
      },
    ],
  },
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument,
    addInteractivityToSvgDocument,
  ],
  quirmDebugger: buildQuirmDebugger('testGraphRender'),
});
