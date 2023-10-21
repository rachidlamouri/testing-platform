import {
  buildCollectionByCollectionId,
  runEngine,
} from '../../../adapter/engine/runEngine';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
  FileSystemObjectEnumeratorConfigurationStreamMetatype,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import {
  DIRECTED_GRAPH_COLLECTION_ID,
  DirectedGraphStreamMetatype,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraph';
import { encodeDirectedGraphAsGraphvizCode } from '../../programmable-units/graph-visualization/encodeDirectedGraphAsGraphvizCode';
import { renderGraphvizCodeToSvgDocument } from '../../programmable-units/graph-visualization/renderGraphvizCodeToSvgDocument';
import { addInteractivityToSvgDocument } from '../../programmable-units/graph-visualization/addInteractivityToSvgDocument';
import { captureOutputFileDigestList } from '../../programmable-units/sanity-snapshot/captureOutputFileDigestList';
import {
  DIRECTED_GRAPH_METADATA_BY_ID_COLLECTION_ID,
  DirectedGraphMetadataByIdStreamMetatype,
} from '../../programmable-units/graph-visualization/directedGraphMetadataById';
import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import { InMemoryIdentifiableItem3Collection } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import { SANITY_SNAPSHOT_COLLECTION_ID } from '../../programmable-units/sanity-snapshot/sanitySnapshot';
import { OutputFileCollection } from '../../programmable-units/output-file/outputFileCollection';
import { GraphLikeLabelLocation } from '../../programmable-units/graph-visualization/directed-graph/attributeByKeyGSC';
import { defaultFileCollectionIdCombination } from '../../programmable-units/file/defaultFileCollectionIdCombination';

const programFileCache = new ProgramFileCache({
  namespace: 'testGraphRender',
});

/**
 * Example program to demonstrate defining and rendering a directed graph.
 *
 * @canonicalComment
 */
runEngine({
  explicitCollectionTuple: [
    new InMemoryCollection<FileSystemObjectEnumeratorConfigurationStreamMetatype>(
      {
        collectionId: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
        initialItemEggTuple: [
          {
            directoryPath:
              'packages/mdd-engine/src/adapted-programs/programmable-units/graph-visualization',
            ignoredNodePathConfigurationList: [],
          },
        ],
      },
    ),
    new InMemoryIdentifiableItem3Collection<DirectedGraphStreamMetatype>({
      collectionId: DIRECTED_GRAPH_COLLECTION_ID,
      initialItemEggTuple: [
        {
          id: 'my-graph',
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
              id: 'mySubgraph',
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
    new InMemoryIdentifiableItem3Collection<DirectedGraphMetadataByIdStreamMetatype>(
      {
        collectionId: DIRECTED_GRAPH_METADATA_BY_ID_COLLECTION_ID,
        initialItemEggTuple: [
          {
            id: 'my-graph',
            subitem: {
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
  fileSystemNodeCollectionIdCombination: defaultFileCollectionIdCombination,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    new OutputFileCollection({
      programFileCache,
    }),
  ] as const),
  programmedTransformTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument,
    addInteractivityToSvgDocument,

    captureOutputFileDigestList,
  ] as const,
  serializeeCollectionIdList: [SANITY_SNAPSHOT_COLLECTION_ID],
  programFileCache,
});
