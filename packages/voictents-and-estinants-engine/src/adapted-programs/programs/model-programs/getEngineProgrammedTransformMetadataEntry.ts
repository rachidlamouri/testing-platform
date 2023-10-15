import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { IdentifiableItemId } from '../../../adapter/identifiable-item/identifiableItem';
import {
  ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID,
  EngineProgrammedTransform3StreamMetatype,
} from '../../programmable-units/engine-program/engineEstinant3';
import {
  PROGRAM_PROGRAMMED_TRANSFORM_RELATIONSHIP_COLLECTION_ID,
  ProgramProgrammedTransformRelationshipStreamMetatype,
} from '../../programmable-units/engine-program/programEstinantRelationship';
import {
  DIRECTED_GRAPH_METADATA_ENTRY_COLLECTION_ID,
  DirectedGraphMetadataEntryInstance,
  DirectedGraphMetadataEntryStreamMetatype,
} from '../../programmable-units/graph-visualization/directedGraphMetadataEntry';

/**
 * Gets metadata for transforms
 *
 * @readableName getProgrammedTransformModelMetadataEntry
 */
export const getEngineProgrammedTransformMetadataEntry =
  buildProgrammedTransform({
    name: 'getEngineEstinantMetadataEntry',
  })
    .fromItem2<ProgramProgrammedTransformRelationshipStreamMetatype>({
      collectionId: PROGRAM_PROGRAMMED_TRANSFORM_RELATIONSHIP_COLLECTION_ID,
    })
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
    .toItem2<DirectedGraphMetadataEntryStreamMetatype>({
      collectionId: DIRECTED_GRAPH_METADATA_ENTRY_COLLECTION_ID,
    })
    .onTransform((relationship, [engineProgrammedTransform]) => {
      const entry = new DirectedGraphMetadataEntryInstance({
        elementId: engineProgrammedTransform.digestibleId,
        rootGraphLocator: relationship.rootGraphLocator,
        metadata: {
          title: engineProgrammedTransform.programmedTransformName,
          fieldList: [
            {
              label: 'Type',
              value: 'Transform',
            },
            {
              label: 'Description',
              value: engineProgrammedTransform.commentText,
            },
            ...engineProgrammedTransform.inputList.map((input) => {
              return {
                label:
                  input.index === 0
                    ? 'Left Input'
                    : `Right Input ${input.index}`,
                value: input.collectionName,
              };
            }),
            {
              label: 'Output',
              value: engineProgrammedTransform.outputList
                .map((output) => output.collectionName)
                .join(', '),
            },
          ],
        },
      });

      return entry;
    })
    .assemble();
