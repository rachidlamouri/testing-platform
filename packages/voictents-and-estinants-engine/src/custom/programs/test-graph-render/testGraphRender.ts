import { digikikify } from '../../../type-script-adapter/digikikify';
import { buildQuirmDebugger } from '../../debugger/quirmDebugger';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import { FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP } from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { DIRECTED_GRAPH_GEPP } from '../../programmable-units/graph-visualization/directed-graph/directedGraph';
import { encodeDirectedGraphAsGraphvizCode } from '../../programmable-units/graph-visualization/encodeDirectedGraphAsGraphvizCode';
import { renderGraphvizCodeToSvgDocument } from '../../programmable-units/graph-visualization/renderGraphvizCodeToSvgDocument';
import { addInteractivityToSvgDocument } from '../../programmable-units/graph-visualization/addInteractivityToSvgDocument';
import { DIRECTED_GRAPH_METADATA_BY_ID_GEPP } from '../../programmable-units/graph-visualization/directedGraphMetadataById';
import { LabelLocation } from '../../programmable-units/graph-visualization/directed-graph/attribute';

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
            labelloc: LabelLocation.Top,
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
                id: 'my_subgraph',
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
        zorn: 'my-graph',
        grition: {
          my_subgraph: {
            title: 'My Subgraph',
            fieldList: [
              {
                label: 'About My Subgraph',
                value: 'It is the best!',
              },
            ],
          },
          a: {
            title: 'My Node A',
            fieldList: [
              {
                label: 'Letter',
                value: 'a',
              },
            ],
          },
          b: {
            title: 'My Node B',
            fieldList: [
              {
                label: 'Letter',
                value: 'b',
              },
            ],
          },
          c: {
            title: 'My Node C',
            fieldList: [
              {
                label: 'Letter',
                value: 'c',
              },
            ],
          },
          d: {
            title: 'My Node D',
            fieldList: [
              {
                label: 'Letter',
                value: 'd',
              },
            ],
          },
        },
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
