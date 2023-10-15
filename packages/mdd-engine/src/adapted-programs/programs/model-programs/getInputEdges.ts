import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { IdentifiableItemId } from '../../../adapter/identifiable-item/identifiableItem';
import {
  EngineProgrammedTransform3StreamMetatype,
  ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID,
} from '../../programmable-units/engine-program-model/engineProgrammedTransform3';
import {
  PROGRAMMED_TRANSFORM_INPUT_2_COLLECTION_ID,
  EngineProgrammedTransformInput2StreamMetatype,
} from '../../programmable-units/engine-program-model/input-output/engineProgrammedTransformInput2';
import {
  PROGRAM_PROGRAMMED_TRANSFORM_INPUT_RELATIONSHIP_COLLECTION_ID,
  ProgramProgrammedTransformInputRelationshipStreamMetatype,
} from '../../programmable-units/engine-program-model/input-output/programProgrammedTransformInputRelationship';
import { DirectedGraphEdge2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge2';
import {
  DIRECTED_GRAPH_ELEMENT_2_COLLECTION_ID,
  DirectedGraphElement2StreamMetatype,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';

/**
 * Gets two edges per estinant input: one from the voictent node to the input
 * node, and one from the input node to the estinant node
 */
export const getInputEdges = buildProgrammedTransform({
  name: 'getInputEdges',
})
  .fromItem2<ProgramProgrammedTransformInputRelationshipStreamMetatype>({
    collectionId: PROGRAM_PROGRAMMED_TRANSFORM_INPUT_RELATIONSHIP_COLLECTION_ID,
  })
  // TODO: locator and estinant ids for buildAddMetadtaForSerialization can have different ids. Remove this when that issue is fixed
  .andFromItemTuple2<
    EngineProgrammedTransform3StreamMetatype,
    [IdentifiableItemId]
  >({
    collectionId: ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID,
    getRightKeyTuple: (relationship) => {
      return [relationship.item.programmedTransformLocator.id];
    },
    getRightKey: (engineProgrammedTransform) =>
      engineProgrammedTransform.item.locator.id,
  })
  .andFromItemTuple2<
    EngineProgrammedTransformInput2StreamMetatype,
    [IdentifiableItemId]
  >({
    collectionId: PROGRAMMED_TRANSFORM_INPUT_2_COLLECTION_ID,
    getRightKeyTuple: (relationship) => {
      return [relationship.item.programmedTransformInput.id];
    },
    getRightKey: (programmedTransformInput) => programmedTransformInput.item.id,
  })
  .toItemTuple2<DirectedGraphElement2StreamMetatype>({
    collectionId: DIRECTED_GRAPH_ELEMENT_2_COLLECTION_ID,
  })
  .onTransform(
    (relationship, [engineProgrammedTransform], [programmedTransformInput]) => {
      // TODO: make voqueLocator required
      if (programmedTransformInput.streamMetatypeLocator === undefined) {
        throw Error('Voque locator is required');
      }

      const incomingEdge = new DirectedGraphEdge2Instance({
        tailId: programmedTransformInput.streamMetatypeLocator.oldId,
        headId: programmedTransformInput.oldId,
        rootGraphLocator: relationship.rootGraphLocator,
      });

      const outgoingEdge = new DirectedGraphEdge2Instance({
        tailId: programmedTransformInput.oldId,
        headId: engineProgrammedTransform.digestibleId,
        rootGraphLocator: relationship.rootGraphLocator,
      });

      return [incomingEdge, outgoingEdge];
    },
  )
  .assemble();
