import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  DIRECTED_GRAPH_GEPP,
  DirectedGraph,
  DirectedGraphVoque,
} from '../../graph-visualization/directed-graph/directedGraph';
import {
  DirectedGraphNode,
  NodeShape,
} from '../../graph-visualization/directed-graph/directedGraphNode';
import {
  BOUNDARY_METADATA_GEPP,
  BoundaryMetadataVoque,
} from './boundaryMetadata';
import {
  DIRECTORY_METADATA_GEPP,
  DirectoryMetadataVoque,
} from './directoryMetadata';
import {
  FILE_NODE_METADATA_GEPP,
  FileNodeMetadataVoque,
} from './fileNodeMetadata';
import { ROOT_METADATA_GEPP, RootMetadataVoque } from './rootMetadata';
import { DirectedGraphEdge } from '../../graph-visualization/directed-graph/directedGraphEdge';
import { Tuple } from '../../../../utilities/semantic-types/tuple';
import {
  EXTERNAL_MODULE_METADATA_GEPP,
  ExternalModuleMetadataVoque,
} from './externalModuleMetadata';
import { OVERVIEW_BOUNDARY_ZORN } from './boundaryConfiguration';
import { COMMON_ATTRIBUTE_BY_KEY, FONT_SIZE } from './commonAttributeByKey';
import { ROOT_DIRECTORY_GEPP, RootDirectoryVoque } from '../rootDirectory';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../typeScriptFileRelationshipGraphZorn';
import { getTextDigest } from '../../../../utilities/getTextDigest';
import { DirectedCluster } from '../../graph-visualization/directed-graph/directedSubgraph';

/**
 * Converts all TypeScript relationship metadata into a directed graph
 */
