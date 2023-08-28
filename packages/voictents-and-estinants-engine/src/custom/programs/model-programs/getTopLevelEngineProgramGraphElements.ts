import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  EngineProgram3Voque,
  ENGINE_PROGRAM_3_GEPP,
} from '../../programmable-units/engine-program/engineProgram3';
import {
  GraphLikeLabelLocation,
  GraphLikeStyle,
} from '../../programmable-units/graph-visualization/directed-graph/attributeByKeyGSC';
import { DirectedCluster2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedCluster2';
import { DirectedGraph2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedGraph2';
import { DirectedGraphEdge2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge2';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { NodeShape } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode';
import { DirectedGraphNode2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
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
  .fromHubblepup2<EngineProgram3Voque>({
    gepp: ENGINE_PROGRAM_3_GEPP,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((engineProgram) => {
    const { rootGraphLocator } = engineProgram.locator;

    const rootGraph = new DirectedGraph2Instance({
      locator: rootGraphLocator,
      inputAttributeByKey: {
        label: engineProgram.programName,
        labelloc: GraphLikeLabelLocation.Top,
        fontsize: FONT_SIZE.root,
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
    });

    const startingSubgraph = new DirectedCluster2Instance({
      zorn: `start-subgraph | ${rootGraphLocator.distinguisher}`,
      attributeByKey: {
        id: engineProgram.locator.startingSubgraphId,
        label: '',
        style: GraphLikeStyle.Rounded,
        color: 'none',
      },
      rootGraphLocator,
      parentId: rootGraphLocator.id,
      debugName: 'start-subgraph',
    });

    const startNode = new DirectedGraphNode2Instance({
      attributeByKey: {
        id: engineProgram.locator.startingNodeId,
        label: 'START',
        shape: NodeShape.Circle,
        color: 'gray',
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
      rootGraphLocator,
      parentId: rootGraphLocator.id,
    });

    const startingVoqueEdgeList = engineProgram.initializedVoqueLocatorList.map(
      (voqueLocator) => {
        const edge = new DirectedGraphEdge2Instance({
          tailId: engineProgram.locator.startingNodeId,
          headId: voqueLocator.id,
          rootGraphLocator,
        });

        return edge;
      },
    );

    const endingSubgraph = new DirectedCluster2Instance({
      zorn: `end-subgraph | ${rootGraphLocator.distinguisher}`,
      attributeByKey: {
        id: engineProgram.locator.endingSubgraphId,
        label: '',
        style: GraphLikeStyle.Rounded,
        color: 'none',
      },
      rootGraphLocator,
      parentId: rootGraphLocator.id,
      debugName: 'end-subgraph',
    });

    const endNode = new DirectedGraphNode2Instance({
      attributeByKey: {
        id: engineProgram.locator.endingNodeId,
        label: 'END',
        shape: NodeShape.Circle,
        color: 'gray',
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
      rootGraphLocator,
      parentId: rootGraphLocator.id,
    });

    const endingVoqueEdgeList = engineProgram.endingVoqueLocatorList.map(
      (engineVoque) => {
        const edge = new DirectedGraphEdge2Instance({
          tailId: engineVoque.id,
          headId: engineProgram.locator.endingNodeId,
          rootGraphLocator,
        });

        return edge;
      },
    );

    const endingEstinantEdgeList = engineProgram.estinantList
      .filter((engineEstinant) => engineEstinant.outputList.length === 0)
      .map((engineEstinant) => {
        const edge = new DirectedGraphEdge2Instance({
          tailId: engineEstinant.id,
          headId: engineProgram.locator.endingNodeId,
          rootGraphLocator,
        });

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
