import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { IdentifiableItemId } from '../../../adapter/identifiable-item/identifiableItem';
import {
  ENGINE_ESTINANT_3_GEPP,
  EngineEstinant3Voque,
} from '../../programmable-units/engine-program/engineEstinant3';
import {
  ESTINANT_OUTPUT_2_GEPP,
  EngineEstinantOutput2Voque,
} from '../../programmable-units/engine-program/input-output/engineEstinantOutput2';
import {
  PROGRAM_ESTINANT_OUTPUT_RELATIONSHIP_GEPP,
  ProgramEstinantOutputRelationshipVoque,
} from '../../programmable-units/engine-program/input-output/programEstinantOutputRelationship';
import { DirectedGraphEdge2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge2';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';

/**
 * Gets the edges from the estinant to its output voictents.
 */
export const getOutputEdge = buildProgrammedTransform({
  name: 'getOutputEdge',
})
  .fromItem2<ProgramEstinantOutputRelationshipVoque>({
    collectionId: PROGRAM_ESTINANT_OUTPUT_RELATIONSHIP_GEPP,
  })
  // TODO: locator and estinant ids for buildAddMetadtaForSerialization can have different ids. Remove this when that issue is fixed
  .andFromItemTuple2<EngineEstinant3Voque, [IdentifiableItemId]>({
    collectionId: ENGINE_ESTINANT_3_GEPP,
    getRightKeyTuple: (relationship) => {
      return [relationship.item.estinantLocator.id];
    },
    getRightKey: (engineEstinant) => engineEstinant.item.locator.id,
  })
  .andFromItemTuple2<EngineEstinantOutput2Voque, [IdentifiableItemId]>({
    collectionId: ESTINANT_OUTPUT_2_GEPP,
    getRightKeyTuple: (relationship) => {
      return [relationship.item.outputZorn];
    },
    getRightKey: (estinantOutput) => estinantOutput.item.id,
  })
  .toItemTuple2<DirectedGraphElement2Voque>({
    collectionId: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onTransform((relationship, [engineEstinant], [estinantOutput]) => {
    // TODO: make voqueLocator required
    if (estinantOutput.voqueLocator === undefined) {
      throw Error('Voque locator is required');
    }

    const edge = new DirectedGraphEdge2Instance({
      tailId: engineEstinant.digestibleId,
      headId: estinantOutput.voqueLocator.oldId,
      rootGraphLocator: relationship.rootGraphLocator,
    });

    return [edge];
  })
  .assemble();