export const getRootDirectedGraph = buildEstinant({
  name: 'getRootDirectedGraph',
})
  .fromHubblepup2<RootMetadataVoque>({
    gepp: ROOT_METADATA_GEPP,
  })
  .andFromHubblepupTuple2<RootMetadataVoque, [string]>({
    gepp: ROOT_METADATA_GEPP,
    framate: () => [OVERVIEW_BOUNDARY_ZORN],
    croard: (rightInput) => rightInput.indexByName.zorn,
  })
  .andFromHubblepupTuple2<BoundaryMetadataVoque, Tuple<string>>({
    gepp: BOUNDARY_METADATA_GEPP,
    framate: (leftInput) => [...leftInput.hubblepup.relevantBoundaryIdSet],
    croard: (rightInput) => rightInput.hubblepup.id,
  })
  .andFromHubblepupTuple2<RootDirectoryVoque, [string]>({
    gepp: ROOT_DIRECTORY_GEPP,
    framate: () => [TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN],
    croard: (rightInput) => rightInput.indexByName.zorn,
  })
  .andFromVoictent2<DirectoryMetadataVoque>({
    gepp: DIRECTORY_METADATA_GEPP,
  })
  .andFromVoictent2<FileNodeMetadataVoque>({
    gepp: FILE_NODE_METADATA_GEPP,
  })
  .andFromVoictent2<ExternalModuleMetadataVoque>({
    gepp: EXTERNAL_MODULE_METADATA_GEPP,
  })
  .andFromVoictent2<RootMetadataVoque>({
    gepp: ROOT_METADATA_GEPP,
  })
  .toHubblepup2<DirectedGraphVoque>({
    gepp: DIRECTED_GRAPH_GEPP,
  })
  .onPinbe(
    (
      rootMetadata,
      [overviewRootMetadata],
      relevantBoundaryMetadataList,
      [rootDirectory],
      directoryMetadataList,
      fileNodeMetadataList,
      externalModuleMetadataList,
      allRootMetadataOdeshinList,
    ) => {
      const nodeWithEdgeSet = new Set(
        rootMetadata.edgeMetadataList.flatMap((metadata) => {
          return [metadata.tail, metadata.head];
        }),
      );

      const relevantDirectoryMetadataList = directoryMetadataList.filter(
        (metadata) =>
          rootMetadata.relevantBoundaryIdSet.has(metadata.boundaryId),
      );

      const relevantFileNodeMetadataList = fileNodeMetadataList.filter(
        (metadata) => {
          return (
            metadata.boundaryId === rootMetadata.boundaryId ||
            nodeWithEdgeSet.has(metadata)
          );
        },
      );

      const relevantExternalModuleMetadataList =
        externalModuleMetadataList.filter((metadata) => {
          return (
            metadata.boundaryId === rootMetadata.boundaryId ||
            nodeWithEdgeSet.has(metadata)
          );
        });

      const rootDirectedGraph: DirectedGraph = {
        zorn: rootMetadata.zorn,
        isRoot: true,
        attributeByKey: {
          id: rootMetadata.id,
          ...rootMetadata.attributeByKey,
        },
        nodeList: [],
        edgeList: [],
        subgraphList: [],
      };

      // TODO: maybe put the custom overview graph logic in a different transform :shruggy-mc-shrug-face:
      if (rootMetadata.id === overviewRootMetadata.id) {
        const overviewSubgraphByName = new Map<string, DirectedCluster>();

        allRootMetadataOdeshinList.forEach((metadata) => {
          const filePath = metadata.zorn;
          const modifiedFilePath = filePath.replace(
            `internal/${rootDirectory.directoryPath}/`,
            '',
          );

          let nodeLabel: string;
          let subgraph: DirectedCluster | null;
          if (filePath.includes('/')) {
            const subgraphName = modifiedFilePath.split('/')[0];

            if (modifiedFilePath === subgraphName) {
              nodeLabel = '.';
            } else {
              nodeLabel = modifiedFilePath.replace(`${subgraphName}/`, '');
            }

            subgraph =
              overviewSubgraphByName.get(subgraphName) ??
              ({
                zorn: getTextDigest(subgraphName),
                isRoot: false,
                isCluster: true,
                attributeByKey: {
                  id: getTextDigest(subgraphName),
                  label: `${subgraphName}/`,
                  fontsize: FONT_SIZE.directory,
                  ...COMMON_ATTRIBUTE_BY_KEY,
                },
                nodeList: [],
                edgeList: [],
                subgraphList: [],
              } satisfies DirectedCluster);

            if (!overviewSubgraphByName.has(subgraphName)) {
              rootDirectedGraph.subgraphList.push(subgraph);
            }

            overviewSubgraphByName.set(subgraphName, subgraph);
          } else {
            subgraph = null;
            nodeLabel = modifiedFilePath;
          }

          const node: DirectedGraphNode = {
            attributeByKey: {
              id: metadata.boundaryId,
              label: nodeLabel,
              shape: NodeShape.Box,
              fontsize: FONT_SIZE.node,
              ...COMMON_ATTRIBUTE_BY_KEY,
            },
          };

          if (subgraph === null) {
            rootDirectedGraph.nodeList.push(node);
          } else {
            subgraph.nodeList.push(node);
          }

          [...metadata.importedBoundaryIdSet].forEach((importedBoundaryId) => {
            const tailId = metadata.boundaryId;
            const headId = importedBoundaryId;

            const edge: DirectedGraphEdge = {
              attributeByKey: {
                id: `${tailId}:${headId}`,
              },
              tailId,
              headId,
            };

            rootDirectedGraph.edgeList.push(edge);
          });
        });

        return rootDirectedGraph;
      }

      const boundarySubgraphList = relevantBoundaryMetadataList.map(
        (metadata) => {
          const subgraph: DirectedCluster = {
            zorn: metadata.id,
            isRoot: false,
            isCluster: true,
            attributeByKey: {
              id: metadata.id,
              ...metadata.attributeByKey,
            },
            nodeList: [],
            edgeList: [],
            subgraphList: [],
          };

          if (metadata.id !== rootMetadata.boundaryId) {
            // subgraph.attributeByKey.color = 'b;acl';
          } else {
            subgraph.attributeByKey.color = '#0377fc';
          }

          return subgraph;
        },
      );

      const directorySubgraphList = relevantDirectoryMetadataList.map(
        (metadata) => {
          const subgraph: DirectedCluster = {
            zorn: metadata.id,
            isRoot: false,
            isCluster: true,
            attributeByKey: {
              id: metadata.id,
              ...metadata.attributeByKey,
            },
            nodeList: [],
            edgeList: [],
            subgraphList: [],
          };

          return subgraph;
        },
      );

      const allSubgraphList = [
        ...boundarySubgraphList,
        ...directorySubgraphList,
      ];

      const subgraphById = new Map<string, DirectedCluster>();
      allSubgraphList.forEach((subgraph) => {
        subgraphById.set(subgraph.attributeByKey.id, subgraph);
      });

      relevantBoundaryMetadataList.forEach((metadata) => {
        const subgraph = subgraphById.get(metadata.id) as DirectedCluster;

        rootDirectedGraph.subgraphList.push(subgraph);
      });

      relevantDirectoryMetadataList.forEach((metadata) => {
        const childSubgraph = subgraphById.get(metadata.id) as DirectedCluster;
        const parentSubgraph = subgraphById.get(
          metadata.boundaryId,
        ) as DirectedCluster;

        parentSubgraph.subgraphList.push(childSubgraph);
      });

      relevantFileNodeMetadataList.forEach((metadata) => {
        const node: DirectedGraphNode = {
          attributeByKey: {
            id: metadata.id,
            ...metadata.attributeByKey,
          },
        };

        const parentSubgraph = subgraphById.get(
          metadata.directoryId,
        ) as DirectedCluster;
        parentSubgraph.nodeList.push(node);
      });

      relevantExternalModuleMetadataList.forEach((metadata) => {
        const node: DirectedGraphNode = {
          attributeByKey: {
            id: metadata.id,
            ...metadata.attributeByKey,
          },
        };

        const parentSubgraph = subgraphById.get(
          metadata.boundaryId,
        ) as DirectedCluster;
        parentSubgraph.nodeList.push(node);
      });

      const edgeList = rootMetadata.edgeMetadataList.map((metadata) => {
        const tailId = metadata.tail.id;
        const headId = metadata.head.id;

        const edge: DirectedGraphEdge = {
          attributeByKey: {
            id: `${tailId}:${headId}`,
          },
          tailId,
          headId,
        };

        return edge;
      });

      rootDirectedGraph.edgeList = edgeList;

      return rootDirectedGraph;
    },
  )
  .assemble();
