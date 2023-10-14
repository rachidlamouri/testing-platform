import { hasOneElement } from '../../../package-agnostic-utilities/array/hasOneElement';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
  ProgramErrorElementLocatorTypeName,
  ProgramErrorEgg,
  ReportingProgrammedTransformLocator,
} from '../../programmable-units/error/programError';
import {
  DIRECTED_GRAPH_COLLECTION_ID,
  DirectedGraph,
  DirectedGraphStreamMetatype,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraph';
import { DirectedGraphEdge } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge';
import { DirectedGraphNode } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode';
import { DirectedGraphNode2 } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { SubgraphLike } from '../../programmable-units/graph-visualization/directed-graph/directedSubgraph';
import { GraphLike } from '../../programmable-units/graph-visualization/directed-graph/graphLike';
import { mutateGraphLikeElementListOrder } from '../../programmable-units/graph-visualization/directed-graph/mutateGraphLikeElementListOrder';
import { SubgraphLike2 } from '../../programmable-units/graph-visualization/directed-graph/subgraphLike2';
import { DIRECTED_GRAPH_METADATA_BY_ID_COLLECTION_ID } from '../../programmable-units/graph-visualization/directedGraphMetadataById';
import {
  GRAPH_ELEMENT_GROUP_GEPP,
  GraphElementGroupVoque,
} from './graphElementGroup';

const ESTINANT_NAME = 'getDirectedGraphFromGraphElementGroup' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingProgrammedTransformLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName:
    ProgramErrorElementLocatorTypeName.ReportingProgrammedTransformLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

/**
 * Converts a list of directed graph elements for one graph id into a single DirectedGraph object
 */
export const getDirectedGraphFromGraphElementGroup = buildProgrammedTransform({
  name: ESTINANT_NAME,
})
  .fromItem2<GraphElementGroupVoque>({
    collectionId: GRAPH_ELEMENT_GROUP_GEPP,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .toItemTuple2<DirectedGraphStreamMetatype>({
    collectionId: DIRECTED_GRAPH_COLLECTION_ID,
  })
  .onTransform((graphElementGroup) => {
    // TODO: update DirectedGraphNode to have a parentId and replace this with DirectedGraphNode
    type Node3 = {
      node1: DirectedGraphNode;
      node2: DirectedGraphNode2;
    };

    // TODO: update SubgraphLike to have a parentId and replace this with SubgraphLike
    type SubgraphLike3 = {
      subgraph1: SubgraphLike;
      subgraph2: SubgraphLike2;
    };

    const allRootGraphList: DirectedGraph[] = [];
    const allNodeList: Node3[] = [];
    const allEdgeList: DirectedGraphEdge[] = [];
    const allSubgraphList: SubgraphLike3[] = [];
    const parallelErrorList: ProgramErrorEgg<ReportingLocator>[] = [];

    // TODO: make it easier to differentiate DirectedGraphElement2 items
    graphElementGroup.elementList.forEach((element) => {
      if ('isRoot' in element) {
        if (element.isRoot) {
          allRootGraphList.push({
            id: element.rootGraphLocator.id.forHuman,
            isRoot: true,
            attributeByKey: element.attributeByKey,
            nodeList: [],
            edgeList: allEdgeList,
            subgraphList: [],
          });

          return;
        }

        if (element.isCluster) {
          allSubgraphList.push({
            subgraph1: {
              id: element.id.forHuman,
              isRoot: false,
              isCluster: element.isCluster,
              attributeByKey: element.attributeByKey,
              nodeList: [],
              edgeList: [],
              subgraphList: [],
            },
            subgraph2: element,
          });
        } else {
          allSubgraphList.push({
            subgraph1: {
              id: element.id.forHuman,
              isRoot: false,
              isCluster: element.isCluster,
              attributeByKey: element.attributeByKey,
              nodeList: [],
              edgeList: [],
              subgraphList: [],
            },
            subgraph2: element,
          });
        }

        return;
      }

      if ('headId' in element) {
        allEdgeList.push({
          tailId: element.tailId,
          headId: element.headId,
          attributeByKey: element.attributeByKey ?? {
            id: `${element.tailId}:${element.headId}`,
          },
        });
        return;
      }

      allNodeList.push({
        node1: {
          attributeByKey: element.attributeByKey,
        },
        node2: element,
      });
    });

    if (!hasOneElement(allRootGraphList)) {
      return {
        [PROGRAM_ERROR_COLLECTION_ID]: [
          {
            name: 'invalid-root-graph-list',
            error: new Error(
              `Expected exactly 1 root graph, but found ${allRootGraphList.length}`,
            ),
            reporterLocator,
            sourceLocator: null,
            context: {
              graphElementGroup,
            },
          } satisfies ProgramErrorEgg<ReportingLocator>,
        ],
        [DIRECTED_GRAPH_COLLECTION_ID]: [],
        [DIRECTED_GRAPH_METADATA_BY_ID_COLLECTION_ID]: [],
      };
    }

    const [rootDirectedGraph] = allRootGraphList;

    const graphById = new Map(
      [
        rootDirectedGraph,
        ...allSubgraphList.map(({ subgraph1 }) => subgraph1),
      ].map((graph) => {
        return [graph.attributeByKey.id, graph];
      }),
    );

    const getParentGraph = (childElement: {
      parentId: string;
    }): GraphLike | ProgramErrorEgg<ReportingLocator> => {
      const graph = graphById.get(childElement.parentId);

      if (graph === undefined) {
        return {
          name: 'unlocatable-parent-graph',
          error: Error(`Unable to find parent graph: ${childElement.parentId}`),
          reporterLocator,
          sourceLocator: null,
          context: {
            childElement,
            graphById,
          },
        } satisfies ProgramErrorEgg<ReportingLocator>;
      }

      return graph;
    };

    allNodeList.forEach(({ node1, node2 }) => {
      const parentGraph = getParentGraph(node2);

      // TODO: Make ProgramError an instance of Error so this is easier to check
      if ('isRoot' in parentGraph) {
        parentGraph.nodeList.push(node1);
      } else {
        parallelErrorList.push(parentGraph);
      }
    });

    allSubgraphList.forEach(({ subgraph1, subgraph2 }) => {
      const parentGraph = getParentGraph(subgraph2);

      if ('isRoot' in parentGraph) {
        parentGraph.subgraphList.push(subgraph1);
      } else {
        parallelErrorList.push(parentGraph);
      }
    });

    mutateGraphLikeElementListOrder(rootDirectedGraph);

    return {
      [PROGRAM_ERROR_COLLECTION_ID]: parallelErrorList,
      [DIRECTED_GRAPH_COLLECTION_ID]: [rootDirectedGraph],
    };
  })
  .assemble();
