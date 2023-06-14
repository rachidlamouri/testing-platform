import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_ESTINANT_2_GEPP,
  EngineEstinant2Voque,
} from '../../programmable-units/engine-program/engineEstinant2';
import {
  ProgramRelationshipVoque,
  PROGRAM_RELATIONSHIP_GEPP,
} from '../../programmable-units/engine-program/programRelationship';
import {
  DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  DirectedGraphMetadataEntry,
  DirectedGraphMetadataEntryVoque,
} from '../../programmable-units/graph-visualization/directedGraphMetadataEntry';

export const getEngineEstinantMetadataEntry = buildEstinant({
  name: 'getEngineEstinantMetadataEntry',
})
  .fromHubblepup2<ProgramRelationshipVoque>({
    gepp: PROGRAM_RELATIONSHIP_GEPP,
  })
  .andFromHubblepupTuple2<EngineEstinant2Voque, [string]>({
    gepp: ENGINE_ESTINANT_2_GEPP,
    framate: (relationship) => {
      return [relationship.hubblepup.relatedZorn];
    },
    croard: (engineEstinant) => engineEstinant.hubblepup.locator.zorn,
  })
  .toHubblepup2<DirectedGraphMetadataEntryVoque>({
    gepp: DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  })
  .onPinbe((relationship, [engineEstinant]) => {
    const entry: DirectedGraphMetadataEntry = {
      elementId: engineEstinant.id,
      rootGraphLocator: relationship.rootGraphLocator,
      metadata: {
        title: engineEstinant.estinantName,
        fieldList: [
          {
            label: 'Type',
            value: 'Transform',
          },
          {
            label: 'Description',
            value: engineEstinant.commentText,
          },
          ...engineEstinant.inputList.map((input) => {
            return {
              label:
                input.index === 0 ? 'Left Input' : `Right Input ${input.index}`,
              value: input.voictentName,
            };
          }),
          {
            label: 'Output',
            value: engineEstinant.outputList
              .map((output) => output.voictentName)
              .join(', '),
          },
        ],
      },
    };

    return entry;
  })
  .assemble();
