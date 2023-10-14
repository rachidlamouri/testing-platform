import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
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
import { GraphConstituentLocatorInstance } from '../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import { LocalDirectedGraphElement2Id } from '../../programmable-units/graph-visualization/directed-graph/types';
import {
  COMMON_ATTRIBUTE_BY_KEY,
  FONT_SIZE,
} from '../../programmable-units/type-script-file-relationships/graph-element/commonAttributeByKey';

/**
 * Gets the root graph, start node, edges from the start node to the initial
 * voictents, the end node and edges from unused voictents and estinants without
 * outputs to the end node
 */
export const getTopLevelEngineProgramGraphElements = buildProgrammedTransform({
  name: 'getTopLevelEngineProgramGraphElements',
})
  .fromItem2<EngineProgram3Voque>({
    collectionId: ENGINE_PROGRAM_3_GEPP,
  })
  .toItemTuple2<DirectedGraphElement2Voque>({
    collectionId: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onTransform((engineProgram) => {
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
      locator: new GraphConstituentLocatorInstance({
        localId: LocalDirectedGraphElement2Id.buildClusterZorn({
          distinguisher: `start-subgraph | ${rootGraphLocator.distinguisher}`,
        }),
        rootGraphLocator,
        parentId: rootGraphLocator.oldId,
      }),
      inputAttributeByKey: {
        label: '',
        style: GraphLikeStyle.Rounded,
        color: 'none',
      },
    });

    const startLabel = 'START';
    const startNode = new DirectedGraphNode2Instance({
      locator: new GraphConstituentLocatorInstance({
        rootGraphLocator,
        parentId: rootGraphLocator.oldId,
        localId: LocalDirectedGraphElement2Id.buildNodeId({
          distinguisher: startLabel,
        }),
      }),
      inputAttributeByKey: {
        label: startLabel,
        shape: NodeShape.Circle,
        color: 'gray',
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
    });

    const startingVoqueEdgeList = engineProgram.initializedVoqueLocatorList.map(
      (voqueLocator) => {
        const edge = new DirectedGraphEdge2Instance({
          tailId: engineProgram.locator.startingNodeId,
          headId: voqueLocator.oldId,
          rootGraphLocator,
        });

        return edge;
      },
    );

    const endingSubgraph = new DirectedCluster2Instance({
      locator: new GraphConstituentLocatorInstance({
        localId: LocalDirectedGraphElement2Id.buildClusterZorn({
          distinguisher: `end-subgraph | ${rootGraphLocator.distinguisher}`,
        }),
        rootGraphLocator,
        parentId: rootGraphLocator.oldId,
      }),
      inputAttributeByKey: {
        label: '',
        style: GraphLikeStyle.Rounded,
        color: 'none',
      },
    });

    const endLabel = 'END';
    const endNode = new DirectedGraphNode2Instance({
      locator: new GraphConstituentLocatorInstance({
        rootGraphLocator,
        parentId: rootGraphLocator.oldId,
        localId: LocalDirectedGraphElement2Id.buildNodeId({
          distinguisher: endLabel,
        }),
      }),
      inputAttributeByKey: {
        label: endLabel,
        shape: NodeShape.Circle,
        color: 'gray',
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
    });

    const endingVoqueEdgeList = engineProgram.endingVoqueLocatorList.map(
      (engineVoque) => {
        const edge = new DirectedGraphEdge2Instance({
          tailId: engineVoque.oldId,
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
          tailId: engineEstinant.digestibleId,
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
