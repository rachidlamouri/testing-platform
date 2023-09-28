import { hasOneElement } from '../../../package-agnostic-utilities/array/hasOneElement';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  GenericProgramErrorVoque,
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  ProgramErrorPelue,
  ReportingEstinantLocator,
} from '../../programmable-units/error/programError';
import {
  DIRECTED_GRAPH_GEPP,
  DirectedGraph,
  DirectedGraphVoque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraph';
import { DirectedGraphEdge } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge';
import { DirectedGraphNode } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode';
import { DirectedGraphNode2 } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { SubgraphLike } from '../../programmable-units/graph-visualization/directed-graph/directedSubgraph';
import { GraphLike } from '../../programmable-units/graph-visualization/directed-graph/graphLike';
import { mutateGraphLikeElementListOrder } from '../../programmable-units/graph-visualization/directed-graph/mutateGraphLikeElementListOrder';
import { SubgraphLike2 } from '../../programmable-units/graph-visualization/directed-graph/subgraphLike2';
import { DIRECTED_GRAPH_METADATA_BY_ID_GEPP } from '../../programmable-units/graph-visualization/directedGraphMetadataById';
import {
  GRAPH_ELEMENT_GROUP_GEPP,
  GraphElementGroupVoque,
} from './graphElementGroup';

const ESTINANT_NAME = 'getDirectedGraphFromGraphElementGroup' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

/**
 * Converts a list of directed graph elements for one graph id into a single DirectedGraph object
 */
export const getDirectedGraphFromGraphElementGroup = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromHubblepup2<GraphElementGroupVoque>({
    gepp: GRAPH_ELEMENT_GROUP_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .toHubblepupTuple2<DirectedGraphVoque>({
    gepp: DIRECTED_GRAPH_GEPP,
  })
  .onPinbe((graphElementGroup) => {
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
    const parallelErrorList: ProgramErrorPelue<ReportingLocator>[] = [];

    // TODO: make it easier to differentiate DirectedGraphElement2 items
    graphElementGroup.elementList.forEach((element) => {
      if ('isRoot' in element) {
        if (element.isRoot) {
          allRootGraphList.push({
            zorn: element.rootGraphLocator.zorn.forHuman,
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
              zorn: element.zorn.forHuman,
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
              zorn: element.zorn.forHuman,
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
        [PROGRAM_ERROR_GEPP]: [
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
          } satisfies ProgramErrorPelue<ReportingLocator>,
        ],
        [DIRECTED_GRAPH_GEPP]: [],
        [DIRECTED_GRAPH_METADATA_BY_ID_GEPP]: [],
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
    }): GraphLike | ProgramErrorPelue<ReportingLocator> => {
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
        } satisfies ProgramErrorPelue<ReportingLocator>;
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
      [PROGRAM_ERROR_GEPP]: parallelErrorList,
      [DIRECTED_GRAPH_GEPP]: [rootDirectedGraph],
    };
  })
  .assemble();
