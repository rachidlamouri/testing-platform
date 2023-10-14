import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { OdeshinZorn } from '../../../adapter/identifiable-item/identifiableItem';
import {
  ENGINE_VOQUE_2_GEPP,
  EngineVoque2Voque,
} from '../../programmable-units/engine-program/engineVoque2';
import {
  PROGRAM_VOQUE_RELATIONSHIP_2_GEPP,
  ProgramVoqueRelationship2Voque,
} from '../../programmable-units/engine-program/programVoqueRelationship2';
import { DirectedGraphMetadatumField } from '../../programmable-units/graph-visualization/directedGraphMetadataById';
import {
  DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  DirectedGraphMetadataEntryInstance,
  DirectedGraphMetadataEntryVoque,
} from '../../programmable-units/graph-visualization/directedGraphMetadataEntry';

/**
 * Gets metadata about meta collection types and their corresponding collections
 * and collection items
 *
 * @readableName getStreamMetatypeModelMetadataEntry
 */
export const getEngineVoqueMetadataEntry = buildProgrammedTransform({
  name: 'getEngineVoqueMetadataEntry',
})
  .fromItem2<ProgramVoqueRelationship2Voque>({
    collectionId: PROGRAM_VOQUE_RELATIONSHIP_2_GEPP,
  })
  .andFromItemTuple2<EngineVoque2Voque, [OdeshinZorn]>({
    collectionId: ENGINE_VOQUE_2_GEPP,
    getRightKeyTuple: (relationship) => [relationship.item.voqueLocator.id],
    getRightKey: (engineVoque) => engineVoque.item.id,
  })
  .toItem2<DirectedGraphMetadataEntryVoque>({
    collectionId: DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  })
  .onTransform((relationship, [engineVoque]) => {
    const fieldList: DirectedGraphMetadatumField[] = [
      {
        label: 'Type',
        value: 'Collection',
      },
    ];

    // TODO: remove "ProgramError" check. I had to purposefully downgrade the new modeler because it apparently fixed a bug witht the old one which makes it not at parity. lol
    if (
      engineVoque.commentText !== '' &&
      engineVoque.displayName !== 'ProgramError'
    ) {
      fieldList.push({
        label: 'Collection Item Description',
        value: engineVoque.commentText,
      });
    }

    const entry = new DirectedGraphMetadataEntryInstance({
      elementId: engineVoque.oldId,
      rootGraphLocator: relationship.rootGraphLocator,
      metadata: {
        title: engineVoque.displayName,
        fieldList,
      },
    });

    return entry;
  })
  .assemble();
