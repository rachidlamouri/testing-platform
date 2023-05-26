import { digikikify } from '../../../type-script-adapter/digikikify';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  FileSystemObjectEnumeratorConfigurationVoque,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import {
  DIRECTED_GRAPH_GEPP,
  DirectedGraphVoque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraph';
import { encodeDirectedGraphAsGraphvizCode } from '../../programmable-units/graph-visualization/encodeDirectedGraphAsGraphvizCode';
import { renderGraphvizCodeToSvgDocument } from '../../programmable-units/graph-visualization/renderGraphvizCodeToSvgDocument';
import { addInteractivityToSvgDocument } from '../../programmable-units/graph-visualization/addInteractivityToSvgDocument';
import { LabelLocation } from '../../programmable-units/graph-visualization/directed-graph/attribute';
import { captureOutputFileDigestList } from '../../programmable-units/captureOutputFileDigestList';
import {
  DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  DirectedGraphMetadataByIdVoque,
} from '../../programmable-units/graph-visualization/directedGraphMetadataById';
import { InMemoryVoictent } from '../../../core/engine/inMemoryVoictent';
import {
  OutputFileVoque,
  OUTPUT_FILE_GEPP,
} from '../../programmable-units/output-file/outputFile';
import { InMemoryOdeshin2Voictent } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { ProgramFileCache } from '../../../utilities/programFileCache';
import { SANITY_SNAPSHOT_GEPP } from '../../programmable-units/sanitySnapshot';

/**
 * Example program to demonstrate defining and rendering a directed graph.
 */
digikikify({
  populatedVoictentTuple: [
    new InMemoryVoictent<FileSystemObjectEnumeratorConfigurationVoque>({
      gepp: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
      initialHubblepupTuple: [
        {
          directoryPath:
            'packages/voictents-and-estinants-engine/src/custom/programmable-units/graph-visualization',
          ignoredNodePathConfigurationList: [],
        },
      ],
    }),
    new InMemoryOdeshin2Voictent<DirectedGraphVoque>({
      gepp: DIRECTED_GRAPH_GEPP,
      initialHubblepupTuple: [
        {
          zorn: 'my-graph',
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
              isCluster: true,
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
      ],
    }),
    new InMemoryOdeshin2Voictent<DirectedGraphMetadataByIdVoque>({
      gepp: DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
      initialHubblepupTuple: [
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
    }),
  ] as const,
  uninferableVoictentTuple: [
    new InMemoryVoictent<OutputFileVoque>({
      gepp: OUTPUT_FILE_GEPP,
      initialHubblepupTuple: [],
    }),
  ],
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument,
    addInteractivityToSvgDocument,

    captureOutputFileDigestList,
  ] as const,
  serializeeVoictentGeppList: [SANITY_SNAPSHOT_GEPP],
  programFileCache: new ProgramFileCache({
    namespace: 'testGraphRender',
  }),
});
