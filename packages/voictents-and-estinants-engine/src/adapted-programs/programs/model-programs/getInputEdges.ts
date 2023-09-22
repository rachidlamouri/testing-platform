import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { OdeshinZorn } from '../../../adapter/odeshin2';
import {
  EngineEstinant3Voque,
  ENGINE_ESTINANT_3_GEPP,
} from '../../programmable-units/engine-program/engineEstinant3';
import {
  ESTINANT_INPUT_2_GEPP,
  EstinantInput2Voque,
} from '../../programmable-units/engine-program/input-output/engineEstinantInput2';
import {
  PROGRAM_ESTINANT_INPUT_RELATIONSHIP_GEPP,
  ProgramEstinantInputRelationshipVoque,
} from '../../programmable-units/engine-program/input-output/programEstinantInputRelationship';
import { DirectedGraphEdge2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge2';
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
  .fromHubblepup2<ProgramEstinantInputRelationshipVoque>({
    gepp: PROGRAM_ESTINANT_INPUT_RELATIONSHIP_GEPP,
  })
  // TODO: locator and estinant ids for buildAddMetadtaForSerialization can have different ids. Remove this when that issue is fixed
  .andFromHubblepupTuple2<EngineEstinant3Voque, [OdeshinZorn]>({
    gepp: ENGINE_ESTINANT_3_GEPP,
    framate: (relationship) => {
      return [relationship.hubblepup.estinantLocator.zorn];
    },
    croard: (engineEstinant) => engineEstinant.hubblepup.locator.zorn,
  })
  .andFromHubblepupTuple2<EstinantInput2Voque, [OdeshinZorn]>({
    gepp: ESTINANT_INPUT_2_GEPP,
    framate: (relationship) => {
      return [relationship.hubblepup.estinantInput.zorn];
    },
    croard: (estinantInput) => estinantInput.hubblepup.zorn,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((relationship, [engineEstinant], [estinantInput]) => {
    // TODO: make voqueLocator required
    if (estinantInput.voqueLocator === undefined) {
      throw Error('Voque locator is required');
    }

    const incomingEdge = new DirectedGraphEdge2Instance({
      tailId: estinantInput.voqueLocator.id,
      headId: estinantInput.id,
      rootGraphLocator: relationship.rootGraphLocator,
    });

    const outgoingEdge = new DirectedGraphEdge2Instance({
      tailId: estinantInput.id,
      headId: engineEstinant.id,
      rootGraphLocator: relationship.rootGraphLocator,
    });

    return [incomingEdge, outgoingEdge];
  })
  .assemble();
