import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { OdeshinZorn } from '../../../adapter/odeshin/odeshin2';
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
 */
export const getEngineVoqueMetadataEntry = buildEstinant({
  name: 'getEngineVoqueMetadataEntry',
})
  .fromHubblepup2<ProgramVoqueRelationship2Voque>({
    gepp: PROGRAM_VOQUE_RELATIONSHIP_2_GEPP,
  })
  .andFromHubblepupTuple2<EngineVoque2Voque, [OdeshinZorn]>({
    gepp: ENGINE_VOQUE_2_GEPP,
    framate: (relationship) => [relationship.hubblepup.voqueLocator.zorn],
    croard: (engineVoque) => engineVoque.hubblepup.zorn,
  })
  .toHubblepup2<DirectedGraphMetadataEntryVoque>({
    gepp: DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  })
  .onPinbe((relationship, [engineVoque]) => {
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
      elementId: engineVoque.id,
      rootGraphLocator: relationship.rootGraphLocator,
      metadata: {
        title: engineVoque.displayName,
        fieldList,
      },
    });

    return entry;
  })
  .assemble();
