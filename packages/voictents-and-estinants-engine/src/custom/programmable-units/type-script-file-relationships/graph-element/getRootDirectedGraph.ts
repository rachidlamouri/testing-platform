import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  DirectedGraphVoictent,
  DIRECTED_GRAPH_GEPP,
  DirectedGraph,
  DirectedSubgraph,
} from '../../graph-visualization/directed-graph/directedGraph';
import { DirectedGraphNode } from '../../graph-visualization/directed-graph/directedGraphNode';
import {
  BOUNDARY_METADATA_GEPP,
  BoundaryMetadataVoictent,
} from './boundaryMetadata';
import {
  DIRECTORY_METADATA_GEPP,
  DirectoryMetadataVoictent,
} from './directoryMetadata';
import {
  FILE_NODE_METADATA_GEPP,
  FileNodeMetadataVoictent,
} from './fileNodeMetadata';
import { ROOT_METADATA_GEPP, RootMetadataVoictent } from './rootMetadata';
import { DirectedGraphEdge } from '../../graph-visualization/directed-graph/directedGraphEdge';
import { Tuple } from '../../../../utilities/semantic-types/tuple';
import {
  EXTERNAL_MODULE_METADATA_GEPP,
  ExternalModuleMetadataVoictent,
} from './externalModuleMetadata';

export const getRootDirectedGraph = buildEstinant({
  name: 'getRootDirectedGraph',
})
  .fromGrition<RootMetadataVoictent>({
    gepp: ROOT_METADATA_GEPP,
  })
  .andFromGritionTuple<BoundaryMetadataVoictent, Tuple<string>>({
    gepp: BOUNDARY_METADATA_GEPP,
    framate: (leftInput) => [...leftInput.grition.relevantBoundaryIdSet],
    croard: (rightInput) => rightInput.grition.id,
  })
  .andFromOdeshinVoictent<DirectoryMetadataVoictent>({
    gepp: DIRECTORY_METADATA_GEPP,
  })
  .andFromOdeshinVoictent<FileNodeMetadataVoictent>({
    gepp: FILE_NODE_METADATA_GEPP,
  })
  .andFromOdeshinVoictent<ExternalModuleMetadataVoictent>({
    gepp: EXTERNAL_MODULE_METADATA_GEPP,
  })
  .toGrition<DirectedGraphVoictent>({
    gepp: DIRECTED_GRAPH_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe(
    (
      rootMetadata,
      relevantBoundaryMetadataList,
      directoryMetadataList,
      fileNodeMetadataList,
      externalModuleMetadataList,
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
        isRoot: true,
        attributeByKey: {
          id: rootMetadata.id,
          ...rootMetadata.attributeByKey,
        },
        nodeList: [],
        edgeList: [],
        subgraphList: [],
      };

      const boundarySubgraphList = relevantBoundaryMetadataList.map(
        (metadata) => {
          const subgraph: DirectedSubgraph = {
            isRoot: false,
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
          const subgraph: DirectedSubgraph = {
            isRoot: false,
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

      const subgraphById = new Map<string, DirectedSubgraph>();
      allSubgraphList.forEach((subgraph) => {
        subgraphById.set(subgraph.attributeByKey.id, subgraph);
      });

      relevantBoundaryMetadataList.forEach((metadata) => {
        const subgraph = subgraphById.get(metadata.id) as DirectedSubgraph;

        rootDirectedGraph.subgraphList.push(subgraph);
      });

      relevantDirectoryMetadataList.forEach((metadata) => {
        const childSubgraph = subgraphById.get(metadata.id) as DirectedSubgraph;
        const parentSubgraph = subgraphById.get(
          metadata.boundaryId,
        ) as DirectedSubgraph;

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
        ) as DirectedSubgraph;
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
        ) as DirectedSubgraph;
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
