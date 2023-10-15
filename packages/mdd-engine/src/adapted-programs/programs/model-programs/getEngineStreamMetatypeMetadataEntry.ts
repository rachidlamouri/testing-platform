import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { IdentifiableItemId } from '../../../adapter/identifiable-item/identifiableItem';
import {
  ENGINE_STREAM_METATYPE_2_COLLECTION_ID,
  EngineStreamMetatype2StreamMetatype,
} from '../../programmable-units/engine-program-model/engineStreamMetatype2';
import {
  PROGRAM_STREAM_METATYPE_RELATIONSHIP_2_COLLECTION_ID,
  ProgramStreamMetatypeRelationship2StreamMetatype,
} from '../../programmable-units/engine-program-model/programStreamMetatypeRelationship2';
import { DirectedGraphMetadatumField } from '../../programmable-units/graph-visualization/directedGraphMetadataById';
import {
  DIRECTED_GRAPH_METADATA_ENTRY_COLLECTION_ID,
  DirectedGraphMetadataEntryInstance,
  DirectedGraphMetadataEntryStreamMetatype,
} from '../../programmable-units/graph-visualization/directedGraphMetadataEntry';

/**
 * Gets metadata about meta collection types and their corresponding collections
 * and collection items
 *
 * @readableName getStreamMetatypeModelMetadataEntry
 */
export const getEngineStreamMetatypeMetadataEntry = buildProgrammedTransform({
  name: 'getEngineStreamMetatypeMetadataEntry',
})
  .fromItem2<ProgramStreamMetatypeRelationship2StreamMetatype>({
    collectionId: PROGRAM_STREAM_METATYPE_RELATIONSHIP_2_COLLECTION_ID,
  })
  .andFromItemTuple2<EngineStreamMetatype2StreamMetatype, [IdentifiableItemId]>(
    {
      collectionId: ENGINE_STREAM_METATYPE_2_COLLECTION_ID,
      getRightKeyTuple: (relationship) => [
        relationship.item.streamMetatypeLocator.id,
      ],
      getRightKey: (engineStreamMetatype) => engineStreamMetatype.item.id,
    },
  )
  .toItem2<DirectedGraphMetadataEntryStreamMetatype>({
    collectionId: DIRECTED_GRAPH_METADATA_ENTRY_COLLECTION_ID,
  })
  .onTransform((relationship, [engineStreamMetatype]) => {
    const fieldList: DirectedGraphMetadatumField[] = [
      {
        label: 'Type',
        value: 'Collection',
      },
    ];

    // TODO: remove "ProgramError" check. I had to purposefully downgrade the new modeler because it apparently fixed a bug witht the old one which makes it not at parity. lol
    if (
      engineStreamMetatype.commentText !== '' &&
      engineStreamMetatype.displayName !== 'ProgramError'
    ) {
      fieldList.push({
        label: 'Collection Item Description',
        value: engineStreamMetatype.commentText,
      });
    }

    const entry = new DirectedGraphMetadataEntryInstance({
      elementId: engineStreamMetatype.oldId,
      rootGraphLocator: relationship.rootGraphLocator,
      metadata: {
        title: engineStreamMetatype.displayName,
        fieldList,
      },
    });

    return entry;
  })
  .assemble();
