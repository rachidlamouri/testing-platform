import { getTextDigest } from '../../../utilities/getTextDigest';
import { isNotNull } from '../../../utilities/isNotNull';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { OdeshinZorn } from '../../adapter/odeshin2';
import {
  ENGINE_ESTINANT_3_GEPP,
  EngineEstinant3Voque,
} from '../../programmable-units/engine-program/engineEstinant3';
import {
  ProgramEstinantRelationshipVoque,
  PROGRAM_ESTINANT_RELATIONSHIP_GEPP,
} from '../../programmable-units/engine-program/programEstinantRelationship';
import { EdgeStyle } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge';
import { DirectedGraphEdge2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge2';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { NodeShape } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode';
import { DirectedGraphNode2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { RankType } from '../../programmable-units/graph-visualization/directed-graph/directedSubgraph';
import { DirectedSubgraph2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedSubgraph2';
import { COMMON_ATTRIBUTE_BY_KEY } from '../../programmable-units/type-script-file-relationships/graph-element/commonAttributeByKey';

/**
 * Creates a subgraph to group the estinant node and its input nodes, as well as
 * a set of invisible edges to force the input nodes to render in order
 */
export const getEngineEstinantGraphElements = buildEstinant({
  name: 'getEngineEstinantGraphElements',
})
  .fromHubblepup2<ProgramEstinantRelationshipVoque>({
    gepp: PROGRAM_ESTINANT_RELATIONSHIP_GEPP,
  })
  .andFromHubblepupTuple2<EngineEstinant3Voque, [OdeshinZorn]>({
    gepp: ENGINE_ESTINANT_3_GEPP,
    framate: (relationship) => {
      return [relationship.hubblepup.estinantLocator.zorn];
    },
    croard: (engineEstinant) => engineEstinant.hubblepup.locator.zorn,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((relationship, [engineEstinant]) => {
    const { rootGraphLocator } = relationship;

    const rootEstinantSubgraphZorn = `${relationship.programName} | ${engineEstinant.estinantName} | estinant-subgraph`;
    const rootEstinantSubgraphId = getTextDigest(rootEstinantSubgraphZorn);

    const estinantInputSubgraphZorn = `${relationship.programName} | ${engineEstinant.estinantName} | estinant-input-subgraph`;
    const estinantInputSubgraphId = getTextDigest(estinantInputSubgraphZorn);

    const rootEstinantSubgraph = new DirectedSubgraph2Instance({
      zorn: rootEstinantSubgraphZorn,
      attributeByKey: {
        id: rootEstinantSubgraphId,
      },
      rootGraphLocator,
      parentId: rootGraphLocator.id,
      debugName: rootEstinantSubgraphZorn,
    });

    const estinantInputSubgraph = new DirectedSubgraph2Instance({
      zorn: estinantInputSubgraphZorn,
      attributeByKey: {
        id: estinantInputSubgraphId,
        rank: RankType.Same,
      },
      rootGraphLocator,
      parentId: rootEstinantSubgraphId,
      debugName: estinantInputSubgraphZorn,
    });

    const estinantNode = new DirectedGraphNode2Instance({
      attributeByKey: {
        id: engineEstinant.id,
        label: engineEstinant.identifierName,
        shape: NodeShape.InvertedHouse,
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
      rootGraphLocator,
      parentId: rootEstinantSubgraphId,
    });

    const inputNodeList = engineEstinant.inputList.map((input) => {
      const inputNode = new DirectedGraphNode2Instance({
        attributeByKey: {
          id: input.id,
          label: input.index === 0 ? 'L' : `R${input.index}`,
          shape: NodeShape.InvertedTriangle,
          ...COMMON_ATTRIBUTE_BY_KEY,
        },
        rootGraphLocator,
        parentId: estinantInputSubgraphId,
      });

      return inputNode;
    });

    const inputOrderingEdgeList = engineEstinant.inputList
      .map((input, index, list) => {
        if (index === list.length - 1) {
          return null;
        }

        const nextInput = list[index + 1];

        const edge = new DirectedGraphEdge2Instance({
          tailId: input.id,
          headId: nextInput.id,
          attributeByKey: {
            style: EdgeStyle.Invisible,
          },
          rootGraphLocator,
        });

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
