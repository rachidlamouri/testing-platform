import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_PROGRAM_2_GEPP,
  EngineProgram2Voque,
} from '../../programmable-units/engine-program/engineProgram2';
import {
  GraphLikeLabelLocation,
  GraphLikeStyle,
} from '../../programmable-units/graph-visualization/directed-graph/attributeByKeyGSC';
import { DirectedCluster2 } from '../../programmable-units/graph-visualization/directed-graph/directedCluster2';
import { DirectedGraph2 } from '../../programmable-units/graph-visualization/directed-graph/directedGraph2';
import { DirectedGraphEdge2 } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge2';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { NodeShape } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode';
import { DirectedGraphNode2 } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import {
  COMMON_ATTRIBUTE_BY_KEY,
  FONT_SIZE,
} from '../../programmable-units/type-script-file-relationships/graph-element/commonAttributeByKey';

/**
 * Gets the root graph, start node, edges from the start node to the initial
 * voictents, the end node and edges from unused voictents and estinants without
 * outputs to the end node
 */
export const getTopLevelEngineProgramGraphElements = buildEstinant({
  name: 'getTopLevelEngineProgramGraphElements',
})
  .fromHubblepup2<EngineProgram2Voque>({
    gepp: ENGINE_PROGRAM_2_GEPP,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((engineProgram) => {
    const { rootGraphLocator } = engineProgram.locator;

    const rootGraph: DirectedGraph2 = {
      zorn: engineProgram.id,
      isRoot: true,
      attributeByKey: {
        id: engineProgram.id,
        label: engineProgram.programName,
        labelloc: GraphLikeLabelLocation.Top,
        fontsize: FONT_SIZE.root,
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
      rootGraphLocator,
    };

    const startingSubgraph: DirectedCluster2 = {
      zorn: engineProgram.startingSubgraphId,
      isRoot: false,
      isCluster: true,
      attributeByKey: {
        id: engineProgram.startingSubgraphId,
        label: '',
        style: GraphLikeStyle.Rounded,
        color: 'none',
      },
      rootGraphLocator,
      parentId: rootGraphLocator.id,
      debugName: 'start-subgraph',
    };

    const startNode: DirectedGraphNode2 = {
      zorn: engineProgram.startingNodeId,
      attributeByKey: {
        id: engineProgram.startingNodeId,
        label: 'START',
        shape: NodeShape.Circle,
        color: 'gray',
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
      rootGraphLocator,
      parentId: rootGraphLocator.id,
    };

    const startingVoqueEdgeList = engineProgram.initializedVoqueList.map(
      (engineVoque) => {
        const edgeId = `${engineProgram.startingNodeId}:${engineVoque.id}`;
        const edge: DirectedGraphEdge2 = {
          zorn: edgeId,
          attributeByKey: {
            id: edgeId,
          },
          tailId: engineProgram.startingNodeId,
          headId: engineVoque.id,
          rootGraphLocator,
        };

        return edge;
      },
    );

    const endingSubgraph: DirectedCluster2 = {
      zorn: engineProgram.endingSubgraphId,
      isRoot: false,
      isCluster: true,
      attributeByKey: {
        id: engineProgram.endingSubgraphId,
        label: '',
        style: GraphLikeStyle.Rounded,
        color: 'none',
      },
      rootGraphLocator,
      parentId: rootGraphLocator.id,
      debugName: 'end-subgraph',
    };

    const endNode: DirectedGraphNode2 = {
      zorn: engineProgram.endingNodeId,
      attributeByKey: {
        id: engineProgram.endingNodeId,
        label: 'END',
        shape: NodeShape.Circle,
        color: 'gray',
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
      rootGraphLocator,
      parentId: rootGraphLocator.id,
    };

    const endingVoqueEdgeList = engineProgram.endingVoqueList.map(
      (engineVoque) => {
        const edgeId = `${engineVoque.id}:${engineProgram.endingNodeId}`;
        const edge: DirectedGraphEdge2 = {
          zorn: edgeId,
          attributeByKey: {
            id: edgeId,
          },
          tailId: engineVoque.id,
          headId: engineProgram.endingNodeId,
          rootGraphLocator,
        };

        return edge;
      },
    );

    const endingEstinantEdgeList = engineProgram.estinantList
      .filter((engineEstinant) => engineEstinant.outputList.length === 0)
      .map((engineEstinant) => {
        const edgeId = `${engineEstinant.id}:${engineProgram.endingNodeId}`;
        const edge: DirectedGraphEdge2 = {
          zorn: edgeId,
          attributeByKey: {
            id: edgeId,
          },
          tailId: engineEstinant.id,
          headId: engineProgram.endingNodeId,
          rootGraphLocator,
        };

        return edge;
      });

    return [
      rootGraph,
      startingSubgraph,
      startNode,
      ...startingVoqueEdgeList,
      endingSubgraph,
      endNode,
      ...endingVoqueEdgeList,
      ...endingEstinantEdgeList,
    ];
  })
  .assemble();
