import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  ESTINANT_INPUT_2_GEPP,
  EstinantInput2Voque,
} from '../../programmable-units/engine-program/input-output/engineEstinantInput2';
import {
  ProgramRelationshipVoque,
  PROGRAM_RELATIONSHIP_GEPP,
} from '../../programmable-units/engine-program/programRelationship';
import {
  DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  DirectedGraphMetadataEntry,
  DirectedGraphMetadataEntryVoque,
} from '../../programmable-units/graph-visualization/directedGraphMetadataEntry';

export const getInputMetdataEntry = buildEstinant({
  name: 'getInputMetdataEntry',
})
  .fromHubblepup2<ProgramRelationshipVoque>({
    gepp: PROGRAM_RELATIONSHIP_GEPP,
  })
  .andFromHubblepupTuple2<EstinantInput2Voque, [string]>({
    gepp: ESTINANT_INPUT_2_GEPP,
    framate: (relationship) => {
      return [relationship.hubblepup.relatedZorn];
    },
    croard: (engineEstinant) => engineEstinant.hubblepup.zorn,
  })
  .toHubblepup2<DirectedGraphMetadataEntryVoque>({
    gepp: DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  })
  .onPinbe((relationship, [estinantInput]) => {
    const inputName =
      estinantInput.index === 0
        ? 'Left Input'
        : `Right Input ${estinantInput.index}`;

    const entry: DirectedGraphMetadataEntry = {
      elementId: estinantInput.id,
      rootGraphLocator: relationship.rootGraphLocator,
      metadata: {
        title: `${estinantInput.estinantName}: ${inputName}`,
        fieldList: [
          {
            label: 'Type',
            value: 'Transform Input',
          },
          {
            label: 'Source Collection',
            value: estinantInput.voictentName,
          },
        ],
      },
    };

    return entry;
  })
  .assemble();
