import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { ERROR_GEPP, ErrorOdeshin, ErrorVoictent } from '../../error/error';
import {
  DirectedGraphVoictent,
  DIRECTED_GRAPH_GEPP,
  DirectedGraph,
  DirectedSubgraph,
} from '../../graph-visualization/directed-graph/directedGraph';
import { DirectedGraphNode } from '../../graph-visualization/directed-graph/directedGraphNode';
import {
  NODE_TO_GRAPH_RELATIONSHIP_GEPP,
  NodeToGraphRelationshipVoictent,
} from '../nodeToGraphRelationship';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../typeScriptFileRelationshipGraphZorn';
import {
  BOUNDARY_METADATA_GEPP,
  BoundaryMetadataVoictent,
} from './boundaryMetadata';
import {
  DIRECTORY_METADATA_GEPP,
  DirectoryMetadataVoictent,
} from './directoryMetadata';
import {
  EXTERNAL_MODULE_METADATA_GEPP,
  ExternalModuleMetadataVoictent,
} from './externalModuleMetadata';
import {
  FILE_NODE_METADATA_GEPP,
  FileNodeMetadataVoictent,
} from './fileNodeMetadata';
import {
  ImportRelationshipEdgeVoictent,
  IMPORT_RELATIONSHIP_EDGE_GEPP,
} from './importRelationshipEdge';
import { ROOT_DIRECTED_GRAPH_ATTRIBUTE_BY_KEY } from './rootDirectedGraph';
import {
  SUBGRAPH_TO_GRAPH_RELATIONSHIP_GEPP,
  SubgraphToGraphRelationshipVoictent,
} from './subgraphToGraphRelationship';

export const getRootDirectedGraph = buildEstinant({
  name: 'getRootDirectedGraph',
})
  .fromOdeshinVoictent<BoundaryMetadataVoictent>({
    gepp: BOUNDARY_METADATA_GEPP,
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
  .andFromOdeshinVoictent<SubgraphToGraphRelationshipVoictent>({
    gepp: SUBGRAPH_TO_GRAPH_RELATIONSHIP_GEPP,
  })
  .andFromOdeshinVoictent<NodeToGraphRelationshipVoictent>({
    gepp: NODE_TO_GRAPH_RELATIONSHIP_GEPP,
  })
  .andFromOdeshinVoictent<ImportRelationshipEdgeVoictent>({
    gepp: IMPORT_RELATIONSHIP_EDGE_GEPP,
  })
  .toHubblepup<DirectedGraphVoictent>({
    gepp: DIRECTED_GRAPH_GEPP,
  })
  .toHubblepupTuple<ErrorVoictent>({
    gepp: ERROR_GEPP,
  })
  .onPinbe(
    (
      boundaryMetdataList,
      directoryMetadataList,
      fileNodeMetdataList,
      externalModuleMetdataList,
      subgraphToGraphRelationshipList,
      nodeToGraphRelationshipList,
      importRelationshipEdgeList,
    ) => {
      const root: DirectedGraph = {
        isRoot: true,
        attributeByKey: ROOT_DIRECTED_GRAPH_ATTRIBUTE_BY_KEY,
        nodeList: [],
        edgeList: [],
        subgraphList: [],
      };

      const boundarySubgraphList = boundaryMetdataList.map((metadata) => {
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
      });

      const directorySubgraphList = directoryMetadataList.map((metadata) => {
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
      });

      const allSubgraphList = [
        ...boundarySubgraphList,
        ...directorySubgraphList,
      ];
      const allGraphList = [root, ...allSubgraphList];

      const fileNodeList = fileNodeMetdataList.map((metadata) => {
        const node: DirectedGraphNode = {
          attributeByKey: {
            id: metadata.id,
            ...metadata.attributeByKey,
          },
        };

        return node;
      });

      const externalModuleNodeList = externalModuleMetdataList.map(
        (metadata) => {
          const node: DirectedGraphNode = {
            attributeByKey: {
              id: metadata.id,
              ...metadata.attributeByKey,
            },
          };

          return node;
        },
      );

      const allNodeList = [...fileNodeList, ...externalModuleNodeList];

      const graphById = new Map(
        allGraphList.map((graph) => [
          // TODO: make root graph id required
          graph.attributeByKey.id as string,
          graph,
        ]),
      );

      const subgraphById = new Map(
        allSubgraphList.map((subgraph) => [
          // TODO: make root graph id required
          subgraph.attributeByKey.id,
          subgraph,
        ]),
      );

      const nodeById = new Map(
        allNodeList.map((node) => [node.attributeByKey.id, node]),
      );

      const errorList: ErrorOdeshin[] = [];

      subgraphToGraphRelationshipList.forEach((relationship, index) => {
        const parentGraph = graphById.get(relationship.parentId);
        const childGraph = subgraphById.get(relationship.childId);

        if (parentGraph === undefined || childGraph === undefined) {
          errorList.push({
            zorn: `getRootDirectedGraph/subgraphToGraph/${index}`,
            grition: {
              relationship,
              hasParent: parentGraph !== undefined,
              hasChild: childGraph !== undefined,
            },
          });
          return;
        }

        parentGraph.subgraphList.push(childGraph);
      });

      nodeToGraphRelationshipList.forEach((relationship, index) => {
        const parentGraph = graphById.get(relationship.parentId);
        const childNode = nodeById.get(relationship.childId);

        if (parentGraph === undefined || childNode === undefined) {
          errorList.push({
            zorn: `getRootDirectedGraph/nodeToGraph/${index}`,
            grition: {
              relationship,
              hasParent: parentGraph !== undefined,
              hasChild: childNode !== undefined,
            },
          });
          return;
        }

        parentGraph.nodeList.push(childNode);
      });

      root.edgeList = importRelationshipEdgeList;

      return {
        [DIRECTED_GRAPH_GEPP]: {
          zorn: TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
          grition: root,
        },
        [ERROR_GEPP]: errorList,
      };
    },
  )
  .assemble();
