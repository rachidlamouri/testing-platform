import { getZorn } from '../../../utilities/getZorn';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ESTINANT_OUTPUT_2_GEPP,
  EstinantOutput2Voque,
} from '../../programmable-units/engine-program/input-output/engineEstinantOutput2';
import {
  ProgramRelationshipVoque,
  PROGRAM_RELATIONSHIP_GEPP,
} from '../../programmable-units/engine-program/programRelationship';
import { DirectedGraphEdge2 } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge2';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';

/**
 * Gets the edges from the estinant to its output voictents.
 */
export const getOutputEdge = buildEstinant({
  name: 'getOutputEdge',
})
  .fromHubblepup2<ProgramRelationshipVoque>({
    gepp: PROGRAM_RELATIONSHIP_GEPP,
  })
  .andFromHubblepupTuple2<EstinantOutput2Voque, [string]>({
    gepp: ESTINANT_OUTPUT_2_GEPP,
    framate: (relationship) => {
      return [relationship.hubblepup.relatedZorn];
    },
    croard: (estinantOutput) => estinantOutput.hubblepup.zorn,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((relationship, [estinantOutput]) => {
    // TODO: make voqueLocator required
    if (estinantOutput.voqueLocator === undefined) {
      return [];
    }

    const edgeId = `${estinantOutput.estinantLocator.id}:${estinantOutput.voqueLocator.id}`;
    const zorn = getZorn([relationship.rootGraphLocator.debugName, edgeId]);
    console.log(zorn);
    const edge: DirectedGraphEdge2 = {
      zorn,
      attributeByKey: {
        id: edgeId,
      },
      tailId: estinantOutput.estinantLocator.id,
      headId: estinantOutput.voqueLocator.id,
      rootGraphLocator: relationship.rootGraphLocator,
    };

    return [edge];
  })
  .assemble();
