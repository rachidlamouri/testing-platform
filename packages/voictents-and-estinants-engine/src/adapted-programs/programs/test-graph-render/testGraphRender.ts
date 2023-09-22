import {
  buildVoictentByGepp,
  digikikify,
} from '../../../adapter/engine/digikikify';
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
import { captureOutputFileDigestList } from '../../programmable-units/captureOutputFileDigestList';
import {
  DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  DirectedGraphMetadataByIdVoque,
} from '../../programmable-units/graph-visualization/directedGraphMetadataById';
import { InMemoryVoictent } from '../../../core/engine/inMemoryVoictent';
import { InMemoryOdeshin2ListVoictent } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { ProgramFileCache } from '../../../utilities/programFileCache';
import { SANITY_SNAPSHOT_GEPP } from '../../programmable-units/sanitySnapshot';
import { OutputFileVoictent } from '../../programmable-units/output-file/outputFileVoictent';
import { GraphLikeLabelLocation } from '../../programmable-units/graph-visualization/directed-graph/attributeByKeyGSC';
import { defaultFileGeppCombination } from '../../programmable-units/file/defaultFileGeppCombination';

const programFileCache = new ProgramFileCache({
  namespace: 'testGraphRender',
});

/**
 * Example program to demonstrate defining and rendering a directed graph.
 */
digikikify({
  explicitVoictentTuple: [
    new InMemoryVoictent<FileSystemObjectEnumeratorConfigurationVoque>({
      gepp: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
      initialHubblepupPelueTuple: [
        {
          directoryPath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/graph-visualization',
          ignoredNodePathConfigurationList: [],
        },
      ],
    }),
    new InMemoryOdeshin2ListVoictent<DirectedGraphVoque>({
      gepp: DIRECTED_GRAPH_GEPP,
      initialHubblepupPelueTuple: [
        {
          zorn: 'my-graph',
          isRoot: true,
          attributeByKey: {
            id: 'my graph',
            label: 'my graph',
            labelloc: GraphLikeLabelLocation.Top,
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
              zorn: 'my_subgraph',
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
    new InMemoryOdeshin2ListVoictent<DirectedGraphMetadataByIdVoque>({
      gepp: DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
      initialHubblepupPelueTuple: [
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
  fileSystemNodeGeppCombination: defaultFileGeppCombination,
  uninferableVoictentByGepp: buildVoictentByGepp([
    new OutputFileVoictent({
      programFileCache,
    }),
  ] as const),
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument,
    addInteractivityToSvgDocument,

    captureOutputFileDigestList,
  ] as const,
  serializeeGeppList: [SANITY_SNAPSHOT_GEPP],
  programFileCache,
});
