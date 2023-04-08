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
  BOUNDARY_SUBGRAPH_ATTRIBUTE_BY_KEY_GEPP,
  BoundarySubgraphAttributeByKeyVoictent,
} from './boundarySubgraphAttributeByKey';
import {
  DIRECTORY_SUBGRAPH_ATTRIBUTE_BY_KEY_GEPP,
  DirectorySubgraphAttributeByKeyVoictent,
} from './directorySubgraphAttributeByKey';
import {
  FileNodeAttributeByKeyVoictent,
  FILE_NODE_ATTRIBUTE_BY_KEY_GEPP,
} from './fileNodeAttributeByKey';
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
  .fromOdeshinVoictent<BoundarySubgraphAttributeByKeyVoictent>({
    gepp: BOUNDARY_SUBGRAPH_ATTRIBUTE_BY_KEY_GEPP,
  })
  .andFromOdeshinVoictent<DirectorySubgraphAttributeByKeyVoictent>({
    gepp: DIRECTORY_SUBGRAPH_ATTRIBUTE_BY_KEY_GEPP,
  })
  .andFromOdeshinVoictent<FileNodeAttributeByKeyVoictent>({
    gepp: FILE_NODE_ATTRIBUTE_BY_KEY_GEPP,
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
      boundarySubgraphAttributeByKeyList,
      directorySubgraphAttributeByKeyList,
      fileNodeAttributeByKeyList,
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

      const boundarySubgraphList = boundarySubgraphAttributeByKeyList.map(
        (attributeByKey) => {
          const subgraph: DirectedSubgraph = {
            isRoot: false,
            attributeByKey,
            nodeList: [],
            edgeList: [],
            subgraphList: [],
          };

          return subgraph;
        },
      );

      const directorySubgraphList = directorySubgraphAttributeByKeyList.map(
        (attributeByKey) => {
          const subgraph: DirectedSubgraph = {
            isRoot: false,
            attributeByKey,
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
      const allGraphList = [root, ...allSubgraphList];

      const nodeList = fileNodeAttributeByKeyList.map((attributeByKey) => {
        const node: DirectedGraphNode = {
          attributeByKey,
        };

        return node;
      });

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
        nodeList.map((node) => [node.attributeByKey.id, node]),
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
