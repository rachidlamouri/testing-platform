import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_VOQUE_GEPP,
  EngineVoqueVoque,
} from '../../programmable-units/engine-program/engineVoque';
import {
  PROGRAM_RELATIONSHIP_GEPP,
  ProgramRelationshipVoque,
} from '../../programmable-units/engine-program/programRelationship';
import { DirectedGraphMetadatumField } from '../../programmable-units/graph-visualization/directedGraphMetadataById';
import {
  DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  DirectedGraphMetadataEntry,
  DirectedGraphMetadataEntryVoque,
} from '../../programmable-units/graph-visualization/directedGraphMetadataEntry';

export const getEngineVoqueMetadataEntry = buildEstinant({
  name: 'getEngineVoqueMetadataEntry',
})
  .fromHubblepup2<ProgramRelationshipVoque>({
    gepp: PROGRAM_RELATIONSHIP_GEPP,
  })
  .andFromHubblepupTuple2<EngineVoqueVoque, [string]>({
    gepp: ENGINE_VOQUE_GEPP,
    framate: (relationship) => [relationship.hubblepup.relatedZorn],
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

    if (engineVoque.commentText !== '') {
      fieldList.push({
        label: 'Collection Item Description',
        value: engineVoque.commentText,
      });
    }

    const entry: DirectedGraphMetadataEntry = {
      elementId: engineVoque.id,
      rootGraphLocator: relationship.rootGraphLocator,
      metadata: {
        title: engineVoque.displayName,
        fieldList,
      },
    };

    return entry;
  })
  .assemble();
