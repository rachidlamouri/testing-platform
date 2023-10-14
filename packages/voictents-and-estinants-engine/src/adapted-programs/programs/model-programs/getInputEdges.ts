import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
import { OdeshinZorn } from '../../../adapter/identifiable-item/identifiableItem';
import {
  EngineEstinant3Voque,
  ENGINE_ESTINANT_3_GEPP,
} from '../../programmable-units/engine-program/engineEstinant3';
import {
  ESTINANT_INPUT_2_GEPP,
  EngineEstinantInput2Voque,
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
export const getInputEdges = buildProgrammedTransform({
  name: 'getInputEdges',
})
  .fromItem2<ProgramEstinantInputRelationshipVoque>({
    collectionId: PROGRAM_ESTINANT_INPUT_RELATIONSHIP_GEPP,
  })
  // TODO: locator and estinant ids for buildAddMetadtaForSerialization can have different ids. Remove this when that issue is fixed
  .andFromHubblepupTuple2<EngineEstinant3Voque, [OdeshinZorn]>({
    gepp: ENGINE_ESTINANT_3_GEPP,
    framate: (relationship) => {
      return [relationship.item.estinantLocator.zorn];
    },
    croard: (engineEstinant) => engineEstinant.item.locator.zorn,
  })
  .andFromHubblepupTuple2<EngineEstinantInput2Voque, [OdeshinZorn]>({
    gepp: ESTINANT_INPUT_2_GEPP,
    framate: (relationship) => {
      return [relationship.item.estinantInput.zorn];
    },
    croard: (estinantInput) => estinantInput.item.zorn,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    collectionId: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onTransform((relationship, [engineEstinant], [estinantInput]) => {
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
      headId: engineEstinant.digestibleId,
      rootGraphLocator: relationship.rootGraphLocator,
    });

    return [incomingEdge, outgoingEdge];
  })
  .assemble();
