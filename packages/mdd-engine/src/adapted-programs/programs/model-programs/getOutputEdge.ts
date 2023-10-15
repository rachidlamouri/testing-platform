import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { IdentifiableItemId } from '../../../adapter/identifiable-item/identifiableItem';
import {
  ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID,
  EngineProgrammedTransform3StreamMetatype,
} from '../../programmable-units/engine-program/engineProgrammedTransform3';
import {
  PROGRAMMED_TRANSFORM_OUTPUT_2_COLLECTION_ID,
  EngineProgrammedTransformOutput2StreamMetatype,
} from '../../programmable-units/engine-program/input-output/engineProgrammedTransformOutput2';
import {
  PROGRAM_PROGRAMMED_TRANSFORM_OUTPUT_RELATIONSHIP_COLLECTION_ID,
  ProgramProgrammedTransformOutputRelationshipStreamMetatype,
} from '../../programmable-units/engine-program/input-output/programProgrammedTransformOutputRelationship';
import { DirectedGraphEdge2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge2';
import {
  DIRECTED_GRAPH_ELEMENT_2_COLLECTION_ID,
  DirectedGraphElement2StreamMetatype,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';

/**
 * Gets the edges from the estinant to its output voictents.
 */
export const getOutputEdge = buildProgrammedTransform({
  name: 'getOutputEdge',
})
  .fromItem2<ProgramProgrammedTransformOutputRelationshipStreamMetatype>({
    collectionId:
      PROGRAM_PROGRAMMED_TRANSFORM_OUTPUT_RELATIONSHIP_COLLECTION_ID,
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
    EngineProgrammedTransformOutput2StreamMetatype,
    [IdentifiableItemId]
  >({
    collectionId: PROGRAMMED_TRANSFORM_OUTPUT_2_COLLECTION_ID,
    getRightKeyTuple: (relationship) => {
      return [relationship.item.outputId];
    },
    getRightKey: (programmedTransformOutput) =>
      programmedTransformOutput.item.id,
  })
  .toItemTuple2<DirectedGraphElement2StreamMetatype>({
    collectionId: DIRECTED_GRAPH_ELEMENT_2_COLLECTION_ID,
  })
  .onTransform(
    (
      relationship,
      [engineProgrammedTransform],
      [programmedTransformOutput],
    ) => {
      // TODO: make voqueLocator required
      if (programmedTransformOutput.streamMetatypeLocator === undefined) {
        throw Error('Voque locator is required');
      }

      const edge = new DirectedGraphEdge2Instance({
        tailId: engineProgrammedTransform.digestibleId,
        headId: programmedTransformOutput.streamMetatypeLocator.oldId,
        rootGraphLocator: relationship.rootGraphLocator,
      });

      return [edge];
    },
  )
  .assemble();
