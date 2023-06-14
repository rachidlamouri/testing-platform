import { getZorn } from '../../../utilities/getZorn';
import { isNotNull } from '../../../utilities/isNotNull';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_ESTINANT_2_GEPP,
  EngineEstinant2Voque,
} from '../../programmable-units/engine-program/engineEstinant2';
import {
  PROGRAM_RELATIONSHIP_GEPP,
  ProgramRelationshipVoque,
} from '../../programmable-units/engine-program/programRelationship';
import { EdgeStyle } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge';
import { DirectedGraphEdge2 } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge2';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { NodeShape } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode';
import { DirectedGraphNode2 } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { RankType } from '../../programmable-units/graph-visualization/directed-graph/directedSubgraph';
import { DirectedSubgraph2 } from '../../programmable-units/graph-visualization/directed-graph/directedSubgraph2';
import { COMMON_ATTRIBUTE_BY_KEY } from '../../programmable-units/type-script-file-relationships/graph-element/commonAttributeByKey';

/**
 * Creates a subgraph to group the estinant node and its input nodes, as well as
 * a set of invisible edges to force the input nodes to render in order
 */
export const getEngineEstinantGraphElements = buildEstinant({
  name: 'getEngineEstinantGraphElements',
})
  .fromHubblepup2<ProgramRelationshipVoque>({
    gepp: PROGRAM_RELATIONSHIP_GEPP,
  })
  .andFromHubblepupTuple2<EngineEstinant2Voque, [string]>({
    gepp: ENGINE_ESTINANT_2_GEPP,
    framate: (relationship) => {
      return [relationship.hubblepup.relatedZorn];
    },
    croard: (engineEstinant) => engineEstinant.hubblepup.locator.zorn,
  })
  // .andFromHubblepupTuple2<GraphSourceElementByIdVoque, [string]>({
  //   gepp: GRAPH_SOURCE_ELEMENT_BY_ID_GEPP,
  //   framate: () => [GRAPH_SOURCE_ELEMENT_BY_ID_SINGLETON_ID],
  //   croard: () => GRAPH_SOURCE_ELEMENT_BY_ID_SINGLETON_ID,
  // })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((relationship, [engineEstinant]) => {
    const { rootGraphLocator } = relationship;
    const { subgraphId: rootEstinantSubgraphId, inputSubgraphId } =
      engineEstinant;

    const rootEstinantSubgraphZorn = getZorn([
      rootGraphLocator.debugName,
      engineEstinant.estinantName,
      'estinant-subgraph',
    ]);
    const rootEstinantSubgraph: DirectedSubgraph2 = {
      zorn: rootEstinantSubgraphZorn,
      isRoot: false,
      isCluster: false,
      attributeByKey: {
        id: rootEstinantSubgraphId,
      },
      rootGraphLocator,
      parentId: rootGraphLocator.id,
      debugName: rootEstinantSubgraphZorn,
    };

    const estinantInputSubgraphZorn = getZorn([
      rootGraphLocator.debugName,
      engineEstinant.estinantName,
      'input-subgraph',
    ]);
    const estinantInputSubgraph: DirectedSubgraph2 = {
      zorn: estinantInputSubgraphZorn,
      isRoot: false,
      isCluster: false,
      attributeByKey: {
        id: inputSubgraphId,
        rank: RankType.Same,
      },
      rootGraphLocator,
      parentId: rootEstinantSubgraphId,
      debugName: estinantInputSubgraphZorn,
    };

    const estinantNode: DirectedGraphNode2 = {
      zorn: getZorn([
        rootGraphLocator.debugName,
        engineEstinant.estinantName,
        engineEstinant.id,
      ]),
      attributeByKey: {
        id: engineEstinant.id,
        label: engineEstinant.identifierName,
        shape: NodeShape.InvertedHouse,
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
      rootGraphLocator,
      parentId: engineEstinant.subgraphId,
    };

    const inputNodeList = engineEstinant.inputList.map((input) => {
      const inputNode: DirectedGraphNode2 = {
        zorn: getZorn([
          rootGraphLocator.debugName,
          engineEstinant.estinantName,
          input.id,
        ]),
        attributeByKey: {
          id: input.id,
          label: input.index === 0 ? 'L' : `R${input.index}`,
          shape: NodeShape.InvertedTriangle,
          ...COMMON_ATTRIBUTE_BY_KEY,
        },
        rootGraphLocator,
        parentId: inputSubgraphId,
      };

      return inputNode;
    });

    const inputOrderingEdgeList = engineEstinant.inputList
      .map((input, index, list) => {
        if (index === list.length - 1) {
          return null;
        }

        const nextInput = list[index + 1];

        const edgeId = `${input.id}:${nextInput.id}`;
        const edge: DirectedGraphEdge2 = {
          zorn: getZorn([
            rootGraphLocator.debugName,
            engineEstinant.estinantName,
            edgeId,
          ]),
          tailId: input.id,
          headId: nextInput.id,
          attributeByKey: {
            id: edgeId,
            style: EdgeStyle.Invisible,
          },
          rootGraphLocator,
        };

        return edge;
      })
      .filter(isNotNull);

    return [
      rootEstinantSubgraph,
      estinantInputSubgraph,
      estinantNode,
      ...inputNodeList,
      ...inputOrderingEdgeList,
    ];
  })
  .assemble();
