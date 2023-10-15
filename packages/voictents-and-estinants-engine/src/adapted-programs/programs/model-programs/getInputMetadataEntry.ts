import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { IdentifiableItemId } from '../../../adapter/identifiable-item/identifiableItem';
import {
  PROGRAMMED_TRANSFORM_INPUT_2_COLLECTION_ID,
  EngineProgrammedTransformInput2StreamMetatype,
} from '../../programmable-units/engine-program/input-output/engineEstinantInput2';
import {
  PROGRAM_PROGRAMMED_TRANSFORM_INPUT_RELATIONSHIP_COLLECTION_ID,
  ProgramProgrammedTransformInputRelationshipStreamMetatype,
} from '../../programmable-units/engine-program/input-output/programEstinantInputRelationship';
import {
  DIRECTED_GRAPH_METADATA_ENTRY_COLLECTION_ID,
  DirectedGraphMetadataEntryInstance,
  DirectedGraphMetadataEntryStreamMetatype,
} from '../../programmable-units/graph-visualization/directedGraphMetadataEntry';

/**
 * Gets information about transform inputs and their connected collections
 */
export const getInputMetadataEntry = buildProgrammedTransform({
  name: 'getInputMetadataEntry',
})
  .fromItem2<ProgramProgrammedTransformInputRelationshipStreamMetatype>({
    collectionId: PROGRAM_PROGRAMMED_TRANSFORM_INPUT_RELATIONSHIP_COLLECTION_ID,
  })
  .andFromItemTuple2<
    EngineProgrammedTransformInput2StreamMetatype,
    [IdentifiableItemId]
  >({
    collectionId: PROGRAMMED_TRANSFORM_INPUT_2_COLLECTION_ID,
    getRightKeyTuple: (relationship) => {
      return [relationship.item.programmedTransformInput.id];
    },
    getRightKey: (engineProgrammedTransform) =>
      engineProgrammedTransform.item.id,
  })
  .toItem2<DirectedGraphMetadataEntryStreamMetatype>({
    collectionId: DIRECTED_GRAPH_METADATA_ENTRY_COLLECTION_ID,
  })
  .onTransform((relationship, [programmedTransformInput]) => {
    const inputName =
      programmedTransformInput.index === 0
        ? 'Left Input'
        : `Right Input ${programmedTransformInput.index}`;

    const entry = new DirectedGraphMetadataEntryInstance({
      elementId: programmedTransformInput.oldId,
      rootGraphLocator: relationship.rootGraphLocator,
      metadata: {
        title: `${programmedTransformInput.programmedTransformName}: ${inputName}`,
        fieldList: [
          {
            label: 'Type',
            value: 'Transform Input',
          },
          {
            label: 'Source Collection',
            value: programmedTransformInput.collectionName,
          },
        ],
      },
    });

    return entry;
  })
  .assemble();
