import { getZorn } from '../../../utilities/getZorn';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ESTINANT_INPUT_2_GEPP,
  EstinantInput2Voque,
} from '../../programmable-units/engine-program/input-output/engineEstinantInput2';
import {
  PROGRAM_RELATIONSHIP_GEPP,
  ProgramRelationshipVoque,
} from '../../programmable-units/engine-program/programRelationship';
import { DirectedGraphEdge2 } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge2';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';

/**
 * Gets two edges per estinant input: one from the voictent node to the input
 * node, and one from the input node to the estinant node
 */
export const getInputEdges = buildEstinant({
  name: 'getInputEdges',
})
  .fromHubblepup2<ProgramRelationshipVoque>({
    gepp: PROGRAM_RELATIONSHIP_GEPP,
  })
  .andFromHubblepupTuple2<EstinantInput2Voque, [string]>({
    gepp: ESTINANT_INPUT_2_GEPP,
    framate: (relationship) => {
      return [relationship.hubblepup.relatedZorn];
    },
    croard: (estinantOutput) => estinantOutput.hubblepup.zorn,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((relationship, [estinantInput]) => {
    // TODO: make voqueLocator required
    if (estinantInput.voqueLocator === undefined) {
      return [];
    }

    const incomingEdgeId = `${estinantInput.voqueLocator.id}:${estinantInput.id}`;
    const incomingEdge: DirectedGraphEdge2 = {
      zorn: getZorn([relationship.rootGraphLocator.debugName, incomingEdgeId]),
      attributeByKey: {
        id: incomingEdgeId,
      },
      tailId: estinantInput.voqueLocator.id,
      headId: estinantInput.id,
      rootGraphLocator: relationship.rootGraphLocator,
    };

    const outgoingEdgeId = `${estinantInput.id}:${estinantInput.estinantLocator.id}`;
    const outgoingEdge: DirectedGraphEdge2 = {
      zorn: getZorn([relationship.rootGraphLocator.debugName, outgoingEdgeId]),
      attributeByKey: {
        id: outgoingEdgeId,
      },
      tailId: estinantInput.id,
      headId: estinantInput.estinantLocator.id,
      rootGraphLocator: relationship.rootGraphLocator,
    };

    return [incomingEdge, outgoingEdge];
  })
  .assemble();
