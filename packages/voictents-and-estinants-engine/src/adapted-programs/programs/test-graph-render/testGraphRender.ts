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
import { captureOutputFileDigestList } from '../../programmable-units/sanity-snapshot/captureOutputFileDigestList';
import {
  DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  DirectedGraphMetadataByIdVoque,
} from '../../programmable-units/graph-visualization/directedGraphMetadataById';
import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import { InMemoryIdentifiableItem2ListCollection } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import { SANITY_SNAPSHOT_GEPP } from '../../programmable-units/sanity-snapshot/sanitySnapshot';
import { OutputFileVoictent } from '../../programmable-units/output-file/outputFileVoictent';
import { GraphLikeLabelLocation } from '../../programmable-units/graph-visualization/directed-graph/attributeByKeyGSC';
import { defaultFileGeppCombination } from '../../programmable-units/file/defaultFileGeppCombination';

const programFileCache = new ProgramFileCache({
  namespace: 'testGraphRender',
});

/**
 * Example program to demonstrate defining and rendering a directed graph.
 *
 * @canonicalComment
 */
digikikify({
  explicitVoictentTuple: [
    new InMemoryCollection<FileSystemObjectEnumeratorConfigurationVoque>({
      collectionId: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
      initialItemEggTuple: [
        {
          directoryPath:
            'packages/voictents-and-estinants-engine/src/adapted-programs/programmable-units/graph-visualization',
          ignoredNodePathConfigurationList: [],
        },
      ],
    }),
    new InMemoryIdentifiableItem2ListCollection<DirectedGraphVoque>({
      collectionId: DIRECTED_GRAPH_GEPP,
      initialItemEggTuple: [
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
              zorn: 'mySubgraph',
              isRoot: false,
              isCluster: true,
              attributeByKey: {
                id: 'mySubgraph',
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
    new InMemoryIdentifiableItem2ListCollection<DirectedGraphMetadataByIdVoque>(
      {
        collectionId: DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
        initialItemEggTuple: [
          {
            zorn: 'my-graph',
            grition: {
              mySubgraph: {
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
    ),
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
